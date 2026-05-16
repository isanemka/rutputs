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
  reviewCount: 3,
  googleBusinessUrl: 'https://g.page/r/rutputs/review',
  reviews: [
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
  ],
};
