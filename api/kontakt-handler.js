import { randomUUID } from 'node:crypto';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { z } from 'zod';

const { AWS_REGION, SES_FROM_EMAIL, SES_TO_EMAIL } = process.env;
const CRM_REQUEST_TIMEOUT_MS = 6500;

const ses =
  AWS_REGION && SES_FROM_EMAIL && SES_TO_EMAIL
    ? new SESClient({ region: AWS_REGION })
    : null;

const cartItemSchema = z.object({
  id: z.string().trim().min(1).max(100),
  quantity: z.number().int().positive(),
  description: z.string().trim().min(1).max(500),
});

const halfDaySchema = z.enum(['am', 'pm']);
const requestedDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const schema = z
  .object({
    name: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(200),
    tel: z.string().trim().min(6).max(60),
    address: z.string().trim().max(200).optional().or(z.literal('')),
    propertyType: z.enum(['house', 'apartment']),
    windowCount: z.number().int().positive().nullable().optional(),
    message: z.string().trim().max(10000).optional().or(z.literal('')),
    cart: z.array(cartItemSchema).min(1),
    totalPrice: z.number().positive(),
    website: z.string().trim().max(200).optional(),
    requestedDate: requestedDateSchema.nullable().optional(),
    requestedHalfDay: halfDaySchema.nullable().optional(),
  })
  .refine(
    (value) => {
      const hasRequestedDate = Boolean(value.requestedDate);
      const hasRequestedHalfDay = Boolean(value.requestedHalfDay);

      return hasRequestedDate === hasRequestedHalfDay;
    },
    {
      message: 'requested date and requested half day must be provided together',
      path: ['requestedDate'],
    }
  );

function formatRequestedHalfDay(halfDay) {
  if (halfDay === 'am') {
    return 'Förmiddag';
  }

  if (halfDay === 'pm') {
    return 'Eftermiddag';
  }

  return null;
}

function getSesErrorDetails(error) {
  if (!(error instanceof Error)) {
    return { raw: error };
  }

  const errorWithMeta = error;

  return {
    name: errorWithMeta.name,
    message: errorWithMeta.message,
    stack: errorWithMeta.stack,
    code: errorWithMeta.Code || errorWithMeta.code,
    type: errorWithMeta.Type,
    fault: errorWithMeta.$fault,
    metadata: errorWithMeta.$metadata,
  };
}

export default async function handleKontaktRequest(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  const url = process.env.PPCRM_LEADS_URL;
  const secret = process.env.PPCRM_LEADS_SECRET;

  if (!url || !secret) {
    console.error('kontakt-handler is missing required PPCRM configuration', {
      hasLeadsUrl: Boolean(url),
      hasLeadsSecret: Boolean(secret),
    });
    return res.status(500).json({ ok: false, error: 'Ett internt fel uppstod' });
  }

  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'Ogiltig data' });
  }

  if (parsed.data.website?.trim()) {
    return res.status(200).json({ ok: true });
  }

  const propertyTypeLabel =
    parsed.data.propertyType === 'house' ? 'Villa/Radhus' : 'Lägenhet';
  const requestedTimeLabel =
    parsed.data.requestedDate && parsed.data.requestedHalfDay
      ? `${parsed.data.requestedDate} (${formatRequestedHalfDay(parsed.data.requestedHalfDay)})`
      : '-';
  const cartSummary = parsed.data.cart
    .map((item) => `${item.quantity} x ${item.description}`)
    .join('\n');
  const requestLabel = `[kontakt:${randomUUID()}]`;
  const detailedMessage = [
    'Ny offertförfrågan från Rutputs.',
    '',
    `Namn: ${parsed.data.name}`,
    `E-post: ${parsed.data.email}`,
    `Telefon: ${parsed.data.tel}`,
    `Adress: ${parsed.data.address || '-'}`,
    `Bostadstyp: ${propertyTypeLabel}`,
    `Antal fönster: ${parsed.data.windowCount ?? '-'}`,
    `Önskad tid: ${requestedTimeLabel}`,
    `Totalpris: ${parsed.data.totalPrice} kr`,
    '',
    'Valda tjänster:',
    cartSummary,
    '',
    parsed.data.message
      ? `Kundens meddelande:\n${parsed.data.message}`
      : 'Kundens meddelande: -',
  ].join('\n');

  console.info(`${requestLabel} CRM submit started`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CRM_REQUEST_TIMEOUT_MS);

  let upstream;

  try {
    upstream = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-webhook-secret': secret },
      signal: controller.signal,
      body: JSON.stringify({
        source: 'rutputs',
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.tel,
        subject: 'Offertförfrågan',
        requested_date: parsed.data.requestedDate || null,
        requested_half_day: parsed.data.requestedHalfDay || null,
        message: detailedMessage,
        website: '',
        metadata: {
          page: typeof req.headers.referer === 'string' ? req.headers.referer : null,
          submitted_at: new Date().toISOString(),
          address: parsed.data.address || null,
          property_type: parsed.data.propertyType,
          window_count: parsed.data.windowCount ?? null,
          requested_date: parsed.data.requestedDate || null,
          requested_half_day: parsed.data.requestedHalfDay || null,
          total_price: parsed.data.totalPrice,
          cart: parsed.data.cart,
        },
      }),
    });
  } catch (error) {
    console.error(`${requestLabel} CRM submit failed`, {
      message: error instanceof Error ? error.message : String(error),
      timedOut: error instanceof Error && error.name === 'AbortError',
    });
    return res.status(502).json({ ok: false, error: 'Kunde inte skicka förfrågan just nu' });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!upstream.ok) {
    const crmResponseText = await upstream.text().catch(() => 'Could not read CRM response body');
    console.error(`${requestLabel} CRM submit failed`, {
      status: upstream.status,
      statusText: upstream.statusText,
      body: crmResponseText,
    });
    return res.status(502).json({ ok: false, error: 'CRM avvisade' });
  }

  console.info(`${requestLabel} CRM submit succeeded`);

  if (!ses || !SES_FROM_EMAIL || !SES_TO_EMAIL) {
    console.error(
      `${requestLabel} SES email skipped: missing AWS_REGION, SES_FROM_EMAIL or SES_TO_EMAIL`
    );
    return res.status(200).json({ ok: true });
  }

  try {
    console.info(`${requestLabel} SES send started`, {
      from: SES_FROM_EMAIL,
      to: SES_TO_EMAIL,
      region: AWS_REGION,
    });

    await ses.send(
      new SendEmailCommand({
        Source: SES_FROM_EMAIL,
        Destination: { ToAddresses: [SES_TO_EMAIL] },
        Message: {
          Subject: { Data: 'Inskickat formulär', Charset: 'UTF-8' },
          Body: { Text: { Data: detailedMessage, Charset: 'UTF-8' } },
        },
      })
    );

    console.info(`${requestLabel} SES send succeeded`);
  } catch (error) {
    console.error(`${requestLabel} SES send failed`, getSesErrorDetails(error));
  }

  return res.status(200).json({ ok: true });
}
