// Price ranges for private customers, used by the price page, area and
// service pages and the JSON-LD offers. Plain JS so build scripts can read it.
//
// All prices include VAT. The whole price is labour, so the RUT deduction is
// half of the total: price without RUT = 2 × price after RUT.

export const MIN_PRICE = 499;

export const priceRows = [
  {
    id: 'apartmentSmall',
    label: 'Lägenhet 1–2 rok',
    min: 499,
    max: 799,
  },
  {
    id: 'apartmentLarge',
    label: 'Lägenhet 3–4 rok',
    min: 699,
    max: 1199,
  },
  {
    // Same range as the villa FAQ on /tjanst/villa-fonsterputs.
    id: 'house',
    label: 'Villa eller radhus',
    min: 800,
    max: 2000,
  },
];

export const priceWithoutRut = (priceAfterRut) => priceAfterRut * 2;

// Formats 1199 as "1 199" with a non-breaking space, identically on the
// server and in the browser (no locale differences during hydration).
export const formatAmount = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');

// Word joiners around the dash keep "499–799 kr" on one line in narrow tables.
const DASH = '\u2060–\u2060';

export const formatRange = (min, max) => `${formatAmount(min)}${DASH}${formatAmount(max)}\u00a0kr`;

/** Keeps the room range together: "Lägenhet 1–2 rok" only breaks after "Lägenhet". */
export const formatLabel = (label) => label.replace(/(\d)–(\d) rok/, `$1${DASH}$2\u00a0rok`);

export const getPriceRow = (id) => priceRows.find((row) => row.id === id);
