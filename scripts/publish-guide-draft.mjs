#!/usr/bin/env node
/**
 * publish-guide-draft.mjs
 *
 * Flyttar ett GRANSKAT guide-utkast från src/data/_drafts/<slug>.ts in i den
 * publika src/data/guides-content.js och raderar sedan utkastfilen.
 *
 * Användning:
 *   node scripts/publish-guide-draft.mjs <slug>
 *   node scripts/publish-guide-draft.mjs --slug rut-for-altan
 *   (eller via npm: npm run guide:publish -- <slug>)
 *
 * VIKTIGT:
 *   - Granska ALLTID utkastet (fakta, RUT-belopp, ton, interna länkar) innan du
 *     publicerar. Detta script gör ingen kvalitetskontroll.
 *   - Scriptet kör Prettier på enbart src/data/guides-content.js automatiskt.
 *     Kör därefter `npm run build` för att prerendra /guide/<slug>.
 */

import { readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);

function getArg(flag) {
  const i = args.indexOf(flag);
  if (i === -1) return undefined;
  return args[i + 1];
}

const slug = getArg('--slug') || args.find((a) => !a.startsWith('--'));
if (!slug) {
  console.error('Ange en slug. Exempel:');
  console.error('  npm run guide:publish -- rut-for-altan');
  process.exit(1);
}

// Säker slug: små bokstäver, siffror och bindestreck. Skyddar mot path
// traversal (t.ex. "../") eftersom slug används för att bygga en filväg.
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(
    `Ogiltig slug "${slug}". Endast a–z, 0–9 och bindestreck är tillåtna.`
  );
  process.exit(1);
}

const draftDir = path.resolve('src/data/_drafts');
const draftPath = path.join(draftDir, `${slug}.ts`);
const contentPath = path.resolve('src/data/guides-content.js');

// Extra försvar: säkerställ att den uppbyggda vägen verkligen ligger i draftDir.
if (path.dirname(draftPath) !== draftDir) {
  console.error('Otillåten utkast-sökväg. Avbryter.');
  process.exit(1);
}

if (!existsSync(draftPath)) {
  console.error(`Hittar inget utkast: ${draftPath}`);
  console.error('Kör först: npm run guide:new -- "Ditt ämne"');
  process.exit(1);
}

// Utkasten skrivs av generate-guide-draft.mjs som `const draft = <JSON>;`.
// Vi extraherar JSON-blocket som text och parsar det – robustare än att
// försöka importera en .ts-fil i Node.
function extractDraftObject(source) {
  const start = source.indexOf('const draft =');
  const end = source.indexOf('export default draft');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(
      'Kunde inte hitta `const draft = ... ; export default draft;` i utkastet.'
    );
  }
  let block = source.slice(start + 'const draft ='.length, end).trim();
  // Ta bort avslutande semikolon.
  if (block.endsWith(';')) {
    block = block.slice(0, -1).trim();
  }
  try {
    return JSON.parse(block);
  } catch (err) {
    throw new Error(
      `Utkastet är inte giltig JSON längre (har det handredigerats med ` +
        `backticks eller släpkommatecken?): ${err.message}`
    );
  }
}

// Måste spegla non-optional fält i Guide-interfacet (src/data/guides.ts).
const REQUIRED_STRING_FIELDS = [
  'slug',
  'title',
  'description',
  'h1',
  'intro',
  'publishedAt',
  'author',
];
const REQUIRED_ARRAY_FIELDS = ['tags', 'sections', 'faq'];

// Letar rekursivt efter "TODO" i alla strängvärden i objektet.
function hasTodo(value) {
  if (typeof value === 'string') return value.includes('TODO');
  if (Array.isArray(value)) return value.some(hasTodo);
  if (value && typeof value === 'object') return Object.values(value).some(hasTodo);
  return false;
}

function validate(guide) {
  const missing = [];

  for (const f of REQUIRED_STRING_FIELDS) {
    if (typeof guide[f] !== 'string' || guide[f].trim() === '') missing.push(f);
  }
  for (const f of REQUIRED_ARRAY_FIELDS) {
    if (!Array.isArray(guide[f]) || guide[f].length === 0) missing.push(f);
  }
  if (typeof guide.readingTimeMin !== 'number' || guide.readingTimeMin <= 0) {
    missing.push('readingTimeMin');
  }
  if (missing.length) {
    throw new Error(
      `Utkastet saknar/har ogiltiga obligatoriska fält: ${missing.join(', ')}`
    );
  }

  // Grundläggande formkontroll av sektioner och FAQ.
  const badSection = guide.sections.find(
    (s) => !s || typeof s.heading !== 'string' || typeof s.html !== 'string'
  );
  if (badSection) {
    throw new Error('Varje section måste ha strängarna `heading` och `html`.');
  }
  const badFaq = guide.faq.find(
    (q) => !q || typeof q.question !== 'string' || typeof q.answer !== 'string'
  );
  if (badFaq) {
    throw new Error('Varje FAQ-post måste ha strängarna `question` och `answer`.');
  }

  if (hasTodo(guide)) {
    throw new Error(
      'Utkastet innehåller fortfarande TODO-platshållare. Fyll i och granska först.'
    );
  }
}

async function main() {
  const draftSource = await readFile(draftPath, 'utf8');
  const guide = extractDraftObject(draftSource);

  // Avbryt vid mismatch i stället för att tyst skriva över – annars kan
  // innehåll publiceras under fel URL utan att man märker det.
  if (guide.slug !== slug) {
    console.error(
      `Slug-mismatch: utkastets slug är "${guide.slug}" men du angav "${slug}".`
    );
    console.error(
      'Rätta slug i utkastet eller döp om filen så de matchar, och kör igen.'
    );
    process.exit(1);
  }

  validate(guide);

  const content = await readFile(contentPath, 'utf8');

  if (
    content.includes(`slug: '${slug}'`) ||
    content.includes(`slug: "${slug}"`) ||
    content.includes(`"slug": "${slug}"`)
  ) {
    console.error(
      `En guide med slug "${slug}" finns redan i guides-content.js. Avbryter.`
    );
    process.exit(1);
  }

  // Hitta arrayens avslutande "];" (sista förekomsten före export default).
  const exportIdx = content.lastIndexOf('export default guides');
  const closeIdx = content.lastIndexOf('];', exportIdx);
  if (closeIdx === -1) {
    console.error(
      'Kunde inte hitta guide-arrayens avslut (`];`) i guides-content.js.'
    );
    process.exit(1);
  }

  // Serialisera objektet och indentera ett steg (2 mellanslag) så det sitter
  // korrekt inuti arrayen. prettier normaliserar citattecken efteråt.
  const serialized = JSON.stringify(guide, null, 2)
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n');

  const before = content.slice(0, closeIdx).replace(/\s*$/, '\n');
  const after = content.slice(closeIdx);
  const updated = `${before}${serialized},\n${after}`;

  await writeFile(contentPath, updated, 'utf8');
  await rm(draftPath);

  // Normalisera bara den berörda filen (citattecken/indrag) så vi slipper
  // global formatering av hela repot.
  const fmt = spawnSync(
    'npx',
    ['prettier', '--write', 'src/data/guides-content.js'],
    { stdio: 'inherit', shell: process.platform === 'win32' }
  );

  console.log(`✓ Publicerade guiden "${slug}" till src/data/guides-content.js`);
  console.log(`✓ Raderade utkastet ${path.relative(process.cwd(), draftPath)}`);
  if (fmt.status !== 0) {
    console.log('⚠ Kunde inte köra prettier automatiskt – kör `npm run format` manuellt.');
  }
  console.log('› Kör nu: npm run build och granska /guide/' + slug);
}

main().catch((err) => {
  console.error('Publicering misslyckades:', err.message);
  process.exitCode = 1;
});
