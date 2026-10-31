import { areaSeoPages } from './seo';

export interface AreaLink {
  slug: string;
  name: string;
}

// Derived from the area pages so links in the footer, on the home page and on
// the price page always match the pages that exist.
export const areas: AreaLink[] = areaSeoPages.map(({ slug, name }) => ({ slug, name }));
