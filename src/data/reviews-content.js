// Kundomdömen hämtade från Google Business-profilen för Rutputs.
// Plain JS så att listan kan läsas både av Vue-appen (reviews.ts) och av
// Node-prerenderskriptet (scripts/prerender-routes.mjs).
//
// Texterna är ordagranna citat och ska inte redigeras – hämta nya omdömen
// från Google i stället. Listan ligger nyast först; nya omdömen läggs överst.
// Datumen är ungefärliga när Google bara visar ålder i veckor.

const reviews = [
  {
    author: 'Birgitta Kaasik',
    rating: 5,
    text: 'Superduktig fönsterputsare . Nu blänkande fönster . Tack !',
    date: '2026-06-14',
  },
  {
    author: 'Gylle Tandvård',
    authorType: 'Organization',
    rating: 5,
    text: 'Smidigt samarbete och väl utfört jobb.',
    date: '2026-05-31',
  },
  {
    author: 'Linda',
    rating: 5,
    text: 'Toppen! Är supernöjd med fönsterputsningen🌟 Dessutom väldigt bra pris!',
    date: '2026-05-24',
  },
  {
    author: 'Ulla S.',
    rating: 5,
    text: 'Aldrig haft så fina fönster tidigare.',
    date: '2026-04-25',
  },
  {
    author: 'Delina Le Nguyen',
    rating: 5,
    text: 'Jättenoga putsade. Det blev mycket rent och snyggt. Tack för det!',
    date: '2026-04-25',
  },
];

export default reviews;
