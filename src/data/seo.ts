import rawSiteSeoContent from './seo-content.js';

export interface SeoFaq {
  question: string;
  answer: string;
  linkLabel?: string;
  linkTo?: string;
  links?: Array<{
    label: string;
    to: string;
  }>;
}

export interface SeoPage {
  /** ISO date of the last meaningful content change; becomes <lastmod> in sitemap.xml. */
  updatedAt: string;
  title: string;
  description: string;
  bodyTitle: string;
  bodyIntro: string;
  faq?: SeoFaq[];
  benefits?: string[];
  steps?: string[];
}

export interface AreaDistrict {
  name: string;
  text: string;
}

export interface AreaSeo {
  slug: string;
  name: string;
  /** Preposition used with the name: "i" (default) or "på" (på Östermalm). */
  prep?: 'i' | 'på';
  /** ISO date of the last meaningful content change; becomes <lastmod> in sitemap.xml. */
  updatedAt: string;
  /** The page title is generated from a template in site-pages.js. */
  description: string;
  /** Hero lead. */
  content: string;
  housing: string[];
  districts: AreaDistrict[];
  tips: string[];
  /** Row ids from prices.js, most relevant first. */
  priceRows: Array<'apartmentSmall' | 'apartmentLarge' | 'house'>;
  priceNote: string;
  services: string[];
  /** Adds a link to /foretag. */
  company?: boolean;
  guides: string[];
  faq: SeoFaq[];
  nearbyAreas: Array<{ name: string; slug: string }>;
}

export interface ServiceSeo {
  slug: string;
  /** ISO date of the last meaningful content change; becomes <lastmod> in sitemap.xml. */
  updatedAt: string;
  name: string;
  title: string;
  description: string;
  bodyTitle: string;
  bodyIntro: string;
  benefits: string[];
  faq: SeoFaq[];
  contactOnly?: boolean;
  /** Heading of the price section (shown when priceRows is set). */
  priceHeading?: string;
  /** Row ids from prices.js to show in the price table. */
  priceRows?: Array<'apartmentSmall' | 'apartmentLarge' | 'house'>;
  priceNote?: string;
  sections?: Array<{ heading: string; paragraphs: string[] }>;
  /** Adds a link to /foretag. */
  company?: boolean;
  guides?: string[];
  /** Area slugs to link. */
  areas?: string[];
}

interface SiteSeoContent {
  home: SeoPage;
  company: SeoPage;
  price: SeoPage;
  privacy: SeoPage;
  areas: AreaSeo[];
  services: ServiceSeo[];
}

const siteSeoContent = rawSiteSeoContent as SiteSeoContent;

export const homeSeo = siteSeoContent.home;
export const companySeo = siteSeoContent.company;
export const priceSeo = siteSeoContent.price;
export const privacySeo = siteSeoContent.privacy;
export const areaSeoPages = siteSeoContent.areas;
export const servicePages = siteSeoContent.services;

export function getAreaBySlug(slug: string): AreaSeo | undefined {
  return areaSeoPages.find((area) => area.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceSeo | undefined {
  return servicePages.find((service) => service.slug === slug);
}

export default siteSeoContent;
