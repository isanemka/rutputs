#!/usr/bin/env node
/**
 * generate-guide-draft.mjs
 *
 * CLI som genererar ett utkast till en ny guide-post och skriver det till
 * src/data/_drafts/<slug>.ts. Utkastet är ALLTID tänkt att granskas och
 * redigeras manuellt innan det flyttas in i src/data/guides-content.js.
 *
 * Användning:
 *   node scripts/generate-guide-draft.mjs "Hur tvättar man inglasade balkonger?"
 *   node scripts/generate-guide-draft.mjs --topic "RUT för altan" --slug rut-for-altan
 *
 * LLM-stöd (valfritt):
 *   Sätt OPENAI_API_KEY i miljön så används OpenAI för att fylla i sektioner.
 *   Utan nyckel skapas ett tomt skelett som du fyller i för hand.
 *
 * VIKTIGT — kvalitet & SEO:
 *   - Granska ALLTID språk, fakta (särskilt RUT-belopp och årtal) och tonalitet.
 *   - Se till att guiden tillför något unikt utöver det som redan finns
 *     på Skatteverket / konkurrenter — annars riskerar Google att tolka
 *     innehållet som "thin content".
 *   - Behåll ca 1 ny guide per 1–2 veckor för långsiktig tillväxt.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

const args = process.argv.slice(2);

function getArg(flag) {
  const i = args.indexOf(flag);
  if (i === -1) return undefined;
  return args[i + 1];
}

const topic = getArg('--topic') || args.find((a) => !a.startsWith('--'));
if (!topic) {
  console.error('Ange ett ämne. Exempel:');
  console.error('  node scripts/generate-guide-draft.mjs "Hur tvättar man inglasade balkonger?"');
  process.exit(1);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const slug = getArg('--slug') || slugify(topic);
const today = new Date().toISOString().slice(0, 10);

const draftDir = path.resolve('src/data/_drafts');
const draftPath = path.join(draftDir, `${slug}.ts`);

const llmPrompt = `Du skriver en SEO-guide för Rutputs, en lokal fönsterputsfirma i Stockholm.

Ämne: "${topic}"

Krav:
- Skriv på svenska, vänlig och saklig ton, du-tilltal.
- Inkludera lokala referenser till Stockholmsområden där relevant (Bromma, Spånga, Järfälla, Lidingö, Nacka, Östermalm, Sollentuna, Täby, Kista).
- Använd RUT-avdrag 2026 (50 % på arbetskostnaden, tak 75 000 kr/person/år).
- Strukturera som 5–7 sektioner med rubriker och 1–3 stycken HTML per sektion (<p>, <ul>, <ol>, <li>, <strong>, <em>, <a href>).
- Avsluta med 4–6 FAQ-poster.
- Längd: 800–1200 ord totalt.
- Föreslå 2–4 interna länkar till /tjanst/villa-fonsterputs, /tjanst/lagenhet-fonsterputs, /tjanst/abonnemang-fonsterputs, /pris, /foretag, eller områdessidor /omrade/{slug}.

Returnera ENDAST giltig JSON enligt detta schema:
{
  "title": "...",
  "description": "...",
  "h1": "...",
  "intro": "...",
  "readingTimeMin": <number>,
  "tags": ["..."],
  "sections": [{ "heading": "...", "html": "..." }],
  "faq": [{ "question": "...", "answer": "...", "linkLabel"?: "...", "linkTo"?: "..." }],
  "relatedAreaSlugs": ["..."],
  "relatedServiceSlugs": ["..."]
}`;

async function callOpenAi(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  console.log('› Anropar OpenAI…');
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'Du är en svensk SEO-copywriter specialiserad på lokala tjänsteföretag.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      console.error(`OpenAI fel ${res.status}:`, await res.text());
      return null;
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content);
  } catch (err) {
    console.error('OpenAI-anrop misslyckades:', err.message);
    return null;
  }
}

const skeleton = {
  title: `${topic} | Rutputs`,
  description: `TODO: 150–160 tecken beskrivning för "${topic}".`,
  h1: topic,
  intro: 'TODO: 1–2 meningar som sammanfattar guiden.',
  readingTimeMin: 5,
  tags: ['TODO'],
  sections: [
    { heading: 'TODO: rubrik 1', html: '<p>TODO</p>' },
    { heading: 'TODO: rubrik 2', html: '<p>TODO</p>' },
  ],
  faq: [
    { question: 'TODO?', answer: 'TODO.' },
  ],
  relatedAreaSlugs: [],
  relatedServiceSlugs: [],
};

const generated = (await callOpenAi(llmPrompt)) || skeleton;

const guideObject = {
  slug,
  title: generated.title,
  description: generated.description,
  h1: generated.h1,
  intro: generated.intro,
  publishedAt: today,
  readingTimeMin: generated.readingTimeMin || 5,
  author: 'Rutputs',
  tags: generated.tags || [],
  category: 'guide',
  sections: generated.sections || [],
  faq: generated.faq || [],
  relatedAreaSlugs: generated.relatedAreaSlugs || [],
  relatedServiceSlugs: generated.relatedServiceSlugs || [],
};

const fileContent = `/**
 * UTKAST — generat ${today} via scripts/generate-guide-draft.mjs
 *
 * GRANSKA NOGA innan du flyttar in objektet i src/data/guides-content.js:
 *  - Fakta (RUT-belopp, årtal, lokala referenser)
 *  - Språk och ton
 *  - Att innehållet tillför något nytt (annars: skriv om eller skippa)
 *  - Interna länkar pekar på sidor som faktiskt finns
 *
 * När det är klart: klistra in objektet i guides-arrayen i
 * src/data/guides-content.js och radera denna fil.
 */

const draft = ${JSON.stringify(guideObject, null, 2)};

export default draft;
`;

await mkdir(draftDir, { recursive: true });

if (existsSync(draftPath)) {
  console.error(`Filen finns redan: ${draftPath}`);
  console.error('Ange --slug <annan-slug> eller radera den befintliga filen.');
  process.exit(1);
}

await writeFile(draftPath, fileContent, 'utf8');

console.log(`✓ Utkast skapat: ${draftPath}`);
console.log('› Granska, redigera och flytta sedan objektet in i src/data/guides-content.js.');
if (!process.env.OPENAI_API_KEY) {
  console.log('› Tips: sätt OPENAI_API_KEY för att låta LLM fylla i sektionerna automatiskt.');
}
