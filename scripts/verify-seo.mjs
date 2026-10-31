// Checks the built (not browser-rendered) HTML in dist/static for every URL in
// the generated sitemap.xml and prints a table. Runs at the end of
// `npm run build`, so a deploy fails instead of shipping duplicate pages.
//
// Errors (exit 1): missing file, duplicate title or description, canonical or
// og:url not equal to the page's own URL, not exactly one <h1>, noindex on a
// sitemap URL, <html lang> other than "sv", or a 404.html that is missing or
// indexable.
// Warnings: title > 60 or description > 155 characters, thin content.

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.argv[2] || 'dist/static');
const SITE_URL = 'https://www.rutputs.nu';
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

// Minimum words of main content (inside <main>) per page type.
const WORD_TARGETS = [
  { test: (p) => p === '/pris', min: 900 },
  { test: (p) => p.startsWith('/omrade/'), min: 600 },
  { test: () => true, min: 250 },
];

const decodeEntities = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&');

// Attribute values may be unquoted in minified markup.
const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match ? decodeEntities(match[1] ?? match[2] ?? match[3]) : null;
};

const findTags = (html, tagName, predicate) =>
  (html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || []).filter(predicate);

function textOf(html) {
  return decodeEntities(
    html
      .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

const countWords = (text) => (text ? text.split(' ').filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0);

function analyse(html) {
  const head = html.slice(0, html.search(/<\/head>/i));
  const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = findTags(head, 'meta', (t) => attr(t, 'name') === 'description').map((t) => attr(t, 'content'));
  const canonical = findTags(head, 'link', (t) => attr(t, 'rel') === 'canonical').map((t) => attr(t, 'href'));
  const ogUrl = findTags(head, 'meta', (t) => attr(t, 'property') === 'og:url').map((t) => attr(t, 'content'));
  const robots = findTags(head, 'meta', (t) => attr(t, 'name') === 'robots').map((t) => attr(t, 'content'));
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const htmlTag = (html.match(/<html\b[^>]*>/i) || [''])[0];
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);

  return {
    lang: attr(htmlTag, 'lang'),
    titles: (head.match(/<title\b/gi) || []).length,
    title: titleMatch ? decodeEntities(titleMatch[1]).trim() : '',
    description,
    canonical,
    ogUrl,
    robots: robots.join(', '),
    h1Count,
    words: countWords(textOf(mainMatch ? mainMatch[1] : html)),
  };
}

const fileFor = (urlPath) =>
  urlPath === '/' ? path.join(distDir, 'index.html') : path.join(distDir, urlPath.slice(1), 'index.html');

const pad = (value, width) => {
  const text = String(value);
  return text.length > width ? `${text.slice(0, width - 1)}…` : text.padEnd(width);
};

async function main() {
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  if (!existsSync(sitemapPath)) {
    console.error(`verify-seo: ${sitemapPath} not found. Run the build first.`);
    process.exit(1);
  }
  const sitemap = await readFile(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  const errors = [];
  const warnings = [];
  const rows = [];

  for (const url of urls) {
    const urlPath = url === `${SITE_URL}/` ? '/' : url.replace(SITE_URL, '');
    const file = fileFor(urlPath);
    if (!existsSync(file)) {
      errors.push(`${urlPath}: no HTML file at ${path.relative(process.cwd(), file)}`);
      continue;
    }
    const page = analyse(await readFile(file, 'utf8'));
    rows.push({ urlPath, url, ...page });

    if (page.titles !== 1 || !page.title) errors.push(`${urlPath}: expected exactly one non-empty <title>`);
    if (page.description.length !== 1 || !page.description[0]) {
      errors.push(`${urlPath}: expected exactly one meta description, found ${page.description.length}`);
    }
    if (page.canonical.length !== 1 || page.canonical[0] !== url) {
      errors.push(`${urlPath}: canonical ${JSON.stringify(page.canonical)} should be exactly ["${url}"]`);
    }
    if (page.ogUrl.length !== 1 || page.ogUrl[0] !== url) {
      errors.push(`${urlPath}: og:url ${JSON.stringify(page.ogUrl)} should be "${url}"`);
    }
    if (page.h1Count !== 1) errors.push(`${urlPath}: ${page.h1Count} <h1> elements (expected 1)`);
    if (/noindex/i.test(page.robots)) errors.push(`${urlPath}: in sitemap but robots is "${page.robots}"`);
    if (page.lang !== 'sv') errors.push(`${urlPath}: <html lang="${page.lang}"> should be "sv"`);

    if (page.title.length > TITLE_MAX) warnings.push(`${urlPath}: title is ${page.title.length} characters (max ${TITLE_MAX})`);
    const descriptionLength = (page.description[0] || '').length;
    if (descriptionLength > DESCRIPTION_MAX) {
      warnings.push(`${urlPath}: description is ${descriptionLength} characters (max ${DESCRIPTION_MAX})`);
    }
    const target = WORD_TARGETS.find((t) => t.test(urlPath)).min;
    if (page.words < target) warnings.push(`${urlPath}: ${page.words} words of main content (target ${target})`);
  }

  for (const key of ['title', 'description']) {
    const seen = new Map();
    for (const row of rows) {
      const value = key === 'title' ? row.title : row.description[0];
      if (!value) continue;
      seen.set(value, [...(seen.get(value) || []), row.urlPath]);
    }
    for (const [value, paths] of seen) {
      if (paths.length > 1) errors.push(`duplicate ${key} on ${paths.join(', ')}: "${value}"`);
    }
  }

  const notFoundFile = path.join(distDir, '404.html');
  if (!existsSync(notFoundFile)) {
    errors.push('404.html is missing');
  } else {
    const notFound = analyse(await readFile(notFoundFile, 'utf8'));
    if (!/noindex/i.test(notFound.robots)) errors.push('404.html must be noindex');
    if (notFound.canonical.length) errors.push('404.html must not have a canonical link');
  }

  console.log(
    `${pad('Path', 44)} ${pad('Title', 62)} ${'T'.padStart(3)} ${'D'.padStart(4)} ${'H1'.padStart(2)} ${'Words'.padStart(5)}  Canonical`,
  );
  console.log('-'.repeat(136));
  for (const row of rows) {
    const canonicalOk = row.canonical.length === 1 && row.canonical[0] === row.url ? 'ok' : 'FEL';
    console.log(
      `${pad(row.urlPath, 44)} ${pad(row.title, 62)} ${String(row.title.length).padStart(3)} ${String(
        (row.description[0] || '').length,
      ).padStart(4)} ${String(row.h1Count).padStart(2)} ${String(row.words).padStart(5)}  ${canonicalOk}`,
    );
  }
  console.log(`\n${rows.length} URLs from sitemap.xml checked. T = title length, D = description length.`);

  if (warnings.length) {
    console.log(`\nWarnings (${warnings.length}):`);
    warnings.forEach((w) => console.log(`  - ${w}`));
  }
  if (errors.length) {
    console.error(`\nErrors (${errors.length}):`);
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }
  console.log('\nSEO check passed: unique titles and descriptions, self-canonicals, one H1 per page.');
}

main().catch((error) => {
  console.error('verify-seo failed:', error);
  process.exit(1);
});
