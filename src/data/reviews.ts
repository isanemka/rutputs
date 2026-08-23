import business from './business.js';
import reviewsList from './reviews-content.js';

export interface Review {
  author: string;
  /** Schema.org-typ för recensenten. Företagskunder ska vara 'Organization'. */
  authorType?: 'Person' | 'Organization';
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
  aggregateRating: business.aggregateRating.ratingValue,
  reviewCount: business.aggregateRating.reviewCount,
  googleBusinessUrl: business.googleBusinessUrl,
  reviews: reviewsList as Review[],
};
