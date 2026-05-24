import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import siteSeoContent from '../src/data/seo-content.js';
import guides from '../src/data/guides-content.js';
import business from '../src/data/business.js';

const baseUrl = 'https://www.rutputs.nu';
const distDir = path.resolve('dist/spa');
const publicDir = path.resolve('public');
const templatePath = path.join(distDir, 'index.html');

const { home, company, price, privacy, areas, services = [] } = siteSeoContent;

// Single business entity, referenced by @id from per-page Service schemas.
const businessRef = { '@type': 'LocalBusiness', '@id': business.id };

function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': business.id,
    name: business.name,
    slogan: business.slogan,
    url: business.url,
    logo: business.logo,
    image: business.image,
    description: business.description,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    openingHours: business.openingHours,
    address: { '@type': 'PostalAddress', ...business.address },
    geo: { '@type': 'GeoCoordinates', ...business.geo },
    hasMap: business.googleBusinessUrl,
    sameAs: business.sameAs,
    knowsAbout: business.knowsAbout,
    areaServed: areas.map((a) => ({ '@type': 'City', name: a.name })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(business.aggregateRating.ratingValue),
      reviewCount: String(business.aggregateRating.reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fönsterputsningstjänster',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.bodyTitle || s.name,
          description: s.description,
        },
      })),
    },
  };
}

// Replace the static LocalBusiness JSON-LD in the template with one generated
// from the single source of truth (business.js + areas + services), so the
// prerendered markup never drifts from the data.
function injectLocalBusinessSchema(template) {
  const generated = `<script type="application/ld+json">${escapeJsonForScript(
    buildLocalBusinessSchema(),
  )}</script>`;
  if (/<script type="application\/ld\+json">[\s\S]*?<\/script>/.test(template)) {
    return template.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      generated,
    );
  }
  return template.replace(/<\/head>/, `    ${generated}\n  </head>`);
}

const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.path}`,
  })),
});

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeJsonForScript(value) {
  return JSON.stringify(value)
    .replaceAll('<', '\\u003C')
    .replaceAll('>', '\\u003E')
    .replaceAll('&', '\\u0026');
}

const buildFaqHtml = (faq = []) =>
  `<ul>${faq
    .map((item) => {
      const linksHtml = Array.isArray(item.links) && item.links.length
        ? `<br>${item.links
          .map((link) => `<a href="${escapeHtml(link.to)}">${escapeHtml(link.label)}</a>`)
          .join(', ')}`
        : '';
      const linkHtml =
        item.linkLabel && item.linkTo
          ? `<br><a href="${escapeHtml(item.linkTo)}">${escapeHtml(item.linkLabel)}</a>`
          : '';

      return `<li><strong>${escapeHtml(item.question)}</strong><br>${escapeHtml(item.answer)}${linksHtml}${linkHtml}</li>`;
    })
    .join('')}</ul>`;

const buildLinkListHtml = (items = []) =>
  `<p>${items
    .map((item) => `<a href="/omrade/${encodeURIComponent(item.slug)}">${escapeHtml(item.name)}</a>`)
    .join(', ')}</p>`;

const buildTextListHtml = (items = [], tagName = 'ul') =>
  `<${tagName}>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</${tagName}>`;

const buildDistrictsHtml = (districts = []) => `<p>${districts.map((district) => escapeHtml(district)).join(', ')}</p>`;

const buildFaqSchema = (faq = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

const pages = [
  {
    route: '/',
    title: home.title,
    description: home.description,
    bodyTitle: home.bodyTitle,
    bodyIntro: home.bodyIntro,
    sections: [
      {
        heading: 'Områden jag täcker',
        html: buildLinkListHtml(areas),
      },
      {
        heading: 'Vanliga frågor',
        html: buildFaqHtml(home.faq),
      },
    ],
    extraSchemas: [buildFaqSchema(home.faq)],
  },
  {
    route: '/pris',
    title: price.title,
    description: price.description,
    bodyTitle: price.bodyTitle,
    bodyIntro: price.bodyIntro,
    sections: [
      {
        heading: 'Så fungerar prisberäkningen',
        html: buildTextListHtml(price.steps, 'ol'),
      },
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Prisberäkning för fönsterputs',
        serviceType: 'Fönsterputsning',
        provider: businessRef,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SEK',
          price: '499',
          description: 'Från-pris efter RUT-avdrag',
        },
      },
      buildFaqSchema(price.faq),
    ],
  },
  {
    route: '/foretag',
    title: company.title,
    description: company.description,
    bodyTitle: company.bodyTitle,
    bodyIntro: company.bodyIntro,
    sections: [
      {
        heading: 'Fördelar för företag',
        html: buildTextListHtml(company.benefits),
      },
      {
        heading: 'Vanliga frågor från företag',
        html: buildFaqHtml(company.faq),
      },
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fönsterputs för företag i Stockholm',
        serviceType: 'Fönsterputsning för företag',
        provider: businessRef,
        areaServed: 'Stockholm',
        url: `${baseUrl}/foretag`,
      },
      buildFaqSchema(company.faq),
    ],
  },
  {
    route: '/integritetspolicy',
    title: privacy.title,
    description: privacy.description,
    bodyTitle: privacy.bodyTitle,
    bodyIntro: privacy.bodyIntro,
    sections: [],
  },
  ...areas.map((page) => ({
    route: `/omrade/${page.slug}`,
    title: page.title,
    description: page.description,
    bodyTitle: `Fönsterputs i ${page.name}`,
    bodyIntro: page.content,
    sections: [
      {
        heading: `Områden jag täcker i ${page.name}`,
        html: buildDistrictsHtml(page.districts),
      },
      {
        heading: `Vanliga frågor om fönsterputs i ${page.name}`,
        html: buildFaqHtml(page.faq),
      },
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Fönsterputs i ${page.name}`,
        serviceType: 'Fönsterputsning',
        description: page.description,
        url: `${baseUrl}/omrade/${page.slug}`,
        provider: businessRef,
        areaServed: {
          '@type': 'City',
          name: page.name,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SEK',
          price: '499',
          description: 'Från-pris efter RUT-avdrag',
        },
      },
      buildFaqSchema(page.faq),
      buildBreadcrumbSchema([
        { name: 'Start', path: '/' },
        { name: page.name, path: `/omrade/${page.slug}` },
      ]),
    ],
  })),
  ...services.map((page) => ({
    route: `/tjanst/${page.slug}`,
    title: page.title,
    description: page.description,
    bodyTitle: page.bodyTitle,
    bodyIntro: page.bodyIntro,
    sections: [
      { heading: 'Det här ingår', html: buildTextListHtml(page.benefits) },
      { heading: 'Vanliga frågor', html: buildFaqHtml(page.faq) },
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.bodyTitle,
        serviceType: 'Fönsterputsning',
        description: page.description,
        url: `${baseUrl}/tjanst/${page.slug}`,
        provider: businessRef,
        areaServed: 'Stockholm',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SEK',
          price: '499',
          description: 'Från-pris efter RUT-avdrag',
        },
      },
      buildFaqSchema(page.faq),
      buildBreadcrumbSchema([
        { name: 'Start', path: '/' },
        { name: page.name, path: `/tjanst/${page.slug}` },
      ]),
    ],
  })),
  {
    route: '/guide',
    title: 'Guider om fönsterputs i Stockholm | Rutputs',
    description:
      'Råd, prisinfo och guider om fönsterputs i Stockholm — RUT-avdrag, intervall, säsongstips och mer.',
    bodyTitle: 'Guider om fönsterputs',
    bodyIntro:
      'Vi samlar handfasta guider om fönsterputs i Stockholm — från hur ofta du bör putsa till hur RUT-avdraget fungerar.',
    sections: [
      {
        heading: 'Alla guider',
        html: `<ul>${[...guides]
          .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.slug.localeCompare(b.slug)))
          .map(
            (g) =>
              `<li><a href="/guide/${escapeHtml(g.slug)}">${escapeHtml(g.title)}</a> — ${escapeHtml(g.description)}</li>`,
          )
          .join('')}</ul>`,
      },
    ],
    extraSchemas: [
      buildBreadcrumbSchema([
        { name: 'Start', path: '/' },
        { name: 'Guider', path: '/guide' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: [...guides]
          .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.slug.localeCompare(b.slug)))
          .map((g, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${baseUrl}/guide/${g.slug}`,
            name: g.title,
          })),
      },
    ],
  },
  ...guides.map((guide) => ({
    route: `/guide/${guide.slug}`,
    title: `${guide.title} | Rutputs`,
    description: guide.description,
    image: guide.ogImage ? `${baseUrl}/og/guide-${guide.slug}.jpg` : `${baseUrl}/og-image.jpg`,
    bodyTitle: guide.h1,
    bodyIntro: guide.intro,
    sections: [
      ...guide.sections.map((section) => ({
        heading: section.heading,
        html: section.html,
      })),
      {
        heading: 'Vanliga frågor',
        html: buildFaqHtml(guide.faq),
      },
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        author: { '@type': 'Organization', name: guide.author },
        publisher: {
          '@type': 'Organization',
          name: 'Rutputs',
          url: `${baseUrl}/`,
        },
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt || guide.publishedAt,
        mainEntityOfPage: `${baseUrl}/guide/${guide.slug}`,
        image: guide.ogImage ? `${baseUrl}/og/guide-${guide.slug}.jpg` : `${baseUrl}/og-image.jpg`,
        inLanguage: 'sv-SE',
      },
      buildFaqSchema(guide.faq),
      buildBreadcrumbSchema([
        { name: 'Start', path: '/' },
        { name: 'Guider', path: '/guide' },
        { name: guide.h1, path: `/guide/${guide.slug}` },
      ]),
    ],
  })),
];

function replaceContent(source, pattern, replacement) {
  if (!pattern.test(source)) {
    return source;
  }

  return source.replace(pattern, replacement);
}

function setMetaTag(html, matcher, replacement) {
  return replaceContent(html, matcher, replacement);
}

function buildNoscript(page) {
  const sectionsHtml = page.sections
    .map(
      (section) => `
        <h2>${escapeHtml(section.heading)}</h2>
        ${section.html}`,
    )
    .join('');

  return `
    <noscript>
      <div style="max-width:800px;margin:0 auto;padding:2rem;font-family:sans-serif">
        <h1>${escapeHtml(page.bodyTitle)}</h1>
        <p>${escapeHtml(page.bodyIntro)}</p>
        ${sectionsHtml}
        <h2>Kontakt</h2>
        <p>Telefon: <a href="tel:+46734644604">0734-64 46 04</a></p>
        <p>E-post: <a href="mailto:kontakt@rutputs.nu">kontakt@rutputs.nu</a></p>
        <p><a href="/pris">Se pris och boka</a></p>
      </div>
    </noscript>
  `.trim();
}

function buildSchemaTags(page) {
  return (page.extraSchemas || [])
    .map(
      (schema, index) =>
        `<script type="application/ld+json" data-prerender-schema="${index}">${escapeJsonForScript(schema)}</script>`,
    )
    .join('\n    ');
}

function applyPageSeo(template, page) {
  const canonical = `${baseUrl}${page.route === '/' ? '/' : page.route}`;
  const escapedTitle = escapeHtml(page.title);
  const escapedDescription = escapeHtml(page.description);
  const escapedCanonical = escapeHtml(canonical);
  let html = template;

  html = replaceContent(html, /<title>[\s\S]*?<\/title>/, `<title>${escapedTitle}</title>`);
  html = setMetaTag(
    html,
    /<meta\s+name=(?:"description"|description)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta name="description" content="${escapedDescription}" />`,
  );
  html = setMetaTag(
    html,
    /<link\s+rel=(?:"canonical"|canonical)\s+href=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<link rel="canonical" href="${escapedCanonical}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+property=(?:"og:title"|og:title)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta property="og:title" content="${escapedTitle}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+property=(?:"og:description"|og:description)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta property="og:description" content="${escapedDescription}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+property=(?:"og:url"|og:url)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta property="og:url" content="${escapedCanonical}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+name=(?:"twitter:title"|twitter:title)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta name="twitter:title" content="${escapedTitle}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+name=(?:"twitter:description"|twitter:description)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta name="twitter:description" content="${escapedDescription}" />`,
  );
  if (page.image) {
    const escapedImage = escapeHtml(page.image);
    html = setMetaTag(
      html,
      /<meta\s+property=(?:"og:image"|og:image)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
      `<meta property="og:image" content="${escapedImage}" />`,
    );
    html = setMetaTag(
      html,
      /<meta\s+name=(?:"twitter:image"|twitter:image)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
      `<meta name="twitter:image" content="${escapedImage}" />`,
    );
  }
  html = replaceContent(html, /<noscript>[\s\S]*?<\/noscript>/, buildNoscript(page));
  html = replaceContent(
    html,
    /<script type="application\/ld\+json" data-prerender-schema="[^"]*">[\s\S]*?<\/script>\s*/g,
    '',
  );

  const schemaTags = buildSchemaTags(page);
  if (schemaTags) {
    html = replaceContent(html, /<\/head>/, `    ${schemaTags}\n  </head>`);
  }

  return html;
}

async function writePage(page, template) {
  const html = applyPageSeo(template, page);
  const routePath = page.route === '/' ? distDir : path.join(distDir, page.route.replace(/^\//, ''));

  await mkdir(routePath, { recursive: true });

  const outputPath = page.route === '/' ? templatePath : path.join(routePath, 'index.html');
  await writeFile(outputPath, html, 'utf8');
}

function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/pris', changefreq: 'weekly', priority: '0.9' },
    { loc: '/foretag', changefreq: 'monthly', priority: '0.8' },
    ...areas.map((a) => ({
      loc: `/omrade/${a.slug}`,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...services.map((s) => ({
      loc: `/tjanst/${s.slug}`,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    { loc: '/guide', changefreq: 'weekly', priority: '0.7' },
    ...guides.map((g) => ({
      loc: `/guide/${g.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
    })),
    { loc: '/integritetspolicy', changefreq: 'yearly', priority: '0.3' },
  ];

  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${baseUrl}${e.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function writeSitemap() {
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  await writeFile(sitemapPath, buildSitemapXml(), 'utf8');
}

function buildLlmsTxt() {
  const sortedGuides = [...guides].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.slug.localeCompare(b.slug),
  );
  const homeFaq = (home.faq || []).slice(0, 6);

  return `# Rutputs – Fönsterputsning i Stockholm

> ${business.description}

## Om Rutputs
Rutputs erbjuder professionell fönsterputsning för privatpersoner och företag i Stockholm. Med RUT-avdrag (50% skattereduktion) börjar priset från 499 kr. När du bokar hos Rutputs är det också jag som kommer och putsar.

## Tjänster
${services.map((s) => `- ${s.bodyTitle || s.name}`).join('\n')}

## Serviceområden
${areas.map((a) => `- ${a.name}`).join('\n')}

## Priser
- Från 499 SEK efter RUT-avdrag (50% skattereduktion)
- Priset beror på antal fönster och bostadstyp
- Få exakt pris via formuläret: ${baseUrl}/pris

## Kontakt
- Telefon: ${business.phoneDisplay}
- E-post: ${business.email}
- Webb: ${business.url}

## Öppettider
Måndag–fredag 08:00–18:00

## Sidor
- Startsida: ${baseUrl}/
- Prislista: ${baseUrl}/pris
- Företag: ${baseUrl}/foretag
- Guider: ${baseUrl}/guide
- Integritetspolicy: ${baseUrl}/integritetspolicy

## Tjänstesidor
${services.map((s) => `- ${baseUrl}/tjanst/${s.slug}`).join('\n')}

## Guider
- ${baseUrl}/guide
${sortedGuides.map((g) => `- ${baseUrl}/guide/${g.slug}`).join('\n')}

## Områdessidor
${areas.map((a) => `- ${baseUrl}/omrade/${a.slug}`).join('\n')}

## Vanliga frågor
${homeFaq.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')}
`;
}

async function writeLlmsTxt() {
  const content = buildLlmsTxt();
  // Write the production output and keep the public source copy in sync so the
  // two can never drift apart.
  await writeFile(path.join(distDir, 'llms.txt'), content, 'utf8');
  await writeFile(path.join(publicDir, 'llms.txt'), content, 'utf8');
}

async function main() {
  const rawTemplate = await readFile(templatePath, 'utf8');
  const template = injectLocalBusinessSchema(rawTemplate);
  await Promise.all(pages.map((page) => writePage(page, template)));
  await writeSitemap();
  await writeLlmsTxt();
  console.log(`Prerendered ${pages.length} SEO routes, sitemap.xml and llms.txt in dist/spa.`);
}

main().catch((error) => {
  console.error('Failed to prerender SEO routes.', error);
  process.exitCode = 1;
});
