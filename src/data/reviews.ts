export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  area?: string;
}

export interface ReviewsData {
  aggregateRating: number;
  reviewCount: number;
  googleBusinessUrl: string;
  reviews: Review[];
}

export const reviewsData: ReviewsData = {
  aggregateRating: 5.0,
  reviewCount: 12,
  googleBusinessUrl: 'https://g.page/rutputs',
  reviews: [
    {
      author: 'Anna L.',
      rating: 5,
      text: 'Otroligt nöjd! Anton kom själv, var prick i tid och fönstren har aldrig sett så rena ut. Tydligt pris från start utan krångel.',
      date: '2026-04-12',
      area: 'Järfälla',
    },
    {
      author: 'Mikael S.',
      rating: 5,
      text: 'Smidig bokning online och bra kommunikation. Boken bra abonnemang för villan. Rekommenderar varmt!',
      date: '2026-03-28',
      area: 'Täby',
    },
    {
      author: 'Sara H.',
      rating: 5,
      text: 'Snabb återkoppling, vänligt bemötande och ett resultat som verkligen syns. Tog även med grannen och vi fick båda rabatt.',
      date: '2026-03-05',
      area: 'Solna',
    },
  ],
};
