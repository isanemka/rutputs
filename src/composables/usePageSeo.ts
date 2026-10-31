import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import { getPage, getPageSchemas, NOT_FOUND_PAGE } from 'src/data/site-pages';

type MetaTag = Record<string, string>;

// JSON-LD is injected as raw script content, so escape characters that could
// close the <script> element or start an HTML entity.
const toJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, '\\u003C').replace(/>/g, '\\u003E').replace(/&/g, '\\u0026');

/**
 * Sets title, description, canonical, Open Graph, robots, hero preloads and
 * JSON-LD for the current route from the page registry (src/data/site-pages.js).
 * Called once in MainLayout, so every page gets its head from the same place
 * and it updates on client-side navigation. Unknown paths get the noindex
 * 404 head.
 */
export function usePageSeo(): void {
  const route = useRoute();

  useMeta(() => {
    const page = getPage(route.path) ?? NOT_FOUND_PAGE;
    const robots = page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';

    const meta: Record<string, MetaTag> = {
      description: { name: 'description', content: page.description },
      robots: { name: 'robots', content: robots },
      ogType: { property: 'og:type', content: page.ogType },
      ogSiteName: { property: 'og:site_name', content: 'Rutputs' },
      ogLocale: { property: 'og:locale', content: 'sv_SE' },
      ogTitle: { property: 'og:title', content: page.title },
      ogDescription: { property: 'og:description', content: page.description },
      ogImage: { property: 'og:image', content: page.image },
      twitterCard: { name: 'twitter:card', content: 'summary_large_image' },
      twitterTitle: { name: 'twitter:title', content: page.title },
      twitterDescription: { name: 'twitter:description', content: page.description },
      twitterImage: { name: 'twitter:image', content: page.image },
    };

    const link: Record<string, MetaTag> = {};
    if (page.hero) {
      // The hero photo is the LCP element on these pages; start loading the
      // right variant before the CSS and JS are parsed.
      link.heroPortrait = { rel: 'preload', as: 'image', href: page.hero.portrait, media: '(max-width: 599px)' };
      link.heroLandscape = { rel: 'preload', as: 'image', href: page.hero.landscape, media: '(min-width: 600px)' };
    }

    if ('canonical' in page && !page.noindex) {
      meta.ogUrl = { property: 'og:url', content: page.canonical };
      link.canonical = { rel: 'canonical', href: page.canonical };
    }

    const script: Record<string, { type: string; innerHTML: string }> = {};
    if ('schemas' in page) {
      getPageSchemas(page).forEach((schema: unknown, index: number) => {
        script[`ldJson${index}`] = { type: 'application/ld+json', innerHTML: toJsonLd(schema) };
      });
    }

    return { title: page.title, meta, link, script };
  });
}
