import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = 'https://www.rutputs.nu';
const distDir = path.resolve('dist/spa');
const templatePath = path.join(distDir, 'index.html');

const homeFaqs = [
  {
    question: 'Vad kostar fönsterputsning med RUT-avdrag?',
    answer:
      'Fönsterputsning med RUT-avdrag börjar från 350 kr. Det exakta priset beror på antal fönster och typ av bostad. Använd vår priskalkylator för att se ditt pris direkt.',
  },
  {
    question: 'Vilka områden täcker Rutputs?',
    answer:
      'Rutputs täcker norra Stockholm: Järfälla, Bromma, Kista, Solna, Sundbyberg, Spånga, Sollentuna och Täby.',
  },
  {
    question: 'Hur bokar jag fönsterputsning?',
    answer:
      'Fyll i formuläret på vår prissida så räknas ditt pris ut direkt. Vi kontaktar dig sedan för att boka en tid som passar.',
  },
  {
    question: 'Putsar ni även företagsfönster?',
    answer:
      'Ja, vi erbjuder professionell fönsterputsning för kontor och företagslokaler i norra Stockholm. Kontakta oss för en offert.',
  },
];

const areaPages = [
  {
    slug: 'jarfalla',
    name: 'Järfälla',
    title: 'Fönsterputs Järfälla – Från 350 kr med RUT-avdrag | Rutputs',
    description:
      'Professionell fönsterputs i Järfälla med RUT-avdrag. Från 350 kr. Vi täcker Jakobsberg, Viksjö, Barkarby och Kallhäll. Boka enkelt online!',
    intro:
      'Rutputs hjälper privatkunder i Järfälla med professionell fönsterputsning för villa, radhus och lägenhet. Vi arbetar löpande i området och gör det enkelt att boka en tid som passar.',
    districts: ['Jakobsberg', 'Viksjö', 'Barkarby', 'Kallhäll'],
    faq: [
      {
        question: 'Vad kostar fönsterputs i Järfälla?',
        answer:
          'Priset börjar från 350 kr efter RUT-avdrag. Det exakta priset beror på hur många fönster du har och vilken typ av bostad du bor i.',
      },
      {
        question: 'Täcker ni hela Järfälla?',
        answer:
          'Ja, vi hjälper kunder i bland annat Jakobsberg, Viksjö, Barkarby och Kallhäll samt övriga delar av Järfälla.',
      },
    ],
  },
  {
    slug: 'bromma',
    name: 'Bromma',
    title: 'Fönsterputs Bromma – Från 350 kr med RUT-avdrag | Rutputs',
    description:
      'Fönsterputsning i Bromma med RUT-avdrag från 350 kr. Vi täcker Abrahamsberg, Ulvsunda, Nockeby och hela Bromma. Boka enkelt online!',
    intro:
      'Rutputs erbjuder fönsterputs i Bromma för dig som vill ha rena fönster utan krångel. Tjänsten passar både villor, radhus och lägenheter i hela området.',
    districts: ['Abrahamsberg', 'Ulvsunda', 'Nockeby', 'Ålsten'],
    faq: [
      {
        question: 'Arbetar ni i villaområden i Bromma?',
        answer:
          'Ja, Bromma är ett vanligt område för villa- och radhuskunder, men vi hjälper också kunder i lägenhet och mindre fastigheter.',
      },
      {
        question: 'Vilka delar av Bromma täcker ni?',
        answer:
          'Vi arbetar bland annat i Abrahamsberg, Ulvsunda, Nockeby och Ålsten samt i övriga delar av Bromma.',
      },
    ],
  },
  {
    slug: 'kista',
    name: 'Kista',
    title: 'Fönsterputs Kista – Från 350 kr med RUT-avdrag | Rutputs',
    description:
      'Fönsterputs i Kista med RUT-avdrag från 350 kr. Professionell service för bostäder och kontor i Kista, Husby och Akalla. Boka idag!',
    intro:
      'Rutputs erbjuder fönsterputs i Kista för både privatpersoner och företag. Det passar dig som vill boka en smidig tjänst med tydlig prissättning och snabb återkoppling.',
    districts: ['Kista', 'Husby', 'Akalla', 'Ärvinge'],
    faq: [
      {
        question: 'Erbjuder ni fönsterputs för företag i Kista?',
        answer:
          'Ja, vi hjälper både privatkunder och företag i Kista med professionell fönsterputsning och flexibla upplägg.',
      },
      {
        question: 'Vilka delar av Kista täcker ni?',
        answer:
          'Vi arbetar i Kista, Husby, Akalla och Ärvinge samt närliggande områden i norra Stockholm.',
      },
    ],
  },
  {
    slug: 'solna',
    name: 'Solna',
    title: 'Fönsterputs Solna – Från 350 kr med RUT-avdrag | Rutputs',
    description:
      'Fönsterputs i Solna med RUT-avdrag från 350 kr. Vi täcker Bergshamra, Råsunda, Huvudsta och Hagalund. Boka enkelt online!',
    intro:
      'Rutputs hjälper kunder i Solna som vill ha rena fönster året runt eller inför särskilda tillfällen. Vi arbetar i hela området och gör bokningen enkel.',
    districts: ['Bergshamra', 'Råsunda', 'Huvudsta', 'Hagalund'],
    faq: [
      {
        question: 'Vilka områden i Solna täcker ni?',
        answer:
          'Vi hjälper kunder i bland annat Bergshamra, Råsunda, Huvudsta och Hagalund samt i övriga delar av Solna.',
      },
      {
        question: 'Passar tjänsten även lägenheter i Solna?',
        answer:
          'Ja, vi arbetar med både lägenheter, radhus och villor. Upplägget anpassas efter bostadens storlek och antal fönster.',
      },
    ],
  },
  {
    slug: 'sundbyberg',
    name: 'Sundbyberg',
    title: 'Fönsterputs Sundbyberg – Från 350 kr med RUT-avdrag | Rutputs',
    description:
      'Boka fönsterputs i Sundbyberg med RUT-avdrag från 350 kr. Vi täcker Lilla Alby, Ursvik, Rissne och hela Sundbyberg. Fyll i formuläret för ditt pris!',
    intro:
      'Rutputs hjälper kunder i Sundbyberg som vill boka snabb och smidig fönsterputsning med tydlig prissättning. Vi arbetar regelbundet i kommunen och närliggande områden.',
    districts: ['Lilla Alby', 'Ursvik', 'Rissne', 'Duvbo'],
    faq: [
      {
        question: 'Täcker ni hela Sundbyberg?',
        answer:
          'Ja, vi arbetar i hela Sundbyberg och hjälper kunder i bland annat Lilla Alby, Ursvik, Rissne och Duvbo.',
      },
      {
        question: 'Hur fungerar RUT-avdrag för fönsterputs?',
        answer:
          'RUT-avdraget dras direkt på priset för privatkunder som uppfyller villkoren, vilket gör att priset kan börja från 350 kr.',
      },
    ],
  },
  {
    slug: 'spanga',
    name: 'Spånga',
    title: 'Fönsterputs Spånga – Från 350 kr med RUT-avdrag | Rutputs',
    description:
      'Fönsterputs i Spånga-Tensta med RUT-avdrag från 350 kr. Snabb och pålitlig service i hela Spånga. Fyll i formuläret för ditt pris!',
    intro:
      'Rutputs erbjuder fönsterputs i Spånga för villa, radhus och lägenhet. Tjänsten är byggd för att vara enkel att boka och ge ett noggrant resultat varje gång.',
    districts: ['Spånga', 'Tensta', 'Bromsten', 'Solhem'],
    faq: [
      {
        question: 'Arbetar ni i hela Spånga-Tensta?',
        answer:
          'Ja, vi hjälper kunder i Spånga, Tensta, Bromsten, Solhem och närliggande områden i västra och norra Stockholm.',
      },
      {
        question: 'Passar tjänsten villa och radhus i Spånga?',
        answer:
          'Absolut. Spånga är ett vanligt område för villa- och radhuskunder, men vi arbetar även med lägenheter och mindre fastigheter.',
      },
    ],
  },
  {
    slug: 'sollentuna',
    name: 'Sollentuna',
    title: 'Fönsterputs Sollentuna – Från 350 kr med RUT-avdrag | Rutputs',
    description:
      'Fönsterputsning i Sollentuna med RUT-avdrag från 350 kr. Vi täcker Tureberg, Edsberg, Häggvik och hela Sollentuna kommun. Boka online!',
    intro:
      'Rutputs erbjuder fönsterputsning i Sollentuna med tydlig prissättning och smidig bokning. Närheten till Järfälla gör det lätt att planera in tider snabbt.',
    districts: ['Tureberg', 'Edsberg', 'Häggvik', 'Helenelund'],
    faq: [
      {
        question: 'Vilka områden i Sollentuna täcker ni?',
        answer:
          'Vi arbetar bland annat i Tureberg, Edsberg, Häggvik och Helenelund samt i övriga delar av Sollentuna kommun.',
      },
      {
        question: 'Kan jag boka som återkommande kund i Sollentuna?',
        answer:
          'Ja, det går bra att boka både enstaka putsningar och återkommande intervaller beroende på behov och säsong.',
      },
    ],
  },
  {
    slug: 'taby',
    name: 'Täby',
    title: 'Fönsterputs Täby – Från 350 kr med RUT-avdrag | Rutputs',
    description:
      'Professionell fönsterputsning i Täby med RUT-avdrag. Villor, radhus och lägenheter. Boka online från 350 kr!',
    intro:
      'Rutputs hjälper kunder i Täby som vill ha rena fönster med tydlig prissättning och enkel bokning. Tjänsten passar både större villor, radhus och lägenheter.',
    districts: ['Täby Centrum', 'Näsbypark', 'Gribbylund', 'Arninge'],
    faq: [
      {
        question: 'Vilka områden i Täby täcker ni?',
        answer:
          'Vi hjälper kunder i bland annat Täby Centrum, Näsbypark, Gribbylund och Arninge samt i övriga delar av Täby.',
      },
      {
        question: 'Passar fönsterputs i Täby större villor och radhus?',
        answer:
          'Ja, tjänsten är anpassad för både större villor, radhus, lägenheter och mindre fastigheter beroende på antal fönster och behov.',
      },
    ],
  },
];

const pages = [
  {
    route: '/',
    title: 'Fönsterputs norra Stockholm – Från 350 kr med RUT | Rutputs',
    description:
      'Rutputs erbjuder professionell fönsterputsning i norra Stockholm med RUT-avdrag. Från 350 kr. Vi täcker Järfälla, Sundbyberg, Solna, Spånga med flera områden. Boka online!',
    bodyTitle: 'Fönsterputs i norra Stockholm',
    bodyIntro:
      'Rutputs erbjuder professionell fönsterputsning i norra Stockholm för privatpersoner och företag. Med RUT-avdrag börjar priset från 350 kr och du kan se ditt pris direkt online.',
    sections: [
      {
        heading: 'Områden vi täcker',
        html: `<p>${areaPages.map((page) => `<a href="/omrade/${page.slug}">${page.name}</a>`).join(', ')}</p>`,
      },
      {
        heading: 'Vanliga frågor',
        html: `<ul>${homeFaqs.map((item) => `<li><strong>${item.question}</strong><br>${item.answer}</li>`).join('')}</ul>`,
      },
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: homeFaqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  },
  {
    route: '/pris',
    title: 'Prislista – Fönsterputsning med RUT-avdrag | Rutputs',
    description:
      'Se priser för fönsterputsning i norra Stockholm. Räkna ut ditt pris direkt från 350 kr med RUT-avdrag och skicka din offertförfrågan online.',
    bodyTitle: 'Prislista för fönsterputsning',
    bodyIntro:
      'På prissidan kan du räkna ut vad fönsterputsningen kostar utifrån din bostad och antal fönster. Priset börjar från 350 kr efter RUT-avdrag.',
    sections: [
      {
        heading: 'Så fungerar prisberäkningen',
        html: '<ol><li>Välj bostadstyp.</li><li>Fyll i antal fönster och tjänster.</li><li>Se ditt pris direkt och skicka in förfrågan.</li></ol>',
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
    ],
  },
  {
    route: '/foretag',
    title: 'Fönsterputs för företag i Stockholm | Rutputs',
    description:
      'Professionell fönsterputs för företag i Stockholm och norra Stockholm. Flexibla avtal, regelbunden service och rena fönster för kontor och lokaler.',
    bodyTitle: 'Fönsterputs för företag',
    bodyIntro:
      'Rutputs hjälper företag, kontor och mindre fastigheter i Stockholm med professionell fönsterputsning. Tjänsten kan anpassas för återkommande intervaller och tydliga serviceupplägg.',
    sections: [
      {
        heading: 'Fördelar för företag',
        html: '<ul><li>Regelbunden service och flexibla avtal.</li><li>Rena fönster som förbättrar intrycket för kunder och personal.</li><li>Smidig kontakt och tydliga offerter.</li></ul>',
      },
    ],
  },
  {
    route: '/integritetspolicy',
    title: 'Integritetspolicy – Rutputs',
    description:
      'Läs om hur Rutputs hanterar dina personuppgifter, cookies och webbanalys i enlighet med GDPR.',
    bodyTitle: 'Integritetspolicy',
    bodyIntro:
      'Här kan du läsa hur Rutputs hanterar personuppgifter, cookies och webbanalys i enlighet med GDPR.',
    sections: [],
  },
  ...areaPages.map((page) => ({
    route: `/omrade/${page.slug}`,
    title: page.title,
    description: page.description,
    bodyTitle: `Fönsterputs i ${page.name}`,
    bodyIntro: page.intro,
    sections: [
      {
        heading: `Områden vi täcker i ${page.name}`,
        html: `<p>${page.districts.join(', ')}</p>`,
      },
      {
        heading: `Vanliga frågor om fönsterputs i ${page.name}`,
        html: `<ul>${page.faq.map((item) => `<li><strong>${item.question}</strong><br>${item.answer}</li>`).join('')}</ul>`,
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
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
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