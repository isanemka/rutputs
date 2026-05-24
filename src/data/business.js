// Single source of truth for Rutputs business facts.
// Plain JS so it can be imported both by the Vue app (TS) and by the
// Node prerender script (scripts/prerender-routes.mjs).

const business = {
  id: 'https://www.rutputs.nu/#business',
  name: 'Rutputs',
  url: 'https://www.rutputs.nu',
  logo: 'https://www.rutputs.nu/icons/main_logo.png',
  image: 'https://www.rutputs.nu/og-image.jpg',
  telephone: '+46734644604',
  // Formaterat telefonnummer för visning/llms.txt – härleds från telephone.
  phoneDisplay: '0734-64 46 04',
  email: 'kontakt@rutputs.nu',
  priceRange: 'från 499 SEK',
  openingHours: 'Mo-Fr 08:00-18:00',
  slogan: 'Rena fönster. Tydligt pris. Snabb bokning.',
  description:
    'Professionell fönsterputsning i Stockholm för privatpersoner och företag. Från 499 kr efter RUT-avdrag. Personlig service i stora delar av Stockholm.',
  address: {
    addressLocality: 'Järfälla',
    addressRegion: 'Stockholm',
    addressCountry: 'SE',
  },
  // Ungefärliga koordinater för basorten Järfälla – justera vid behov.
  geo: {
    latitude: 59.4233,
    longitude: 17.8357,
  },
  // Aggregerat betyg – enda källa, läses av både UI (reviews.ts) och schema.
  aggregateRating: {
    ratingValue: 5.0,
    reviewCount: 2,
  },
  // Profiler som binder ihop Rutputs som en igenkänd entitet (sameAs).
  googleBusinessUrl:
    'https://www.google.com/search?q=Rutputs&stick=H4sIAAAAAAAAAONgU1I1qDAxM7U0SDNONDQ1SDUxSkqzMqgwNzExMzdITDa1NLRMNTQyWsTKHlRaUlBaUgwAQ7U7RjMAAAA&mat=CajQ30ohy9Xe',
  sameAs: [
    'https://www.google.com/search?q=Rutputs&stick=H4sIAAAAAAAAAONgU1I1qDAxM7U0SDNONDQ1SDUxSkqzMqgwNzExMzdITDa1NLRMNTQyWsTKHlRaUlBaUgwAQ7U7RjMAAAA&mat=CajQ30ohy9Xe',
    'https://www.facebook.com/rutputspunktnu',
    'https://www.instagram.com/rutputs.nu/',
  ],
  knowsAbout: [
    'Fönsterputsning',
    'RUT-avdrag',
    'Fönsterputs för villa',
    'Fönsterputs för lägenhet',
    'Fönsterputs för företag',
    'Återkommande fönsterputs',
  ],
};

export default business;
