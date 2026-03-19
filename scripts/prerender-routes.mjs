import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import siteSeoContent from '../src/data/seo-content.js';

const baseUrl = 'https://www.rutputs.nu';
const distDir = path.resolve('dist/spa');
const templatePath = path.join(distDir, 'index.html');

const { home, company, price, privacy, areas } = siteSeoContent;

const buildFaqHtml = (faq = []) =>
  `<ul>${faq.map((item) => `<li><strong>${item.question}</strong><br>${item.answer}</li>`).join('')}</ul>`;

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
        html: `<p>${areas.map((page) => `<a href="/omrade/${page.slug}">${page.name}</a>`).join(', ')}</p>`,
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
        html: `<ol>${(price.steps ?? []).map((step) => `<li>${step}</li>`).join('')}</ol>`,
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
        html: `<ul>${(company.benefits ?? []).map((benefit) => `<li>${benefit}</li>`).join('')}</ul>`,
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
        html: `<p>${page.districts.join(', ')}</p>`,
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
        <h2>${section.heading}</h2>
        ${section.html}`,
    )
    .join('');

  return `
    <noscript>
      <div style="max-width:800px;margin:0 auto;padding:2rem;font-family:sans-serif">
        <h1>${page.bodyTitle}</h1>
        <p>${page.bodyIntro}</p>
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
        `<script type="application/ld+json" data-prerender-schema="${index}">${JSON.stringify(schema)}</script>`,
    )
    .join('\n    ');
}

function applyPageSeo(template, page) {
  const canonical = `${baseUrl}${page.route === '/' ? '/' : page.route}`;
  let html = template;

  html = replaceContent(html, /<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`);
  html = setMetaTag(
    html,
    /<meta\s+name=(?:"description"|description)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta name="description" content="${page.description}" />`,
  );
  html = setMetaTag(
    html,
    /<link\s+rel=(?:"canonical"|canonical)\s+href=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+property=(?:"og:title"|og:title)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta property="og:title" content="${page.title}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+property=(?:"og:description"|og:description)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+property=(?:"og:url"|og:url)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+name=(?:"twitter:title"|twitter:title)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta name="twitter:title" content="${page.title}" />`,
  );
  html = setMetaTag(
    html,
    /<meta\s+name=(?:"twitter:description"|twitter:description)\s+content=(?:"[^"]*"|[^\s>]+)\s*\/?>/,
    `<meta name="twitter:description" content="${page.description}" />`,
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