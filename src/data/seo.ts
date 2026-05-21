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
  nearbyAreas?: Array<{ name: string; slug: string }>;
}

export interface ServiceSeo {
  slug: string;
  name: string;
  title: string;
  description: string;
  bodyTitle: string;
  bodyIntro: string;
  benefits: string[];
  faq: SeoFaq[];
  contactOnly?: boolean;
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
