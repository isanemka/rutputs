#!/usr/bin/env node
/**
 * guide-admin.mjs — Lokalt admin-gränssnitt för guide-workflow.
 *
 * Starta med:  npm run guide:admin
 * Öppnas på:  http://localhost:3737
 *
 * Flöde:
 *   1. Skriv ämne → klicka "Generera utkast" (kör guide:new)
 *   2. Klicka "Redigera" på utkastet → redigera alla fält i panelen
 *   3. "Spara" för att spara ändringar till _drafts/<slug>.ts
 *   4. "Publicera" för att köra guide:publish automatiskt
 *   5. Grön prick = OG-bild finns, klicka "Bild" för att generera
 */

import http from 'node:http';
import { readdir, readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { spawn, exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const PORT = 3737;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRAFTS_DIR = path.resolve(ROOT, 'src/data/_drafts');
const CONTENT_PATH = path.resolve(ROOT, 'src/data/guides-content.js');
const OG_DIR = path.resolve(ROOT, 'public/og');

// Load .env into process.env (so spawned child scripts inherit API keys)
try {
  const envLines = readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n');
  for (const line of envLines) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
} catch { /* no .env file, skip */ }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDraftSrc(source) {
  const start = source.indexOf('const draft =');
  const end = source.indexOf('export default draft');
  if (start === -1 || end === -1) return null;
  let block = source.slice(start + 'const draft ='.length, end).trim();
  if (block.endsWith(';')) block = block.slice(0, -1).trim();
  try { return JSON.parse(block); } catch { return null; }
}

function serializeDraft(guide) {
  const today = new Date().toISOString().slice(0, 10);
  return `/**\n * UTKAST — redigerat ${today} via guide-admin\n */\n\nconst draft = ${JSON.stringify(guide, null, 2)};\n\nexport default draft;\n`;
}

async function listDrafts() {
  if (!existsSync(DRAFTS_DIR)) return [];
  const files = (await readdir(DRAFTS_DIR)).filter(f => f.endsWith('.ts'));
  const result = [];
  for (const f of files) {
    try {
      const src = await readFile(path.join(DRAFTS_DIR, f), 'utf8');
      const g = parseDraftSrc(src);
      if (g) result.push({
        slug: f.replace('.ts', ''),
        h1: g.h1 || g.title || f.replace('.ts', ''),
        hasTodo: JSON.stringify(g).includes('TODO'),
      });
    } catch {}
  }
  return result;
}

async function listGuides() {
  try {
    const src = await readFile(CONTENT_PATH, 'utf8');
    const code = src.replace(/export\s+default\s+\w+;?/g, '') + '\nguides';
    const ctx = {};
    vm.createContext(ctx);
    const all = vm.runInContext(code, ctx);
    if (!Array.isArray(all)) return [];
    return all.map(g => ({
      slug: g.slug,
      title: g.title || g.slug,
      publishedAt: g.publishedAt || '',
      hasOgImage: existsSync(path.join(OG_DIR, `guide-${g.slug}.jpg`)),
    }));
  } catch { return []; }
}

function runScript(scriptArgs, extraEnv = {}) {
  return new Promise(resolve => {
    const proc = spawn('node', scriptArgs, { cwd: ROOT, env: { ...process.env, ...extraEnv } });
    let out = '', err = '';
    proc.stdout.on('data', d => { out += d; process.stdout.write(d); });
    proc.stderr.on('data', d => { err += d; process.stderr.write(d); });
    proc.on('close', code => resolve({ code, stdout: out, stderr: err }));
  });
}

function readBody(req) {
  return new Promise(resolve => { let b = ''; req.on('data', c => b += c); req.on('end', () => resolve(b)); });
}

function jsonOk(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function jsonErr(res, msg, status = 400) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: msg }));
}

async function readGuideFromContent(slug) {
  const src = await readFile(CONTENT_PATH, 'utf8');
  const code = src.replace(/export\s+default\s+\w+;?/g, '') + '\nguides';
  const ctx = {};
  vm.createContext(ctx);
  const all = vm.runInContext(code, ctx);
  return Array.isArray(all) ? (all.find(g => g.slug === slug) || null) : null;
}

async function updateGuideInContent(slug, newGuide) {
  const src = await readFile(CONTENT_PATH, 'utf8');
  const code = src.replace(/export\s+default\s+\w+;?/g, '') + '\nguides';
  const ctx = {};
  vm.createContext(ctx);
  const all = vm.runInContext(code, ctx);
  if (!Array.isArray(all)) return false;
  const guides = [...all];
  const idx = guides.findIndex(g => g.slug === slug);
  if (idx === -1) return false;
  guides[idx] = newGuide;
  await writeFile(CONTENT_PATH, `const guides = ${JSON.stringify(guides, null, 2)};\n\nexport default guides;\n`, 'utf8');
  return true;
}

// ─── Router ───────────────────────────────────────────────────────────────────

async function router(req, res) {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const p = url.pathname;
  const method = req.method;

  if (method === 'GET' && p === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML);
    return;
  }

  if (method === 'GET' && p === '/api/drafts') return jsonOk(res, await listDrafts());
  if (method === 'GET' && p === '/api/guides') return jsonOk(res, await listGuides());
  if (method === 'GET' && p === '/api/ref-images') {
    const imgDir = path.join(ROOT, 'public/img');
    try {
      const files = (await readdir(imgDir)).filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f)).sort();
      return jsonOk(res, files);
    } catch { return jsonOk(res, []); }
  }

  if (method === 'GET' && p.startsWith('/img/')) {
    const filename = path.basename(p);
    if (!/^[a-zA-Z0-9._-]+$/.test(filename)) { res.writeHead(400); res.end(); return; }
    const fp = path.join(ROOT, 'public/img', filename);
    if (!existsSync(fp)) { res.writeHead(404); res.end(); return; }
    const ext = path.extname(filename).toLowerCase();
    const mimeMap = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
    res.end(await readFile(fp));
    return;
  }

  const guideSlug = p.match(/^\/api\/guides\/([a-z0-9-]+)$/)?.[1];

  if (method === 'GET' && guideSlug) {
    const g = await readGuideFromContent(guideSlug);
    return g ? jsonOk(res, g) : jsonErr(res, 'Hittades inte', 404);
  }

  if (method === 'PUT' && guideSlug) {
    if (!/^[a-z0-9-]+$/.test(guideSlug)) return jsonErr(res, 'Ogiltig slug');
    let guide;
    try { guide = JSON.parse(await readBody(req)); } catch { return jsonErr(res, 'Ogiltig JSON'); }
    const ok = await updateGuideInContent(guideSlug, guide);
    return ok ? jsonOk(res, { saved: true }) : jsonErr(res, 'Guide hittades inte', 404);
  }

  const draftSlug = p.match(/^\/api\/drafts\/([a-z0-9-]+)$/)?.[1];

  if (method === 'GET' && draftSlug) {
    const fp = path.join(DRAFTS_DIR, `${draftSlug}.ts`);
    if (!existsSync(fp)) return jsonErr(res, 'Hittades inte', 404);
    const g = parseDraftSrc(await readFile(fp, 'utf8'));
    return g ? jsonOk(res, g) : jsonErr(res, 'Parsningsfel', 500);
  }

  if (method === 'PUT' && draftSlug) {
    if (!/^[a-z0-9-]+$/.test(draftSlug)) return jsonErr(res, 'Ogiltig slug');
    const fp = path.join(DRAFTS_DIR, `${draftSlug}.ts`);
    if (path.dirname(fp) !== DRAFTS_DIR) return jsonErr(res, 'Otillåten sökväg');
    let guide;
    try { guide = JSON.parse(await readBody(req)); } catch { return jsonErr(res, 'Ogiltig JSON'); }
    await mkdir(DRAFTS_DIR, { recursive: true });
    await writeFile(fp, serializeDraft(guide), 'utf8');
    return jsonOk(res, { saved: true });
  }

  if (method === 'DELETE' && draftSlug) {
    if (!/^[a-z0-9-]+$/.test(draftSlug)) return jsonErr(res, 'Ogiltig slug');
    const fp = path.join(DRAFTS_DIR, `${draftSlug}.ts`);
    if (path.dirname(fp) !== DRAFTS_DIR) return jsonErr(res, 'Otillåten sökväg');
    try { await unlink(fp); } catch { return jsonErr(res, 'Hittades inte', 404); }
    return jsonOk(res, { deleted: true });
  }

  if (method === 'POST' && p === '/api/drafts/new') {
    let data;
    try { data = JSON.parse(await readBody(req)); } catch { return jsonErr(res, 'Ogiltig JSON'); }
    if (!data.topic) return jsonErr(res, 'topic krävs');
    const args = ['scripts/generate-guide-draft.mjs', data.topic];
    if (data.slug) args.push('--slug', data.slug);
    return jsonOk(res, await runScript(args));
  }

  const publishSlug = p.match(/^\/api\/drafts\/([a-z0-9-]+)\/publish$/)?.[1];
  if (method === 'POST' && publishSlug)
    return jsonOk(res, await runScript(['scripts/publish-guide-draft.mjs', publishSlug]));

  const imageMatch = p.match(/^\/api\/(?:drafts|guides)\/([a-z0-9-]+)\/image$/);
  if (method === 'POST' && imageMatch) {
    const slug = imageMatch[1];
    let body;
    try { body = JSON.parse(await readBody(req) || '{}'); } catch { body = {}; }
    const args = ['scripts/generate-guide-image.mjs', slug];
    if (body.promptOverride) args.push('--prompt', body.promptOverride);
    if (body.referenceImage) args.push('--reference', body.referenceImage);
    if (existsSync(path.join(OG_DIR, `guide-${slug}.jpg`))) args.push('--regenerate');
    return jsonOk(res, await runScript(args));
  }

  res.writeHead(404); res.end('Not found');
}

http
  .createServer((req, res) =>
    router(req, res).catch(e => {
      console.error(e);
      if (!res.headersSent) { res.writeHead(500); res.end(); }
    })
  )
  .listen(PORT, '127.0.0.1', () => {
    console.log(`\n✓ Guide Admin → http://localhost:${PORT}\n`);
    const openCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    exec(`${openCmd} "http://localhost:${PORT}"`, () => {});
  });

// ─── HTML (inlined) ───────────────────────────────────────────────────────────

const HTML = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Guide Admin</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f4f4f5;color:#18181b;min-height:100vh}
header{background:#18181b;color:#fff;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10}
header h1{font-size:1rem;font-weight:600;letter-spacing:.3px}
.main{max-width:1100px;margin:0 auto;padding:20px}

/* New guide form */
.new-form{background:#fff;border-radius:10px;padding:16px 20px;margin-bottom:20px;display:flex;gap:10px;align-items:flex-end;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.new-form .field{flex:1;display:flex;flex-direction:column;gap:5px}
.new-form label{font-size:.75rem;font-weight:600;color:#71717a;text-transform:uppercase;letter-spacing:.5px}
.new-form input{padding:8px 12px;border:1px solid #e4e4e7;border-radius:7px;font-size:.9rem}
.new-form input:focus{outline:none;border-color:#6366f1}

/* Columns */
.columns{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:680px){.columns{grid-template-columns:1fr}}
.panel{background:#fff;border-radius:10px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.panel-title{font-size:.72rem;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between}
.panel-title span{background:#f4f4f5;color:#71717a;border-radius:20px;padding:2px 8px;font-size:.7rem}

/* Draft card */
.card{border:1px solid #f0f0f0;border-radius:8px;padding:14px;margin-bottom:10px}
.card:last-child{margin-bottom:0}
.card-h1{font-weight:600;font-size:.9rem;margin-bottom:3px;line-height:1.35}
.card-slug{font-size:.75rem;color:#a1a1aa;font-family:monospace;margin-bottom:10px}
.badge{display:inline-flex;align-items:center;gap:4px;border-radius:4px;padding:2px 8px;font-size:.72rem;font-weight:500;margin-bottom:8px}
.badge-warn{background:#fef9c3;color:#854d0e}
.card-actions{display:flex;gap:7px;flex-wrap:wrap}

/* Guide list */
.guide-row{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f4f4f5}
.guide-row:last-child{border-bottom:none}
.dot{width:8px;height:8px;border-radius:50%;background:#d4d4d8;flex-shrink:0}
.dot.green{background:#22c55e}
.guide-info{flex:1;min-width:0}
.guide-title{font-size:.85rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.guide-meta{font-size:.72rem;color:#a1a1aa;margin-top:1px}

/* Buttons */
button{padding:7px 13px;border:none;border-radius:7px;cursor:pointer;font-size:.82rem;font-weight:500;transition:opacity .12s,background .12s}
button:disabled{opacity:.45;cursor:not-allowed}
button:not(:disabled):active{opacity:.7}
.btn-primary{background:#6366f1;color:#fff}
.btn-secondary{background:#f4f4f5;color:#3f3f46}
.btn-success{background:#22c55e;color:#fff}
.btn-danger{background:#f87171;color:#fff}
.btn-sm{padding:4px 10px;font-size:.78rem}
button:not(:disabled):hover{opacity:.85}

/* Edit panel */
.panel-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:50;display:flex;justify-content:flex-end}
.edit-panel{width:min(740px,100vw);height:100%;background:#fff;overflow-y:auto;display:flex;flex-direction:column;box-shadow:-4px 0 24px rgba(0,0,0,.12)}
.edit-header{padding:16px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#fff;z-index:2}
.edit-header h2{font-size:.95rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:340px}
.edit-body{padding:20px;flex:1;display:flex;flex-direction:column;gap:14px}
.edit-footer{padding:14px 20px;border-top:1px solid #f0f0f0;display:flex;gap:8px;position:sticky;bottom:0;background:#fff;z-index:2}

/* Form */
.field{display:flex;flex-direction:column;gap:5px}
.field label{font-size:.72rem;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:.5px}
.field input,.field textarea{padding:8px 10px;border:1px solid #e4e4e7;border-radius:7px;font-size:.88rem;font-family:inherit}
.field textarea{resize:vertical;min-height:72px}
.field textarea.code{font-family:'Menlo','Monaco',monospace;font-size:.78rem;min-height:110px;background:#fafafa}
.field input:focus,.field textarea:focus{outline:none;border-color:#6366f1}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}

/* Section/FAQ items */
.sec-item,.faq-item{border:1px solid #e4e4e7;border-radius:8px;padding:12px;background:#fafafa}
.item-header{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.item-header input{flex:1}
.add-btn{width:100%;padding:8px;border:2px dashed #e4e4e7;background:transparent;color:#a1a1aa;border-radius:7px;margin-top:6px;font-size:.82rem}
.add-btn:hover:not(:disabled){border-color:#6366f1;color:#6366f1;opacity:1;background:transparent}

.divider{font-size:.7rem;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;padding:4px 0 2px;border-top:1px solid #f0f0f0;margin-top:4px}

/* Log */
#log{background:#18181b;color:#a3e635;font-family:monospace;font-size:.75rem;padding:14px 16px;border-radius:10px;max-height:200px;overflow-y:auto;white-space:pre-wrap;margin-top:18px}
#log:empty{display:none}

.hidden{display:none!important}
.loading{opacity:.5;pointer-events:none}
</style>
</head>
<body>
<header>
  <h1>&#9671; Rutputs Guide Admin</h1>
  <button class="btn-secondary btn-sm" onclick="refresh()">&#8635; Uppdatera</button>
</header>

<div class="main">
  <div class="new-form">
    <div class="field">
      <label>Ange ämne för ny guide</label>
      <input id="new-topic" type="text" placeholder='T.ex. "Hur rengör man solceller?"' onkeydown="if(event.key==='Enter')createDraft()">
    </div>
    <button class="btn-primary" id="create-btn" onclick="createDraft()">+ Generera utkast</button>
  </div>

  <div class="columns">
    <div class="panel">
      <div class="panel-title">Utkast <span id="drafts-count">0</span></div>
      <div id="drafts-list"><p style="color:#a1a1aa;font-size:.82rem">Laddar...</p></div>
    </div>
    <div class="panel">
      <div class="panel-title">Publicerade <span id="guides-count">0</span></div>
      <div id="guides-list"><p style="color:#a1a1aa;font-size:.82rem">Laddar...</p></div>
    </div>
  </div>

  <div id="log"></div>
</div>

<!-- Edit panel -->
<div id="edit-overlay" class="hidden">
  <div class="panel-overlay" onclick="if(event.target===this)closeEditor()">
    <div class="edit-panel">
      <div class="edit-header">
        <h2 id="edit-title">Redigera utkast</h2>
        <button class="btn-secondary btn-sm" onclick="closeEditor()">&#10005; Stäng</button>
      </div>
      <div class="edit-body" id="edit-body"></div>
      <div class="edit-footer">
        <button class="btn-success" id="save-btn" onclick="saveDraft()">Spara</button>
        <button class="btn-primary" id="pub-btn" onclick="saveAndPublish()">Publicera</button>
      </div>
    </div>
  </div>
</div>

<!-- Reference image picker -->
<div id="ref-overlay" class="hidden" style="position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:60;display:flex;align-items:center;justify-content:center">
  <div style="background:#fff;border-radius:12px;padding:20px;width:min(620px,95vw);max-height:82vh;overflow-y:auto;display:flex;flex-direction:column;gap:14px;box-shadow:0 8px 32px rgba(0,0,0,.18)">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <strong>Välj referensbild (valfritt)</strong>
      <button class="btn-secondary btn-sm" onclick="closeRefPicker()">&#10005;</button>
    </div>
    <p style="font-size:.82rem;color:#71717a;margin:0">Välj en av dina bilder som referens — bilden genereras med dig och dina verktyg. Väljer du ingen bild genereras en helt AI-skapad bild.</p>
    <div id="ref-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px"></div>
    <div style="display:flex;gap:8px;justify-content:flex-end;padding-top:4px;border-top:1px solid #f0f0f0">
      <button class="btn-secondary" onclick="closeRefPicker()">Avbryt</button>
      <button class="btn-primary" onclick="confirmGenerateImage()">Generera bild</button>
    </div>
  </div>
</div>

<script>
var currentSlug = null;
var currentIsPublished = false;
var currentPublishedAt = null;
var refPickerSlug = null;
var selectedRefImage = null;

async function api(method, path2, body) {
  var opts = { method: method, headers: {} };
  if (body !== undefined) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
  var r = await fetch(path2, opts);
  return r.json();
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function log(text) {
  var el = document.getElementById('log');
  if (!text) return;
  el.textContent += text.trimEnd() + '\\n';
  el.scrollTop = el.scrollHeight;
}

async function refresh() { await Promise.all([loadDrafts(), loadGuides()]); }

async function loadDrafts() {
  var drafts = await api('GET', '/api/drafts');
  document.getElementById('drafts-count').textContent = drafts.length;
  var el = document.getElementById('drafts-list');
  if (!drafts.length) { el.innerHTML = '<p style="color:#a1a1aa;font-size:.82rem">Inga utkast.</p>'; return; }
  el.innerHTML = drafts.map(function(d) {
    return '<div class="card">'
      + '<div class="card-h1">' + esc(d.h1) + '</div>'
      + '<div class="card-slug">' + esc(d.slug) + '</div>'
      + (d.hasTodo ? '<div class="badge badge-warn">&#9888; Innehåller TODO</div>' : '')
      + '<div class="card-actions">'
      + '<button class="btn-secondary btn-sm" onclick="openEditor(\\'' + esc(d.slug) + '\\')">&#9998; Redigera</button>'
      + '<button class="btn-primary btn-sm" onclick="publishDraft(\\'' + esc(d.slug) + '\\')">&#8594; Publicera</button>'
      + '<button class="btn-danger btn-sm" onclick="deleteDraft(\\'' + esc(d.slug) + '\\')">&#128465; Ta bort</button>'
      + '</div></div>';
  }).join('');
}

async function loadGuides() {
  var guides = await api('GET', '/api/guides');
  document.getElementById('guides-count').textContent = guides.length;
  var el = document.getElementById('guides-list');
  if (!guides.length) { el.innerHTML = '<p style="color:#a1a1aa;font-size:.82rem">Inga publicerade guider.</p>'; return; }
  el.innerHTML = guides.map(function(g) {
    return '<div class="guide-row">'
      + '<div class="dot' + (g.hasOgImage ? ' green' : '') + '" title="' + (g.hasOgImage ? 'Har OG-bild' : 'Saknar OG-bild') + '"></div>'
      + '<div class="guide-info"><div class="guide-title">' + esc(g.title) + '</div><div class="guide-meta">' + esc(g.slug) + ' · ' + esc(g.publishedAt) + '</div></div>'
      + '<button class="btn-secondary btn-sm" onclick="openPublishedEditor(\\'' + esc(g.slug) + '\\')">&#9998; Redigera</button>'
      + (!g.hasOgImage ? '<button class="btn-secondary btn-sm" onclick="openRefPicker(\\'' + esc(g.slug) + '\\')">Bild</button>' : '')
      + '</div>';
  }).join('');
}

async function createDraft() {
  var topic = document.getElementById('new-topic').value.trim();
  if (!topic) { document.getElementById('new-topic').focus(); return; }
  var btn = document.getElementById('create-btn');
  btn.disabled = true; btn.textContent = 'Genererar...';
  log('> Genererar utkast: ' + topic);
  var r = await api('POST', '/api/drafts/new', { topic: topic });
  log(r.stdout); log(r.stderr);
  btn.disabled = false; btn.textContent = '+ Generera utkast';
  if (r.code === 0) { document.getElementById('new-topic').value = ''; await loadDrafts(); }
}

async function openEditor(slug) {
  currentSlug = slug;
  currentIsPublished = false;
  currentPublishedAt = null;
  var guide = await api('GET', '/api/drafts/' + slug);
  if (guide.error) { log('Fel: ' + guide.error); return; }
  document.getElementById('edit-title').textContent = guide.h1 || slug;
  document.getElementById('pub-btn').textContent = 'Publicera';
  document.getElementById('edit-body').innerHTML = buildForm(guide);
  document.getElementById('edit-overlay').classList.remove('hidden');
  document.querySelector('.edit-panel').scrollTop = 0;
}

function closeEditor() {
  document.getElementById('edit-overlay').classList.add('hidden');
  currentSlug = null;
  currentIsPublished = false;
  currentPublishedAt = null;
}

async function openPublishedEditor(slug) {
  currentSlug = slug;
  currentIsPublished = true;
  var guide = await api('GET', '/api/guides/' + slug);
  if (guide.error) { log('Fel: ' + guide.error); return; }
  currentPublishedAt = guide.publishedAt;
  document.getElementById('edit-title').textContent = guide.h1 || slug;
  document.getElementById('pub-btn').textContent = 'Spara & stäng';
  document.getElementById('edit-body').innerHTML = buildForm(guide);
  document.getElementById('edit-overlay').classList.remove('hidden');
  document.querySelector('.edit-panel').scrollTop = 0;
}

function buildForm(g) {
  var sections = (g.sections || []).map(function(s, i) {
    return '<div class="sec-item" data-i="' + i + '">'
      + '<div class="item-header"><input type="text" class="sec-h" placeholder="Rubrik" value="' + esc(s.heading) + '">'
      + '<button class="btn-danger btn-sm" onclick="this.closest(\\'.sec-item\\').remove()">✕</button></div>'
      + '<div class="field"><label>HTML-innehåll</label>'
      + '<textarea class="code sec-html">' + esc(s.html) + '</textarea></div></div>';
  }).join('');

  var faqs = (g.faq || []).map(function(q, i) {
    return '<div class="faq-item" data-i="' + i + '">'
      + '<div class="item-header"><input type="text" class="faq-q" placeholder="Fråga" value="' + esc(q.question) + '">'
      + '<button class="btn-danger btn-sm" onclick="this.closest(\\'.faq-item\\').remove()">✕</button></div>'
      + '<div class="field"><label>Svar</label><textarea class="faq-a" rows="3">' + esc(q.answer) + '</textarea></div>'
      + '<div class="row2">'
      + '<div class="field"><label>Länktext (valfri)</label><input type="text" class="faq-ll" value="' + esc(q.linkLabel || '') + '"></div>'
      + '<div class="field"><label>Länk-URL (valfri)</label><input type="text" class="faq-lt" value="' + esc(q.linkTo || '') + '"></div>'
      + '</div></div>';
  }).join('');

  return ''
    + '<div class="row2">'
    + '<div class="field"><label>Title (SEO)</label><input id="f-title" type="text" value="' + esc(g.title) + '"></div>'
    + '<div class="field"><label>H1</label><input id="f-h1" type="text" value="' + esc(g.h1) + '"></div>'
    + '</div>'
    + '<div class="field"><label>Description (150–160 tecken)</label><textarea id="f-desc" rows="2">' + esc(g.description) + '</textarea></div>'
    + '<div class="field"><label>Intro</label><textarea id="f-intro" rows="3">' + esc(g.intro) + '</textarea></div>'
    + '<div class="row2">'
    + '<div class="field"><label>Taggar (kommaseparerade)</label><input id="f-tags" type="text" value="' + esc((g.tags || []).join(', ')) + '"></div>'
    + '<div class="field"><label>Lästid (min)</label><input id="f-rt" type="number" value="' + (g.readingTimeMin || 5) + '" min="1" max="60"></div>'
    + '</div>'
    + '<div class="divider">Sektioner</div>'
    + '<div id="secs">' + sections + '</div>'
    + '<button class="add-btn" onclick="addSection()">+ Sektion</button>'
    + '<div class="divider">FAQ</div>'
    + '<div id="faqs">' + faqs + '</div>'
    + '<button class="add-btn" onclick="addFaq()">+ FAQ-fråga</button>'
    + '<div class="divider">Relaterat</div>'
    + '<div class="field"><label>Områdeslugs (kommaseparerade)</label><textarea id="f-areas" rows="3">' + esc((g.relatedAreaSlugs || []).join(', ')) + '</textarea></div>'
    + '<div class="field"><label>Tjänsteslugs (kommaseparerade)</label><input id="f-services" type="text" value="' + esc((g.relatedServiceSlugs || []).join(', ')) + '"></div>';
}

function addSection() {
  var el = document.createElement('div');
  el.className = 'sec-item';
  el.innerHTML = '<div class="item-header"><input type="text" class="sec-h" placeholder="Rubrik">'
    + '<button class="btn-danger btn-sm" onclick="this.closest(\\'.sec-item\\').remove()">✕</button></div>'
    + '<div class="field"><label>HTML-innehåll</label><textarea class="code sec-html"></textarea></div>';
  document.getElementById('secs').appendChild(el);
  el.querySelector('.sec-h').focus();
}

function addFaq() {
  var el = document.createElement('div');
  el.className = 'faq-item';
  el.innerHTML = '<div class="item-header"><input type="text" class="faq-q" placeholder="Fråga">'
    + '<button class="btn-danger btn-sm" onclick="this.closest(\\'.faq-item\\').remove()">✕</button></div>'
    + '<div class="field"><label>Svar</label><textarea class="faq-a" rows="3"></textarea></div>'
    + '<div class="row2">'
    + '<div class="field"><label>Länktext (valfri)</label><input type="text" class="faq-ll"></div>'
    + '<div class="field"><label>Länk-URL (valfri)</label><input type="text" class="faq-lt"></div>'
    + '</div>';
  document.getElementById('faqs').appendChild(el);
  el.querySelector('.faq-q').focus();
}

function splitTrim(v) { return v.split(',').map(function(s) { return s.trim(); }).filter(Boolean); }

function readForm() {
  var sections = Array.from(document.querySelectorAll('#secs .sec-item')).map(function(el) {
    return { heading: el.querySelector('.sec-h').value, html: el.querySelector('.sec-html').value };
  }).filter(function(s) { return s.heading || s.html; });

  var faq = Array.from(document.querySelectorAll('#faqs .faq-item')).map(function(el) {
    var q = { question: el.querySelector('.faq-q').value, answer: el.querySelector('.faq-a').value };
    var ll = el.querySelector('.faq-ll').value;
    var lt = el.querySelector('.faq-lt').value;
    if (ll) q.linkLabel = ll;
    if (lt) q.linkTo = lt;
    return q;
  }).filter(function(q) { return q.question || q.answer; });

  return {
    slug: currentSlug,
    title: document.getElementById('f-title').value,
    description: document.getElementById('f-desc').value,
    h1: document.getElementById('f-h1').value,
    intro: document.getElementById('f-intro').value,
    publishedAt: (currentIsPublished && currentPublishedAt) ? currentPublishedAt : new Date().toISOString().slice(0, 10),
    readingTimeMin: parseInt(document.getElementById('f-rt').value) || 5,
    author: 'Rutputs',
    tags: splitTrim(document.getElementById('f-tags').value),
    category: 'guide',
    sections: sections,
    faq: faq,
    relatedAreaSlugs: splitTrim(document.getElementById('f-areas').value),
    relatedServiceSlugs: splitTrim(document.getElementById('f-services').value),
  };
}

async function saveDraft() {
  if (!currentSlug) return;
  var btn = document.getElementById('save-btn');
  btn.disabled = true; btn.textContent = 'Sparar...';
  var endpoint = currentIsPublished ? '/api/guides/' + currentSlug : '/api/drafts/' + currentSlug;
  await api('PUT', endpoint, readForm());
  btn.disabled = false; btn.textContent = 'Spara';
  log('Sparat: ' + currentSlug);
}

async function publishDraft(slug) {
  if (!confirm('Publicera "' + slug + '"?')) return;
  log('> Publicerar ' + slug + '...');
  var r = await api('POST', '/api/drafts/' + slug + '/publish');
  log(r.stdout); log(r.stderr);
  if (r.code === 0) await refresh();
}

async function deleteDraft(slug) {
  if (!confirm('Ta bort utkastet "' + slug + '"? Detta går inte att ångra.')) return;
  var r = await api('DELETE', '/api/drafts/' + slug);
  if (r.error) { log('Fel: ' + r.error); return; }
  log('Utkast borttaget: ' + slug);
  await loadDrafts();
}

async function saveAndPublish() {
  if (!currentSlug) return;
  await saveDraft();
  if (currentIsPublished) {
    var slug = currentSlug;
    closeEditor();
    log('Guide uppdaterad: ' + slug);
    await loadGuides();
    return;
  }
  var slug = currentSlug;
  closeEditor();
  await publishDraft(slug);
}

async function generateImage(slug) {
  log('> Genererar OG-bild för ' + slug + '...');
  var r = await api('POST', '/api/guides/' + slug + '/image', {});
  log(r.stdout); log(r.stderr);
  if (r.code === 0) await loadGuides();
}

async function openRefPicker(slug) {
  refPickerSlug = slug;
  selectedRefImage = null;
  document.getElementById('ref-overlay').classList.remove('hidden');
  var files = await api('GET', '/api/ref-images');
  var grid = document.getElementById('ref-grid');
  if (!files.length) {
    grid.innerHTML = '<p style="color:#a1a1aa;font-size:.82rem">Inga bilder hittades i /public/img.</p>';
    return;
  }
  grid.innerHTML = files.map(function(f) {
    return '<div id="refimg-' + esc(f) + '" onclick="selectRef(\\'' + esc(f) + '\\')" style="cursor:pointer;border:3px solid transparent;border-radius:8px;overflow:hidden;transition:border-color .15s">'
      + '<img src="/img/' + esc(f) + '" style="width:100%;height:90px;object-fit:cover;display:block">'
      + '<div style="font-size:.65rem;padding:3px 5px;color:#71717a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(f) + '</div>'
      + '</div>';
  }).join('');
}

function closeRefPicker() {
  document.getElementById('ref-overlay').classList.add('hidden');
  refPickerSlug = null;
  selectedRefImage = null;
}

function selectRef(filename) {
  if (selectedRefImage) {
    var prev = document.getElementById('refimg-' + selectedRefImage);
    if (prev) prev.style.borderColor = 'transparent';
  }
  if (selectedRefImage === filename) { selectedRefImage = null; return; }
  selectedRefImage = filename;
  var el = document.getElementById('refimg-' + filename);
  if (el) el.style.borderColor = '#6366f1';
}

async function confirmGenerateImage() {
  if (!refPickerSlug) return;
  var slug = refPickerSlug;
  var ref = selectedRefImage;
  closeRefPicker();
  log('> Genererar OG-bild för ' + slug + (ref ? ' (referens: ' + ref + ')' : '') + '...');
  var body = ref ? { referenceImage: ref } : {};
  var r = await api('POST', '/api/guides/' + slug + '/image', body);
  log(r.stdout); log(r.stderr);
  if (r.code === 0) await loadGuides();
}

refresh();
</script>
</body>
</html>`;
