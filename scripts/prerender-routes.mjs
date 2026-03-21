import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import siteSeoContent from '../src/data/seo-content.js';

const baseUrl = 'https://www.rutputs.nu';
const distDir = path.resolve('dist/spa');
const templatePath = path.join(distDir, 'index.html');

const { home, company, price, privacy, areas } = siteSeoContent;

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
        heading: 'Områden vi täcker',
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
        provider: {
          '@type': 'LocalBusiness',
          name: 'Rutputs',
          url: `${baseUrl}/`,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SEK',
          price: '350',
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
        provider: {
          '@type': 'LocalBusiness',
          name: 'Rutputs',
          url: `${baseUrl}/`,
        },
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
        heading: `Områden vi täcker i ${page.name}`,
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
        provider: {
          '@type': 'LocalBusiness',
          name: 'Rutputs',
          url: `${baseUrl}/`,
        },
        areaServed: {
          '@type': 'City',
          name: page.name,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SEK',
          price: '350',
          description: 'Från-pris efter RUT-avdrag',
        },
      },
      buildFaqSchema(page.faq),
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

async function main() {
  const template = await readFile(templatePath, 'utf8');
  await Promise.all(pages.map((page) => writePage(page, template)));
  console.log(`Prerendered ${pages.length} SEO routes in dist/spa.`);
}

main().catch((error) => {
  console.error('Failed to prerender SEO routes.', error);
  process.exitCode = 1;
});
