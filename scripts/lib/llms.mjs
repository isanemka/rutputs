import siteSeoContent from '../../src/data/seo-content.js';
import business from '../../src/data/business.js';
import { guidesByDate, SITE_URL as baseUrl } from '../../src/data/site-pages.js';

const { home, areas, services = [] } = siteSeoContent;

/** llms.txt: a plain-text summary of the business and its pages for AI crawlers. */
export function buildLlmsTxt() {
  const sortedGuides = guidesByDate();
  const homeFaq = (home.faq || []).slice(0, 6);

  return `# Rutputs – Fönsterputsning i Stockholm

> ${business.description}

## Om Rutputs
Rutputs erbjuder professionell fönsterputsning för privatpersoner och företag i Stockholm. Med RUT-avdrag (50% skattereduktion) börjar priset från 499 kr. När du bokar hos Rutputs får du erfarna fönsterputsare som arbetar i ditt område.

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
