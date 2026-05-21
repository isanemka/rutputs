<template>
  <q-page class="page-shell">
    <div class="page-stack">
      <nav class="breadcrumbs" aria-label="Brödsmulor">
        <router-link to="/">Start</router-link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Guider</span>
      </nav>

      <section class="hero-shell">
        <div class="hero-shell__content">
          <span class="hero-kicker">Guider &amp; tips</span>
          <h1 class="hero-title">Allt om fönsterputs</h1>
          <p class="hero-lead">Råd, prisinfo och praktiska guider om fönsterputs i Stockholm — skrivna utifrån verkliga jobb hos kunder.</p>
        </div>
      </section>

      <section class="editorial-panel editorial-panel--solid">
        <h2 class="section-title">Alla guider</h2>
        <ul class="guide-list">
          <li v-for="guide in sortedGuides" :key="guide.slug" class="guide-list__item">
            <router-link :to="'/guide/' + guide.slug" class="guide-list__link">
              <h3 class="guide-list__title">{{ guide.h1 }}</h3>
              <p class="guide-list__description">{{ guide.description }}</p>
              <p class="guide-list__meta">
                {{ formatDate(guide.publishedAt) }} · {{ guide.readingTimeMin }} min läsning
              </p>
            </router-link>
          </li>
        </ul>
      </section>

      <section class="cta-band">
        <div class="cta-band__text">
          <h2 class="cta-band__title">Vill du ha en offert?</h2>
          <p class="cta-band__lead">Fyll i offertformuläret så återkommer jag med ett pris efter RUT-avdrag.</p>
        </div>
        <q-btn unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
      </section>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { getGuidesSortedByDate } from 'src/data/guides';

const SITE_URL = 'https://www.rutputs.nu';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default defineComponent({
  name: 'GuideHubComponent',
  setup() {
    const sortedGuides = computed(() => getGuidesSortedByDate());
    return { sortedGuides, formatDate };
  },
  meta() {
    const url = `${SITE_URL}/guide`;
    const title = 'Guider om fönsterputs i Stockholm | Rutputs';
    const description = 'Råd, prisinfo och guider om fönsterputs i Stockholm — RUT-avdrag, intervall, säsongstips och mer.';
    return {
      title,
      meta: {
        description: { name: 'description', content: description },
        ogTitle: { property: 'og:title', content: title },
        ogDescription: { property: 'og:description', content: description },
        ogUrl: { property: 'og:url', content: url },
        twitterCard: { name: 'twitter:card', content: 'summary_large_image' },
        twitterTitle: { name: 'twitter:title', content: title },
        twitterDescription: { name: 'twitter:description', content: description },
      },
      link: {
        canonical: { rel: 'canonical', href: url },
      },
      script: {
        breadcrumbSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Guider', item: url },
            ],
          }),
        },
        itemListSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: getGuidesSortedByDate().map((guide, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${SITE_URL}/guide/${guide.slug}`,
              name: guide.h1,
            })),
          }),
        },
      },
    };
  },
});
</script>

<style scoped>
.breadcrumbs {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.85rem;
  opacity: 0.8;
  padding: 0.5rem 0;
}
.breadcrumbs a {
  color: var(--q-accent, #f4c542);
  text-decoration: none;
}
.guide-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}
.guide-list__item {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0.75rem;
  transition: background 0.2s ease;
}
.guide-list__item:hover {
  background: rgba(255, 255, 255, 0.08);
}
.guide-list__link {
  display: block;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
}
.guide-list__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: var(--q-accent, #f4c542);
}
.guide-list__description {
  margin: 0 0 0.5rem;
  line-height: 1.5;
}
.guide-list__meta {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
