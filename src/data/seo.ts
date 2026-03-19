import rawSiteSeoContent from './seo-content.js';

export interface SeoFaq {
  question: string;
  answer: string;
  linkLabel?: string;
  linkTo?: string;
}

export interface SeoPage {
  title: string;
  description: string;
  bodyTitle: string;
  bodyIntro: string;
  faq?: SeoFaq[];
  benefits?: string[];
  steps?: string[];
}

export interface AreaSeo {
  slug: string;
  name: string;
  title: string;
  description: string;
  content: string;
  districts: string[];
  faq: SeoFaq[];
}

interface SiteSeoContent {
  home: SeoPage;
  company: SeoPage;
  price: SeoPage;
  privacy: SeoPage;
  areas: AreaSeo[];
}

const siteSeoContent = rawSiteSeoContent as SiteSeoContent;

export const homeSeo = siteSeoContent.home;
export const companySeo = siteSeoContent.company;
export const priceSeo = siteSeoContent.price;
export const privacySeo = siteSeoContent.privacy;
export const areaSeoPages = siteSeoContent.areas;

export function getAreaBySlug(slug: string): AreaSeo | undefined {
  return areaSeoPages.find((area) => area.slug === slug);
}

export default siteSeoContent;
