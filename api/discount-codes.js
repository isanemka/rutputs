/**
 * Parses discount codes from the DISCOUNT_CODES environment variable.
 * Format: comma-separated CODE:PERCENT pairs, e.g. "GRANNE10:10,VIP20:20".
 * Returns an object mapping uppercase code → integer percent.
 */
export function parseDiscountCodes() {
  const raw = process.env.DISCOUNT_CODES;
  if (!raw) return {};

  return raw.split(',').reduce((acc, entry) => {
    const colonIndex = entry.trim().indexOf(':');
    if (colonIndex < 1) return acc;
    const code = entry.trim().slice(0, colonIndex).trim();
    const percent = Number(entry.trim().slice(colonIndex + 1).trim());
    if (code && Number.isInteger(percent) && percent > 0 && percent <= 100) {
      acc[code.toUpperCase()] = percent;
    }
    return acc;
  }, {});
}
