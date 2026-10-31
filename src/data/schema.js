// JSON-LD builders shared by the Vue app (via site-pages.js) and the Node
// build scripts. Plain JS on purpose: scripts import it without a bundler.

import business from './business.js';
import reviews, { ratingValue, reviewCount } from './reviews-content.js';

export const SITE_URL = 'https://www.rutputs.nu';

/** Canonical URL for a route path: www, no trailing slash (except the root). */
export const absoluteUrl = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const CONTEXT = 'https://schema.org';
const BUSINESS_TYPE = 'HomeAndConstructionBusiness';
const STOCKHOLM_COUNTY = { '@type': 'AdministrativeArea', name: 'Stockholms län' };
export const FROM_PRICE_SEK = 499;

const place = (name) => ({ '@type': 'Place', name, containedInPlace: STOCKHOLM_COUNTY });

const fromPriceOffer = () => ({
  '@type': 'Offer',
  priceCurrency: 'SEK',
  price: String(FROM_PRICE_SEK),
  description: 'Från-pris efter RUT-avdrag',
  priceSpecification: {
    '@type': 'PriceSpecification',
    priceCurrency: 'SEK',
    minPrice: String(FROM_PRICE_SEK),
    valueAddedTaxIncluded: true,
  },
});

/** Business fields every page can repeat; @id ties them to one entity. */
function businessCore() {
  return {
    '@type': BUSINESS_TYPE,
    '@id': business.id,
    name: business.name,
    url: absoluteUrl('/'),
    logo: business.logo,
    image: business.image,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    openingHours: business.openingHours,
    address: { '@type': 'PostalAddress', ...business.address },
    geo: { '@type': 'GeoCoordinates', ...business.geo },
    hasMap: business.googleBusinessUrl,
    sameAs: business.sameAs,
  };
}

export const businessSchema = () => ({
  '@context': CONTEXT,
  ...businessCore(),
  areaServed: STOCKHOLM_COUNTY,
});

/** Full entity for the home page: all areas, services and reviews. */
export function fullBusinessSchema({ areas, services }) {
  return {
    '@context': CONTEXT,
    ...businessCore(),
    description: business.description,
    slogan: business.slogan,
    knowsAbout: business.knowsAbout,
    areaServed: areas.map((area) => place(area.name)),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toFixed(1),
      reviewCount: String(reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: { '@type': review.authorType ?? 'Person', name: review.author },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(review.rating),
        bestRating: '5',
        worstRating: '1',
      },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fönsterputsningstjänster',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.bodyTitle,
          url: absoluteUrl(`/tjanst/${service.slug}`),
        },
      })),
    },
  };
}

/** Business entity scoped to one area page. */
export function areaBusinessSchema(area) {
  return {
    '@context': CONTEXT,
    ...businessCore(),
    description: area.description,
    areaServed: [area.name, ...area.districts.filter((d) => d !== area.name)].map(place),
  };
}

export function websiteSchema() {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: absoluteUrl('/'),
    name: business.name,
    inLanguage: 'sv-SE',
    publisher: { '@id': business.id },
  };
}

export function serviceSchema({ name, description, path, serviceType = 'Fönsterputsning', audience }) {
  return {
    '@context': CONTEXT,
    '@type': 'Service',
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { '@id': business.id },
    areaServed: STOCKHOLM_COUNTY,
    ...(audience ? { audience: { '@type': 'Audience', audienceType: audience } } : {}),
    offers: fromPriceOffer(),
  };
}

export function faqSchema(faq = []) {
  if (!faq.length) {
    return null;
  }
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** @param {Array<{ name: string, path: string }>} items */
export function breadcrumbSchema(items) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(guide, path, image) {
  return {
    '@context': CONTEXT,
    '@type': 'Article',
    headline: guide.title.replace(/\s*\|\s*Rutputs$/, '').slice(0, 110),
    description: guide.description,
    image: [image],
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    author: { '@type': 'Organization', name: guide.author, url: absoluteUrl('/') },
    publisher: {
      '@type': 'Organization',
      name: business.name,
      url: absoluteUrl('/'),
      logo: { '@type': 'ImageObject', url: business.logo },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    inLanguage: 'sv-SE',
    keywords: (guide.tags || []).join(', ') || undefined,
  };
}

export function guideListSchema(guides) {
  return {
    '@context': CONTEXT,
    '@type': 'ItemList',
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/guide/${guide.slug}`),
      name: guide.h1,
    })),
  };
}
