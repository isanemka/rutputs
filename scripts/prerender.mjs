// Build step after `quasar build -m ssr`: renders every route in the page
// registry (src/data/site-pages.js) with the SSR bundle and writes static
// HTML to dist/static, which is what Vercel serves.
//
//   dist/static/index.html                 → /
//   dist/static/omrade/kista/index.html    → /omrade/kista
//   dist/static/404.html                   → every unknown URL (HTTP 404)
//
// The SSR server only runs here, on a random local port, for the duration of
// the build. Each page hydrates in the browser as a normal Quasar app.

import { spawn } from 'node:child_process';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';
import { getPrerenderPages } from '../src/data/site-pages.js';
import { buildLlmsTxt } from './lib/llms.mjs';
import { buildSitemapXml } from './lib/sitemap.mjs';

const ssrDir = path.resolve('dist/ssr');
const outDir = path.resolve('dist/static');
const publicDir = path.resolve('public');
const NOT_FOUND_PROBE = '/__prerender-unknown-route__';
const CONCURRENCY = 6;

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function startSsrServer() {
  const port = await getFreePort();
  const child = spawn(process.execPath, ['index.js'], {
    cwd: ssrDir,
    env: { ...process.env, PORT: String(port), NODE_ENV: 'production' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let output = '';
  child.stdout.on('data', (chunk) => (output += chunk));
  child.stderr.on('data', (chunk) => (output += chunk));

  const origin = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`SSR server exited early:\n${output}`);
    }
    try {
      await fetch(`${origin}/`, { redirect: 'manual' });
      return { origin, child, getOutput: () => output };
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  child.kill();
  throw new Error(`SSR server did not start within 30 s:\n${output}`);
}

const outputFileFor = (routePath) =>
  routePath === '/' ? path.join(outDir, 'index.html') : path.join(outDir, routePath.slice(1), 'index.html');

async function renderRoute(origin, routePath, expectedStatus) {
  const response = await fetch(`${origin}${encodeURI(routePath)}`, { redirect: 'manual' });
  const html = await response.text();
  if (response.status !== expectedStatus) {
    throw new Error(`${routePath}: expected HTTP ${expectedStatus}, got ${response.status}`);
  }
  if (!html.includes('data-server-rendered')) {
    throw new Error(`${routePath}: response is not server-rendered markup`);
  }
  return html;
}

async function writeFileWithDirs(file, contents) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, contents, 'utf8');
}

async function main() {
  // Static assets (JS/CSS bundles and everything from public/) come from the
  // client half of the SSR build.
  await rm(outDir, { recursive: true, force: true });
  await cp(path.join(ssrDir, 'client'), outDir, { recursive: true });

  const pages = getPrerenderPages();
  const server = await startSsrServer();

  try {
    const queue = [...pages];
    const workers = Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const page = queue.shift();
        const html = await renderRoute(server.origin, page.path, 200);
        await writeFileWithDirs(outputFileFor(page.path), html);
      }
    });
    await Promise.all(workers);

    const notFoundHtml = await renderRoute(server.origin, NOT_FOUND_PROBE, 404);
    await writeFileWithDirs(path.join(outDir, '404.html'), notFoundHtml);
  } catch (error) {
    console.error(server.getOutput());
    throw error;
  } finally {
    server.child.kill();
  }

  await writeFile(path.join(outDir, 'sitemap.xml'), buildSitemapXml(), 'utf8');

  // Keep the public/ copy of llms.txt in sync with the published one.
  const llmsTxt = buildLlmsTxt();
  await writeFile(path.join(outDir, 'llms.txt'), llmsTxt, 'utf8');
  await writeFile(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf8');

  console.log(`Prerendered ${pages.length} routes + 404.html, sitemap.xml and llms.txt into dist/static.`);
}

main().catch((error) => {
  console.error('Prerender failed:', error.message);
  process.exitCode = 1;
});
