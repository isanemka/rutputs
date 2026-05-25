/**
 * Receives signed guide payloads from pp-cc and commits them directly to
 * `main` in the rutputs GitHub repo (guides-content.js + OG images).
 *
 * Required env vars:
 *   PPCC_WEBHOOK_SECRET  – must match the secret configured in pp-cc for the
 *                          Rutputs customer (HMAC-SHA256 over `${ts}.${body}`).
 *   GITHUB_TOKEN         – PAT with `contents: write` on the repo.
 *
 * Optional env vars:
 *   GITHUB_REPO          – default "isanemka/rutputs"
 *   GITHUB_BRANCH        – default "main"
 *   SITE_URL             – default "https://rutputs.nu" (used for response permalink)
 */

import { createHmac, timingSafeEqual } from 'node:crypto';
import { marked } from 'marked';

const SECRET = process.env.PPCC_WEBHOOK_SECRET;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'isanemka/rutputs';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const SITE_URL = (process.env.SITE_URL || 'https://rutputs.nu').replace(/\/$/, '');

const MAX_TIMESTAMP_SKEW_SEC = 5 * 60;
const GUIDES_FILE_PATH = 'src/data/guides-content.js';

// Disable Vercel's automatic body parsing so we can compute HMAC over the raw bytes.
export const config = {
  api: { bodyParser: false },
};

// Configure marked: GitHub-flavored, no header IDs (we control them).
marked.setOptions({ gfm: true, breaks: false });

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function verifySignature(rawBody, timestamp, signature) {
  if (!signature || !timestamp) return false;
  const expected = `sha256=${createHmac('sha256', SECRET)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex')}`;
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature));
  return a.length === b.length && timingSafeEqual(a, b);
}

function mdToHtml(md) {
  if (!md) return '';
  return String(marked.parse(md)).trim();
}

function transformGuide(guide, hasOgImage) {
  const sections = (guide.sections || []).map((s) => ({
    heading: String(s.heading || '').trim(),
    html: mdToHtml(s.body),
  }));

  const faq = (guide.faq || []).map((item) => {
    const out = {
      question: String(item.question || '').trim(),
      answer: String(item.answer || '').trim(),
    };
    if (item.linkLabel && item.linkTo) {
      out.linkLabel = String(item.linkLabel);
      out.linkTo = String(item.linkTo);
    }
    return out;
  });

  const relatedAreaSlugs = [];
  const relatedServiceSlugs = [];
  for (const link of guide.relatedLinks || []) {
    const href = String(link?.href || '');
    const area = href.match(/^\/omrade\/([a-z0-9-]+)/i);
    const service = href.match(/^\/tjanst\/([a-z0-9-]+)/i);
    if (area) relatedAreaSlugs.push(area[1].toLowerCase());
    if (service) relatedServiceSlugs.push(service[1].toLowerCase());
  }

  const publishedAt =
    (typeof guide.date === 'string' && guide.date.slice(0, 10)) ||
    new Date().toISOString().slice(0, 10);

  return {
    slug: String(guide.slug),
    title: String(guide.title),
    description: String(guide.description || ''),
    h1: String(guide.h1 || guide.title),
    intro: String(guide.intro || ''),
    publishedAt,
    readingTimeMin: Number.isFinite(guide.readingTimeMin) ? guide.readingTimeMin : 5,
    author: 'Rutputs',
    tags: Array.isArray(guide.tags) ? guide.tags.map(String) : [],
    category: typeof guide.category === 'string' ? guide.category : 'guide',
    sections,
    faq,
    relatedAreaSlugs: Array.from(new Set(relatedAreaSlugs)),
    relatedServiceSlugs: Array.from(new Set(relatedServiceSlugs)),
    ogImage: Boolean(hasOgImage),
  };
}

async function gh(path, init = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GitHub ${init.method || 'GET'} ${path} -> ${res.status}: ${text}`);
  }
  return res.json();
}

async function getCurrentGuidesFile() {
  const data = await gh(
    `/repos/${GITHUB_REPO}/contents/${encodeURIComponent(GUIDES_FILE_PATH).replace(/%2F/g, '/')}?ref=${GITHUB_BRANCH}`
  );
  const text = Buffer.from(data.content, 'base64').toString('utf8');
  return { text, sha: data.sha };
}

function parseGuidesArray(text) {
  // Extract `[ ... ]` between `const guides = ` and `;\n... export default guides;`.
  const match = text.match(/const guides\s*=\s*(\[[\s\S]*\])\s*;\s*export default guides\s*;?\s*$/);
  if (!match) throw new Error('Could not locate guides array in guides-content.js');
  // The file contains only our own serialized data (we own the writer), so it is
  // safe to evaluate. New entries always come in via JSON.stringify below, so the
  // file can never carry executable code from the webhook payload.
  // eslint-disable-next-line no-new-func
  return new Function(`return (${match[1]});`)();
}

function serializeGuidesFile(arr) {
  return `const guides = ${JSON.stringify(arr, null, 2)};\n\nexport default guides;\n`;
}

async function downloadAsset(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download asset ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function commitChanges(files, message) {
  const ref = await gh(`/repos/${GITHUB_REPO}/git/ref/heads/${GITHUB_BRANCH}`);
  const latestCommitSha = ref.object.sha;

  const latestCommit = await gh(`/repos/${GITHUB_REPO}/git/commits/${latestCommitSha}`);
  const baseTreeSha = latestCommit.tree.sha;

  const blobs = await Promise.all(
    files.map((file) =>
      gh(`/repos/${GITHUB_REPO}/git/blobs`, {
        method: 'POST',
        body: JSON.stringify({ content: file.contentBase64, encoding: 'base64' }),
      })
    )
  );

  const tree = await gh(`/repos/${GITHUB_REPO}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: files.map((file, i) => ({
        path: file.path,
        mode: '100644',
        type: 'blob',
        sha: blobs[i].sha,
      })),
    }),
  });

  const commit = await gh(`/repos/${GITHUB_REPO}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [latestCommitSha],
    }),
  });

  await gh(`/repos/${GITHUB_REPO}/git/refs/heads/${GITHUB_BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha }),
  });

  return commit.sha;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!SECRET || !GITHUB_TOKEN) {
    return res
      .status(500)
      .json({ error: 'Server is not configured (missing PPCC_WEBHOOK_SECRET or GITHUB_TOKEN).' });
  }

  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch {
    return res.status(400).json({ error: 'Failed to read request body.' });
  }

  const timestamp = Number(req.headers['x-ppcc-timestamp']);
  const signature = req.headers['x-ppcc-signature'];
  const event = req.headers['x-ppcc-event'];

  if (
    !Number.isFinite(timestamp) ||
    Math.abs(Math.floor(Date.now() / 1000) - timestamp) > MAX_TIMESTAMP_SKEW_SEC
  ) {
    return res.status(401).json({ error: 'Stale or missing timestamp.' });
  }
  if (!verifySignature(rawBody, timestamp, signature)) {
    return res.status(401).json({ error: 'Invalid signature.' });
  }

  if (event === 'ping') {
    return res.status(200).json({ ok: true, message: 'pong' });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const guide = payload?.guide;
  if (!guide?.slug || !guide?.title) {
    return res.status(400).json({ error: 'Invalid guide payload: missing slug or title.' });
  }

  try {
    // Resolve asset target paths and download in parallel.
    const assetSpecs = [];
    for (const asset of payload.assets || []) {
      if (!asset?.url) continue;
      const extMatch = asset.url.match(/\.([a-z0-9]+)(?:\?|#|$)/i);
      const ext = (extMatch?.[1] || 'jpg').toLowerCase();
      if (asset.type === 'og') {
        assetSpecs.push({ url: asset.url, path: `public/og/${guide.slug}-1200x630.${ext}`, type: 'og' });
      } else if (asset.type === 'square') {
        assetSpecs.push({ url: asset.url, path: `public/og/${guide.slug}-1080x1080.${ext}`, type: 'square' });
      }
    }

    const assetBuffers = await Promise.all(assetSpecs.map((s) => downloadAsset(s.url)));
    const assetFiles = assetSpecs.map((spec, i) => ({
      path: spec.path,
      contentBase64: assetBuffers[i].toString('base64'),
    }));
    const hasOg = assetSpecs.some((s) => s.type === 'og');

    // Upsert the guide into the existing array.
    const { text: existingText } = await getCurrentGuidesFile();
    const existing = parseGuidesArray(existingText);
    const newEntry = transformGuide(guide, hasOg);
    const idx = existing.findIndex((g) => g.slug === newEntry.slug);
    if (idx >= 0) {
      existing[idx] = newEntry;
    } else {
      existing.push(newEntry);
    }

    const newText = serializeGuidesFile(existing);
    const guidesFile = {
      path: GUIDES_FILE_PATH,
      contentBase64: Buffer.from(newText, 'utf8').toString('base64'),
    };

    const action = idx >= 0 ? 'update' : 'add';
    const commitMessage = `${action === 'update' ? 'chore(guides): update' : 'feat(guides): add'} ${newEntry.slug} via pp-cc`;

    await commitChanges([guidesFile, ...assetFiles], commitMessage);

    return res.status(200).json({
      ok: true,
      action,
      url: `${SITE_URL}/guide/${newEntry.slug}`,
    });
  } catch (err) {
    console.error('[guide-webhook]', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}
