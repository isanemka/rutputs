# fp (rutputs)

A website for a windowcleaner

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

The following command will start the Quasar app for frontend and also Node.js for the backend

```bash
npm run dev
```

### Access the database

To use the application please update the .env file named ".env-template". Ask the code owner for correct config settings. Please also change the file name to: ".env"

For the CRM-backed booking flow you now also need:

- `PPCRM_LEADS_URL` and `PPCRM_LEADS_SECRET` for lead submission
- `PPCRM_AVAILABILITY_URL` and `PPCRM_AVAILABILITY_SECRET` for the availability feed used by the booking picker

### Access the nodemailer

To use the application please update the .env-file with the appropriate e-mail settings. Ask the code owner for correct config settings.

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
npm run build
```

The build has three steps:

1. `quasar build -m ssr` builds the app in SSR mode (`dist/ssr`).
2. `scripts/prerender.mjs` starts that SSR bundle locally and renders every route in the page registry (`src/data/site-pages.js`) to static HTML in `dist/static` (`/omrade/kista` → `omrade/kista/index.html`). It also writes `404.html`, `sitemap.xml` and `llms.txt`. Each page hydrates in the browser as a normal Quasar app.
3. `scripts/verify-seo.mjs` checks the built HTML for every URL in `sitemap.xml` and prints a table. The build fails on duplicate titles or descriptions, a canonical that is not the page's own URL, or a page without exactly one `<h1>`.

To check the output locally the way Vercel serves it (clean URLs, `404.html` with HTTP 404):

```bash
npm run preview
```

`npm run dev` still runs the app in SPA mode with hot reload; `npm run dev:ssr` runs it in SSR mode.

### SEO and deploy notes

- Title, description, canonical, Open Graph, robots and JSON-LD for every page come from the page registry `src/data/site-pages.js` (schemas in `src/data/schema.js`) and are applied by `usePageSeo()` in `MainLayout`. Do not hardcode head tags in `index.html` or in page components.
- To add a page: add the route in `src/router/routes.ts` and an entry in the registry (area and service pages are added through `src/data/seo-content.js`, guides through `src/data/guides-content.js`). Pages missing from the registry are not prerendered and get a 404 on Vercel.
- `updatedAt` on each page in `src/data/seo-content.js` (and `updatedAt`/`publishedAt` on guides) becomes `<lastmod>` in `sitemap.xml`. Bump it when a page's content changes meaningfully.
- Vercel serves `dist/static` (`vercel.json` sets `buildCommand` and `outputDirectory`, which override the dashboard settings). There is no SPA fallback rewrite, so unknown URLs get `404.html` with HTTP 404.
- Keep `www.rutputs.nu` as the canonical domain.
- Configure the apex domain `rutputs.nu` to redirect permanently to `www.rutputs.nu` in the Vercel Domains dashboard, since domain-level redirects are managed there.

## Ads tracking

- `VITE_GTM_ID` can be set to a Google Tag Manager container ID if you want to manage Google Ads and GA4 conversion tags through GTM.
- If `VITE_GTM_ID` is not set, the site falls back to direct GA4 loading via `VITE_GA_MEASUREMENT_ID`.
- After cookie consent, the site emits:
  - `lead_form_submit` when the quote form is submitted successfully
  - `phone_click` when a visitor clicks a `tel:` link
- After deploy, request reindexing in Google Search Console for `/`, `/foretag`, `/pris` and the updated `/omrade/*` pages.

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
