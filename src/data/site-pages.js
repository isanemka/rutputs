// Registry of every prerendered route: head tags, JSON-LD, hero image and
// sitemap metadata. It is the single source of truth for:
//   - usePageSeo() in the Vue app (title, description, canonical, og, JSON-LD)
//   - scripts/prerender.mjs (which routes get their own HTML file)
//   - the generated sitemap.xml and llms.txt
//   - scripts/verify-seo.mjs
// Plain JS so the Node build scripts can import it without a bundler.

import siteSeoContent from './seo-content.js';
import guides from './guides-content.js';
import {
  absoluteUrl,
  areaBusinessSchema,
  articleSchema,
  breadcrumbSchema,
  businessSchema,
  faqSchema,
  fullBusinessSchema,
  guideListSchema,
  priceListSchema,
  serviceSchema,
  SITE_URL,
  websiteSchema,
} from './schema.js';

export { SITE_URL, absoluteUrl };

const { home, company, price, privacy, areas, services } = siteSeoContent;

export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const BRAND_SUFFIX = ' | Rutputs';
const START = { name: 'Start', path: '/' };

const LANDSCAPE_IMAGES = [
  '/img/25050.webp',
  '/img/25051.webp',
  '/img/25052.webp',
  '/img/25053.webp',
  '/img/25054.webp',
  '/img/25055.webp',
];
const PORTRAIT_IMAGES = ['/img/15050.webp', '/img/15051.webp', '/img/15052.webp', '/img/15053.webp'];

// Page types whose layout starts with a full-width hero photo.
const PAGE_TYPES_WITH_HERO = new Set(['home', 'area', 'service']);

/** "i Kista", "på Östermalm". */
export const areaLocative = (area) => `${area.prep || 'i'} ${area.name}`;

export const areaTitle = (area) => `Fönsterputs ${area.name} – pris med RUT-avdrag${BRAND_SUFFIX}`;

const withBrand = (title) => (title.endsWith(BRAND_SUFFIX.trim()) ? title : `${title}${BRAND_SUFFIX}`);

export const guidesByDate = () =>
  [...guides].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.slug.localeCompare(b.slug),
  );

const latestDate = (dates) => dates.filter(Boolean).sort().at(-1);

// Stable per-path pick so the server-rendered <img> matches the client and
// the same page always shows the same hero (no hydration mismatch).
function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function heroImagesFor(path) {
  if (path === '/') {
    return { portrait: PORTRAIT_IMAGES[0], landscape: LANDSCAPE_IMAGES[0] };
  }
  const hash = hashString(path);
  return {
    portrait: PORTRAIT_IMAGES[hash % PORTRAIT_IMAGES.length],
    landscape: LANDSCAPE_IMAGES[hash % LANDSCAPE_IMAGES.length],
  };
}

/**
 * Normalises a router path for registry lookups: decoded, no trailing slash
 * (except the root) and no index.html.
 */
export function normalizePath(path) {
  let normalized = path || '/';
  try {
    normalized = decodeURI(normalized);
  } catch {
    // Keep the raw path if it is not valid URI encoding.
  }
  normalized = normalized.replace(/\/index(\.html)?$/, '/');
  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, '');
  }
  return normalized || '/';
}

function buildPages() {
  const sortedGuides = guidesByDate();
  const pages = [];

  pages.push({
    path: '/',
    type: 'home',
    title: home.title,
    description: home.description,
    lastmod: home.updatedAt,
    changefreq: 'weekly',
    priority: '1.0',
    breadcrumbs: [START],
    schemas: () => [fullBusinessSchema({ areas, services }), websiteSchema(), faqSchema(home.faq)],
  });

  pages.push({
    path: '/pris',
    type: 'price',
    title: price.title,
    description: price.description,
    lastmod: price.updatedAt,
    changefreq: 'weekly',
    priority: '0.9',
    breadcrumbs: [START, { name: 'Pris', path: '/pris' }],
    schemas: () => [
      businessSchema(),
      priceListSchema({ name: 'Fönsterputs i Stockholm', description: price.description, path: '/pris' }),
      faqSchema(price.faq),
    ],
  });

  pages.push({
    path: '/foretag',
    type: 'company',
    title: company.title,
    description: company.description,
    lastmod: company.updatedAt,
    changefreq: 'monthly',
    priority: '0.8',
    breadcrumbs: [START, { name: 'Företag', path: '/foretag' }],
    schemas: () => [
      businessSchema(),
      serviceSchema({
        name: company.bodyTitle,
        description: company.description,
        path: '/foretag',
        serviceType: 'Fönsterputsning för företag',
        audience: 'Företag',
        rutOffer: false,
      }),
      faqSchema(company.faq),
    ],
  });

  for (const area of areas) {
    const path = `/omrade/${area.slug}`;
    pages.push({
      path,
      type: 'area',
      title: areaTitle(area),
      description: area.description,
      lastmod: area.updatedAt,
      changefreq: 'monthly',
      priority: '0.8',
      breadcrumbs: [START, { name: area.name, path }],
      schemas: () => [areaBusinessSchema(area), faqSchema(area.faq)],
    });
  }

  for (const service of services) {
    const path = `/tjanst/${service.slug}`;
    pages.push({
      path,
      type: 'service',
      title: service.title,
      description: service.description,
      lastmod: service.updatedAt,
      changefreq: 'monthly',
      priority: '0.8',
      breadcrumbs: [START, { name: service.name, path }],
      schemas: () => [
        businessSchema(),
        serviceSchema({ name: service.bodyTitle, description: service.description, path }),
        faqSchema(service.faq),
      ],
    });
  }

  pages.push({
    path: '/guide',
    type: 'guideHub',
    title: 'Guider om fönsterputs – pris, RUT-avdrag och tips | Rutputs',
    description:
      'Praktiska guider om fönsterputs i Stockholm: RUT-avdrag, hur ofta du bör putsa fönster, inglasade balkonger och fler råd inför nästa puts.',
    lastmod: latestDate(sortedGuides.map((g) => g.updatedAt || g.publishedAt)),
    changefreq: 'weekly',
    priority: '0.7',
    breadcrumbs: [START, { name: 'Guider', path: '/guide' }],
    schemas: () => [guideListSchema(sortedGuides)],
  });

  for (const guide of sortedGuides) {
    const path = `/guide/${guide.slug}`;
    const image = guide.ogImage ? `${SITE_URL}/og/guide-${guide.slug}.jpg` : DEFAULT_IMAGE;
    pages.push({
      path,
      type: 'guide',
      title: withBrand(guide.title),
      description: guide.description,
      image,
      ogType: 'article',
      lastmod: guide.updatedAt || guide.publishedAt,
      changefreq: 'monthly',
      priority: '0.7',
      breadcrumbs: [START, { name: 'Guider', path: '/guide' }, { name: guide.h1, path }],
      schemas: () => [articleSchema(guide, path, image), faqSchema(guide.faq)],
    });
  }

  pages.push({
    path: '/integritetspolicy',
    type: 'privacy',
    title: privacy.title,
    description: privacy.description,
    lastmod: privacy.updatedAt,
    changefreq: 'yearly',
    priority: '0.3',
    breadcrumbs: [START, { name: 'Integritetspolicy', path: '/integritetspolicy' }],
    schemas: () => [],
  });

  // Utility pages: prerendered so direct visits work, but kept out of the index.
  pages.push(
    {
      path: '/bekraftelse',
      type: 'utility',
      title: 'Tack för din förfrågan | Rutputs',
      description: 'Vi har tagit emot din förfrågan och återkommer med en offert.',
      noindex: true,
    },
    {
      path: '/fel',
      type: 'utility',
      title: 'Något gick fel | Rutputs',
      description: 'Din förfrågan kunde inte skickas. Ring eller mejla oss så hjälper vi dig.',
      noindex: true,
    },
  );

  return pages.map((page) => ({
    image: DEFAULT_IMAGE,
    ogType: 'website',
    noindex: false,
    breadcrumbs: [],
    ...page,
    canonical: absoluteUrl(page.path),
    hero: PAGE_TYPES_WITH_HERO.has(page.type) ? heroImagesFor(page.path) : null,
  }));
}

const pages = buildPages();
const pagesByPath = new Map(pages.map((page) => [page.path, page]));

export const NOT_FOUND_PAGE = {
  path: null,
  type: 'notFound',
  title: 'Sidan kunde inte hittas | Rutputs',
  description: 'Sidan du letar efter finns inte. Gå till startsidan, se priser eller välj ditt område.',
  image: DEFAULT_IMAGE,
  ogType: 'website',
  noindex: true,
  breadcrumbs: [],
  hero: null,
};

/** All routes that get a prerendered HTML file (indexable and utility). */
export const getPrerenderPages = () => pages;

/** Routes that belong in the sitemap. */
export const getIndexablePages = () => pages.filter((page) => !page.noindex);

export const getPage = (path) => pagesByPath.get(normalizePath(path));

/** JSON-LD objects for a page: page-specific schemas plus a BreadcrumbList. */
export function getPageSchemas(page) {
  if (page.noindex || !page.schemas) {
    return [];
  }
  const schemas = page.schemas().filter(Boolean);
  if (page.breadcrumbs.length) {
    schemas.push(breadcrumbSchema(page.breadcrumbs));
  }
  return schemas;
}
