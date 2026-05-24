#!/usr/bin/env node
/**
 * generate-guide-image.mjs
 *
 * Genererar en innehållsrelevant delningsbild per guide med OpenAI (gpt-image-1),
 * brandar den med logotyp + gradient och sparar två format som statiska filer:
 *   public/og/guide-<slug>.jpg          (1200×630, för OG/länkdelning)
 *   public/og/guide-<slug>-square.jpg   (1080×1080, för Instagram-flöde)
 *
 * Filerna committas och refereras av bygget (ingen OpenAI-nyckel behövs i
 * Vercel-bygget och inga API-anrop per build).
 *
 * Användning:
 *   OPENAI_API_KEY=... npm run guide:image -- <slug>
 *   ... npm run guide:image -- <slug> --regenerate
 *   ... npm run guide:image -- <slug> --prompt "egen bildprompt"
 *
 * VIKTIGT: granska den genererade bilden innan du commitar.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import sharp from 'sharp';
import guides from '../src/data/guides-content.js';

const args = process.argv.slice(2);

function getArg(flag) {
  const i = args.indexOf(flag);
  if (i === -1) return undefined;
  return args[i + 1];
}

const slug = getArg('--slug') || args.find((a) => !a.startsWith('--'));
const regenerate = args.includes('--regenerate');
const promptOverride = getArg('--prompt');

if (!slug) {
  console.error('Ange en slug. Exempel:');
  console.error('  npm run guide:image -- hur-ofta-ska-man-putsa-fonster');
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(
    `Ogiltig slug "${slug}". Endast a–z, 0–9 och bindestreck är tillåtna.`
  );
  process.exit(1);
}

const ogDir = path.resolve('public/og');
const ogPath = path.join(ogDir, `guide-${slug}.jpg`);
const squarePath = path.join(ogDir, `guide-${slug}-square.jpg`);
const logoPath = path.resolve('public/icons/main_logo.png');

if (path.dirname(ogPath) !== ogDir) {
  console.error('Otillåten utdata-sökväg. Avbryter.');
  process.exit(1);
}

// Hämta guiden (för att bygga en relevant bildprompt).
function loadDraftFromFile() {
  const draftPath = path.resolve('src/data/_drafts', `${slug}.ts`);
  if (!existsSync(draftPath)) return undefined;
  try {
    const src = readFileSync(draftPath, 'utf8');
    const start = src.indexOf('const draft =');
    const end = src.indexOf('export default draft');
    if (start === -1 || end === -1) return undefined;
    let block = src.slice(start + 'const draft ='.length, end).trim();
    if (block.endsWith(';')) block = block.slice(0, -1).trim();
    return JSON.parse(block);
  } catch {
    return undefined;
  }
}

const guide =
  guides.find((g) => g.slug === slug) || loadDraftFromFile();

if (!guide) {
  console.error(
    `Hittar ingen guide med slug "${slug}" i guides-content.js eller _drafts/.`
  );
  process.exit(1);
}

if (!regenerate && existsSync(ogPath) && existsSync(squarePath)) {
  console.error(
    `Bilderna finns redan för "${slug}". Använd --regenerate för att skriva över.`
  );
  process.exit(1);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error(
    'OPENAI_API_KEY saknas i miljön. Sätt nyckeln och kör igen, t.ex.:'
  );
  console.error('  OPENAI_API_KEY=sk-... npm run guide:image -- ' + slug);
  process.exit(1);
}

function buildPrompt() {
  if (promptOverride) return promptOverride;
  const tags = Array.isArray(guide.tags) ? guide.tags.join(', ') : '';
  return [
    `Fotorealistiskt, ljust och professionellt foto kopplat till ämnet: "${guide.h1 || guide.title}".`,
    'Sammanhang: fönsterputsning och rena fönster i ett hem i Stockholm.',
    tags ? `Nyckelord: ${tags}.` : '',
    'Naturligt dagsljus, ren och modern skandinavisk miljö, inbjudande och äkta.',
    'Ingen text, inga logotyper, inga vattenstämplar, inga ramar.',
  ]
    .filter(Boolean)
    .join(' ');
}

async function generateBaseImage() {
  const prompt = buildPrompt();
  console.log('› Genererar bild via OpenAI (gpt-image-1)…');
  console.log(`  Prompt: ${prompt}`);

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      size: '1536x1024',
      quality: process.env.OPENAI_IMAGE_QUALITY || 'medium',
      n: 1,
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI fel ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error('OpenAI returnerade ingen bilddata.');
  return Buffer.from(b64, 'base64');
}

// Genomskinlig→mörk gradient i nederkant för läsbarhet och brand-känsla.
function gradientSvg(width, height) {
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stop-color="rgb(17,24,28)" stop-opacity="0"/>
          <stop offset="100%" stop-color="rgb(17,24,28)" stop-opacity="0.85"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#g)"/>
    </svg>`
  );
}

async function composeVariant(baseBuffer, width, height, outPath) {
  const padding = Math.round(width * 0.04);
  const logoWidth = Math.round(width * 0.26);

  const logo = await sharp(logoPath)
    .resize({ width: logoWidth })
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();

  const composed = await sharp(baseBuffer)
    .resize(width, height, { fit: 'cover', position: 'attention' })
    .composite([
      { input: gradientSvg(width, height), top: 0, left: 0 },
      {
        input: logo,
        left: padding,
        top: height - (logoMeta.height || 0) - padding,
      },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  await writeFile(outPath, composed);
  console.log(`✓ Skrev ${path.relative(process.cwd(), outPath)} (${width}×${height})`);
}

async function main() {
  await mkdir(ogDir, { recursive: true });
  const base = await generateBaseImage();
  await composeVariant(base, 1200, 630, ogPath);
  await composeVariant(base, 1080, 1080, squarePath);
  console.log('› Granska bilderna innan du commitar dem.');
}

main().catch((err) => {
  console.error('Bildgenerering misslyckades:', err.message);
  process.exitCode = 1;
});
