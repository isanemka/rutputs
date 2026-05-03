/**
 * Validates a discount code and returns the discount percentage.
 * Discount codes are stored in the DISCOUNT_CODES environment variable as a
 * comma-separated list of CODE:PERCENT pairs, e.g. "GRANNE10:10,VIP20:20".
 */

function parseDiscountCodes() {
  const raw = process.env.DISCOUNT_CODES;
  if (!raw) return {};

  return raw.split(',').reduce((acc, entry) => {
    const [code, percentStr] = entry.trim().split(':');
    const percent = Number(percentStr);
    if (code && Number.isInteger(percent) && percent > 0 && percent <= 100) {
      acc[code.toUpperCase()] = percent;
    }
    return acc;
  }, {});
}

export default async function handleDiscountRequest(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  const code = typeof req.body?.code === 'string' ? req.body.code.trim().toUpperCase() : null;

  if (!code || code.length === 0 || code.length > 50) {
    return res.status(400).json({ ok: false, valid: false });
  }

  const codes = parseDiscountCodes();
  const percent = codes[code];

  if (!percent) {
    return res.status(200).json({ ok: true, valid: false });
  }

  return res.status(200).json({ ok: true, valid: true, percent });
}
