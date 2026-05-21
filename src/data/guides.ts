import type { SeoFaq } from './seo';
import guidesData from './guides-content.js';

export interface GuideSection {
  heading: string;
  /** Allowed inline HTML: <p>, <ul>/<ol>/<li>, <strong>, <em>, <a href>, <br>. Content is authored in guides-content.js (not user-generated input). */
  html: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  h1: string;
  /** Short hero summary (1–2 meningar). */
  intro: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD). Optional. */
  updatedAt?: string;
  /** Approximate reading time in minutes. */
  readingTimeMin: number;
  /** Author label visible to readers and used in Article schema. */
  author: string;
  tags: string[];
  sections: GuideSection[];
  faq: SeoFaq[];
  relatedAreaSlugs?: string[];
  relatedServiceSlugs?: string[];
  /** Optional Q&A primary entity for schema (defaults to article + faq). */
  category?: 'guide' | 'jämförelse' | 'tips';
}

export const guides: Guide[] = guidesData as Guide[];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesSortedByDate(): Guide[] {
  return [...guides].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.slug.localeCompare(b.slug),
  );
}
