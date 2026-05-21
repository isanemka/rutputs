/**
 * Google Search Console weekly report generator.
 *
 * Usage:
 *   node scripts/gsc-report.mjs
 *
 * Requires:
 *   GSC_KEY_FILE=path/to/service-account.json  (default: gsc-key.json)
 *   GSC_SITE_URL=https://www.rutputs.nu         (default: https://www.rutputs.nu)
 *
 * Output: reports/veckorapport-YYYY-MM-DD.md
 *
 * Setup (once):
 *   1. Google Cloud Console → IAM & Admin → Service Accounts → Create
 *   2. Grant the service account no project roles (it only needs GSC access)
 *   3. Create a JSON key and save as gsc-key.json in the repo root
 *   4. Google Search Console → Settings → Users and permissions → Add user
 *      with the service account email (at least "Restricted" access)
 *   5. Add gsc-key.json to .gitignore
 */

import { google } from 'googleapis';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

// ── Config ────────────────────────────────────────────────────────────────────
const KEY_FILE = process.env.GSC_KEY_FILE ?? 'gsc-key.json';
const SITE_URL = process.env.GSC_SITE_URL ?? 'https://www.rutputs.nu';
const REPORTS_DIR = 'reports';

// Thresholds for flags
const NEAR_PAGE_ONE_MIN = 11;
const NEAR_PAGE_ONE_MAX = 20;
const HIGH_IMPRESSIONS_THRESHOLD = 100;
const LOW_CTR_THRESHOLD = 0.02; // 2 %

// ── Helpers ───────────────────────────────────────────────────────────────────
function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function dateRange(offsetDays, durationDays = 7) {
  const end = new Date();
  end.setDate(end.getDate() - offsetDays);
  const start = new Date(end);
  start.setDate(start.getDate() - durationDays + 1);
  return { startDate: isoDate(start), endDate: isoDate(end) };
}

function pct(value) {
  return (value * 100).toFixed(1) + '%';
}

function delta(current, previous, isPercent = false) {
  if (previous === 0) return current > 0 ? '↑ ny' : '—';
  const diff = current - previous;
  const rel = diff / previous;
  const arrow = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
  if (isPercent) return `${arrow} ${(diff * 100).toFixed(2)}pp`;
  return `${arrow} ${(rel * 100).toFixed(0)}%`;
}

function positionDelta(current, previous) {
  if (previous === 0) return '—';
  const diff = current - previous;
  // For position, lower is better → invert arrows
  if (Math.abs(diff) < 0.1) return '→ oförändrad';
  const arrow = diff < 0 ? '↑' : '↓';
  return `${arrow} ${Math.abs(diff).toFixed(1)}`;
}

function row(...cols) {
  return '| ' + cols.join(' | ') + ' |';
}

// ── GSC API ───────────────────────────────────────────────────────────────────
async function buildClient() {
  if (!existsSync(KEY_FILE)) {
    console.error(`Nyckelfel: Hittar inte "${KEY_FILE}".`);
    console.error('Läs setup-instruktionerna överst i scriptet.');
    process.exit(1);
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  return google.searchconsole({ version: 'v1', auth });
}

async function fetchRows(client, startDate, endDate) {
  const res = await client.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query', 'page'],
      rowLimit: 500,
      dataState: 'all',
    },
  });
  return res.data.rows ?? [];
}

// ── Aggregation ───────────────────────────────────────────────────────────────
function aggregateByQuery(rows) {
  const map = new Map();
  for (const row of rows) {
    const query = row.keys[0];
    const existing = map.get(query);
    if (existing) {
      existing.clicks += row.clicks;
      existing.impressions += row.impressions;
      existing.ctr = existing.clicks / existing.impressions;
      // Weighted average position
      existing._posSum += row.position * row.impressions;
      existing._impSum += row.impressions;
      existing.position = existing._posSum / existing._impSum;
    } else {
      map.set(query, {
        query,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
        _posSum: row.position * row.impressions,
        _impSum: row.impressions,
      });
    }
  }
  return map;
}

function aggregateByPage(rows) {
  const map = new Map();
  for (const row of rows) {
    const page = row.keys[1];
    const existing = map.get(page);
    if (existing) {
      existing.clicks += row.clicks;
      existing.impressions += row.impressions;
      existing.ctr = existing.clicks / existing.impressions;
      existing._posSum += row.position * row.impressions;
      existing._impSum += row.impressions;
      existing.position = existing._posSum / existing._impSum;
    } else {
      map.set(page, {
        page,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
        _posSum: row.position * row.impressions,
        _impSum: row.impressions,
      });
    }
  }
  return map;
}

function totals(rows) {
  const clicks = rows.reduce((s, r) => s + r.clicks, 0);
  const impressions = rows.reduce((s, r) => s + r.impressions, 0);
  const ctr = impressions > 0 ? clicks / impressions : 0;
  const position =
    impressions > 0
      ? rows.reduce((s, r) => s + r.position * r.impressions, 0) / impressions
      : 0;
  return { clicks, impressions, ctr, position };
}

// ── Report builder ────────────────────────────────────────────────────────────
function buildReport({ thisWeek, lastWeek, dateThis, dateLast }) {
  const t = totals(thisWeek);
  const p = totals(lastWeek);

  const thisQueries = aggregateByQuery(thisWeek);
  const lastQueries = aggregateByQuery(lastWeek);
  const thisPages = aggregateByPage(thisWeek);
  const lastPages = aggregateByPage(lastWeek);

  const lines = [];
  const h = (level, text) => lines.push(`${'#'.repeat(level)} ${text}`, '');
  const line = (text = '') => lines.push(text);

  // ── Header
  h(1, `GSC-rapport: ${dateThis.startDate} – ${dateThis.endDate}`);
  line(`Jämförs med: ${dateLast.startDate} – ${dateLast.endDate}`);
  line(`Sajt: ${SITE_URL}`);
  line();

  // ── Summary
  h(2, 'Sammanfattning');
  line(row('Mätvärde', 'Denna vecka', 'Föregående', 'Förändring'));
  line(row('---', '---', '---', '---'));
  line(row('Klick', t.clicks, p.clicks, delta(t.clicks, p.clicks)));
  line(row('Exponeringar', t.impressions, p.impressions, delta(t.impressions, p.impressions)));
  line(row('CTR', pct(t.ctr), pct(p.ctr), delta(t.ctr, p.ctr, true)));
  line(row('Snittposition', t.position.toFixed(1), p.position.toFixed(1), positionDelta(t.position, p.position)));
  line();

  // ── Top 20 queries by impressions
  h(2, 'Topp 20 sökfrågor (exponeringar denna vecka)');
  line(row('#', 'Sökfråga', 'Klick', 'Exp', 'CTR', 'Position', 'Δ Exp', 'Δ Pos'));
  line(row('---', '---', '---', '---', '---', '---', '---', '---'));
  const top20 = [...thisQueries.values()]
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);
  top20.forEach((q, i) => {
    const prev = lastQueries.get(q.query);
    line(
      row(
        i + 1,
        q.query,
        q.clicks,
        q.impressions,
        pct(q.ctr),
        q.position.toFixed(1),
        prev ? delta(q.impressions, prev.impressions) : '↑ ny',
        prev ? positionDelta(q.position, prev.position) : '—',
      ),
    );
  });
  line();

  // ── Biggest impression gainers
  h(2, 'Störst ökning i exponeringar');
  const gainers = [...thisQueries.values()]
    .filter((q) => lastQueries.has(q.query))
    .map((q) => ({ ...q, diff: q.impressions - (lastQueries.get(q.query)?.impressions ?? 0) }))
    .filter((q) => q.diff > 0)
    .sort((a, b) => b.diff - a.diff)
    .slice(0, 10);
  if (gainers.length) {
    line(row('Sökfråga', 'Exp nu', 'Exp då', '+Δ', 'Position'));
    line(row('---', '---', '---', '---', '---'));
    gainers.forEach((q) => {
      const prev = lastQueries.get(q.query);
      line(row(q.query, q.impressions, prev.impressions, `+${q.diff}`, q.position.toFixed(1)));
    });
  } else {
    line('_Inga ökningar._');
  }
  line();

  // ── Biggest drops
  h(2, 'Störst tapp i exponeringar');
  const losers = [...thisQueries.values()]
    .filter((q) => lastQueries.has(q.query))
    .map((q) => ({ ...q, diff: q.impressions - (lastQueries.get(q.query)?.impressions ?? 0) }))
    .filter((q) => q.diff < 0)
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 10);
  if (losers.length) {
    line(row('Sökfråga', 'Exp nu', 'Exp då', 'Δ', 'Position'));
    line(row('---', '---', '---', '---', '---'));
    losers.forEach((q) => {
      const prev = lastQueries.get(q.query);
      line(row(q.query, q.impressions, prev.impressions, q.diff, q.position.toFixed(1)));
    });
  } else {
    line('_Inga tapp._');
  }
  line();

  // ── New queries
  h(2, 'Nya sökfrågor (dök upp denna vecka)');
  const newQueries = [...thisQueries.values()]
    .filter((q) => !lastQueries.has(q.query))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);
  if (newQueries.length) {
    line(row('Sökfråga', 'Klick', 'Exponeringar', 'Position'));
    line(row('---', '---', '---', '---'));
    newQueries.forEach((q) => {
      line(row(q.query, q.clicks, q.impressions, q.position.toFixed(1)));
    });
  } else {
    line('_Inga nya sökfrågor._');
  }
  line();

  // ── Pages that improved
  h(2, 'Sidor som förbättrat sin position');
  const improvedPages = [...thisPages.values()]
    .filter((pg) => lastPages.has(pg.page))
    .map((pg) => {
      const prev = lastPages.get(pg.page);
      return { ...pg, posDiff: pg.position - prev.position, prevPos: prev.position };
    })
    .filter((pg) => pg.posDiff < -0.5) // lower = better
    .sort((a, b) => a.posDiff - b.posDiff)
    .slice(0, 10);
  if (improvedPages.length) {
    line(row('Sida', 'Position nu', 'Position då', 'Förbättring'));
    line(row('---', '---', '---', '---'));
    improvedPages.forEach((pg) => {
      const slug = pg.page.replace(SITE_URL, '') || '/';
      line(row(slug, pg.position.toFixed(1), pg.prevPos.toFixed(1), `↑ ${Math.abs(pg.posDiff).toFixed(1)}`));
    });
  } else {
    line('_Inga tydliga förbättringar._');
  }
  line();

  // ── Near page 1 flags
  h(2, `🎯 Nära förstasidan (position ${NEAR_PAGE_ONE_MIN}–${NEAR_PAGE_ONE_MAX})`);
  const nearPageOne = [...thisQueries.values()]
    .filter((q) => q.position >= NEAR_PAGE_ONE_MIN && q.position <= NEAR_PAGE_ONE_MAX)
    .sort((a, b) => a.position - b.position);
  if (nearPageOne.length) {
    line(row('Sökfråga', 'Position', 'Exponeringar', 'Klick', 'CTR'));
    line(row('---', '---', '---', '---', '---'));
    nearPageOne.forEach((q) => {
      line(row(q.query, q.position.toFixed(1), q.impressions, q.clicks, pct(q.ctr)));
    });
  } else {
    line('_Inga sökfrågor i detta intervall._');
  }
  line();

  // ── High impressions, low CTR
  h(2, '⚠️ Hög exponering, låg CTR');
  const highImpLowCtr = [...thisQueries.values()]
    .filter((q) => q.impressions >= HIGH_IMPRESSIONS_THRESHOLD && q.ctr < LOW_CTR_THRESHOLD)
    .sort((a, b) => b.impressions - a.impressions);
  if (highImpLowCtr.length) {
    line(row('Sökfråga', 'Exponeringar', 'CTR', 'Position'));
    line(row('---', '---', '---', '---'));
    highImpLowCtr.forEach((q) => {
      line(row(q.query, q.impressions, pct(q.ctr), q.position.toFixed(1)));
    });
  } else {
    line('_Inga sökfrågor i detta intervall._');
  }
  line();

  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Hämtar GSC-data för ${SITE_URL}…`);

  const client = await buildClient();
  const dateThis = dateRange(1, 7);  // yesterday − 6 days
  const dateLast = dateRange(8, 7);  // 8 days ago − 6 days

  console.log(`  Denna vecka:      ${dateThis.startDate} – ${dateThis.endDate}`);
  console.log(`  Föregående vecka: ${dateLast.startDate} – ${dateLast.endDate}`);

  const [thisWeek, lastWeek] = await Promise.all([
    fetchRows(client, dateThis.startDate, dateThis.endDate),
    fetchRows(client, dateLast.startDate, dateLast.endDate),
  ]);

  console.log(`  Rader denna vecka: ${thisWeek.length}, föregående: ${lastWeek.length}`);

  const report = buildReport({ thisWeek, lastWeek, dateThis, dateLast });

  await mkdir(REPORTS_DIR, { recursive: true });
  const filename = path.join(REPORTS_DIR, `veckorapport-${dateThis.endDate}.md`);
  await writeFile(filename, report, 'utf8');

  console.log(`\nRapport sparad: ${filename}`);
}

main().catch((err) => {
  console.error('Fel:', err.message ?? err);
  process.exit(1);
});
