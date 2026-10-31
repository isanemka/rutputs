// Serves dist/static the way Vercel does with this repo's vercel.json:
// clean URLs (/pris → pris/index.html), no trailing slash (308 redirect) and
// 404.html with HTTP 404 for unknown paths. Usage: npm run preview [-- port]

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';

const root = path.resolve('dist/static');
const port = Number(process.argv[2] || process.env.PORT || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const isFile = (file) => existsSync(file) && statSync(file).isFile();

function resolveFile(urlPath) {
  const target = path.join(root, urlPath);
  if (!target.startsWith(root)) return null;
  if (isFile(target)) return target;
  if (isFile(`${target}.html`)) return `${target}.html`;
  if (isFile(path.join(target, 'index.html'))) return path.join(target, 'index.html');
  return null;
}

function send(res, status, file) {
  res.writeHead(status, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
}

if (!existsSync(root)) {
  console.error('dist/static not found. Run `npm run build` first.');
  process.exit(1);
}

createServer((req, res) => {
  const { pathname, search } = new URL(req.url, 'http://localhost');
  const urlPath = decodeURIComponent(pathname);

  if (urlPath.length > 1 && urlPath.endsWith('/')) {
    res.writeHead(308, { Location: urlPath.replace(/\/+$/, '') + search });
    res.end();
    return;
  }

  const file = resolveFile(urlPath);
  if (file) {
    send(res, 200, file);
  } else {
    send(res, 404, path.join(root, '404.html'));
  }
}).listen(port, () => {
  console.log(`Serving dist/static at http://localhost:${port}`);
});
