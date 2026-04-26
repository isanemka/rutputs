import { z } from 'zod';

const { PPCRM_AVAILABILITY_URL, PPCRM_AVAILABILITY_SECRET } = process.env;
const AVAILABILITY_RANGE_DAYS = 90;
const AVAILABILITY_REQUEST_TIMEOUT_MS = 6500;
const halfDaySchema = z.enum(['am', 'pm']);
const slotSchema = z.object({
  id: z.string().trim().min(1).optional(),
  brand: z.string().trim().min(1).optional(),
  slot_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  half_day: halfDaySchema,
  remaining: z.number().int().nonnegative().optional(),
  capacity: z.number().int().positive().optional().default(1),
  notes: z.string().nullable().optional(),
});

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function buildAvailabilityUrl(rawUrl) {
  if (!rawUrl) {
    return null;
  }

  try {
    const url = new URL(rawUrl);
    const from = new Date();
    const to = new Date(from);

    to.setDate(to.getDate() + AVAILABILITY_RANGE_DAYS);

    url.searchParams.set('brand', 'rutputs');
    url.searchParams.set('from', formatIsoDate(from));
    url.searchParams.set('to', formatIsoDate(to));

    return url.toString();
  } catch {
    return null;
  }
}

function normalizeSlots(payload) {
  const rawSlots = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.slots)
      ? payload.slots
      : Array.isArray(payload?.data)
        ? payload.data
        : null;

  if (!rawSlots) {
    return null;
  }

  const parsedSlots = z.array(slotSchema).safeParse(rawSlots);

  if (!parsedSlots.success) {
    return null;
  }

  return parsedSlots.data
    .map((slot, index) => ({
      slot_date: slot.slot_date || slot.date,
      remaining: slot.remaining ?? slot.capacity,
      id: slot.id || `${slot.slot_date || slot.date}-${slot.half_day}-${index}`,
      brand: slot.brand || 'rutputs',
      half_day: slot.half_day,
      capacity: slot.remaining ?? slot.capacity,
      notes: slot.notes || null,
    }))
    .filter((slot) => Boolean(slot.slot_date) && (slot.remaining ?? 0) > 0)
    .sort((left, right) => {
      if (left.slot_date === right.slot_date) {
        return left.half_day.localeCompare(right.half_day);
      }

      return left.slot_date.localeCompare(right.slot_date);
    });
}

function respondWithNoSlots(res, reason, details = {}) {
  console.warn(`availability-handler returning no slots: ${reason}`, details);
  return res.status(200).json({ ok: true, slots: [] });
}

export default async function handleAvailabilityRequest(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false });
  }

  const availabilityUrl = buildAvailabilityUrl(PPCRM_AVAILABILITY_URL);

  if (!availabilityUrl || !PPCRM_AVAILABILITY_SECRET) {
    return respondWithNoSlots(res, 'missing PPCRM availability configuration', {
      hasAvailabilityUrl: Boolean(PPCRM_AVAILABILITY_URL),
      hasBuiltAvailabilityUrl: Boolean(availabilityUrl),
      hasAvailabilitySecret: Boolean(PPCRM_AVAILABILITY_SECRET),
    });
  }

  let upstream;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AVAILABILITY_REQUEST_TIMEOUT_MS);

  try {
    upstream = await fetch(availabilityUrl, {
      method: 'GET',
      headers: {
        'x-webhook-secret': PPCRM_AVAILABILITY_SECRET,
      },
      signal: controller.signal,
    });
  } catch (error) {
    return respondWithNoSlots(res, 'upstream request failed', {
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!upstream.ok) {
    const upstreamText = await upstream.text().catch(() => 'Could not read availability response body');

    return respondWithNoSlots(res, 'upstream returned non-ok status', {
      status: upstream.status,
      statusText: upstream.statusText,
      bodyPreview: upstreamText.slice(0, 300),
    });
  }

  const payload = await upstream.json().catch(() => null);
  const slots = normalizeSlots(payload);

  if (!slots) {
    return respondWithNoSlots(res, 'upstream returned unexpected payload shape', {
      payloadType: payload === null ? 'null-or-invalid-json' : typeof payload,
    });
  }

  return res.status(200).json({ ok: true, slots });
}
