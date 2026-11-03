import { getIndexablePages } from '../../src/data/site-pages.js';

const escapeXml = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/**
 * sitemap.xml for every indexable route in the page registry. lastmod comes
 * from each page's own content date (updatedAt/publishedAt), not the build
 * date, so Google can trust it.
 */
export function buildSitemapXml() {
  const pages = getIndexablePages();
  const missing = pages.filter((page) => !/^\d{4}-\d{2}-\d{2}$/.test(page.lastmod || ''));
  if (missing.length) {
    throw new Error(
      `Missing or invalid lastmod (updatedAt) for: ${missing.map((page) => page.path).join(', ')}`,
    );
  }

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${escapeXml(page.canonical)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
