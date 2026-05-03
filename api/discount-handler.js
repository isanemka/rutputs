import { parseDiscountCodes } from './discount-codes.js';

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
