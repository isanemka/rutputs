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
quasar build
```

Production build now also generates prerendered HTML files for the key SEO routes in `dist/spa`, including the home page, company page, pricing page and all area pages.

### SEO and deploy notes

- The build command generates route-specific static HTML files with page-specific `title`, `description`, `canonical`, Open Graph tags and structured data.
- Vercel should serve `dist/spa` as the output directory.
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
