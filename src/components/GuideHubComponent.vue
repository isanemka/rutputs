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

      <section class="section-grid section-grid--two">
        <div class="editorial-panel">
          <span class="section-kicker">Om guiderna</span>
          <h2 class="section-title">Råd från fönsterputsare i Stockholm</h2>
          <p class="section-text">
            Guiderna bygger på de frågor vi oftast får när vi putsar fönster i lägenheter, radhus och villor runt
            Stockholm: hur ofta fönstren behöver putsas, vad RUT-avdraget innebär för priset och hur man tar hand om
            inglasade balkonger, spröjsade fönster och stora glaspartier.
          </p>
          <p class="section-text">
            Vill du hellre slippa göra jobbet själv kan du alltid begära en offert. Du får ett fast pris efter
            RUT-avdrag, utan timdebitering. Saknar du svar på en fråga om dina fönster? Ring eller mejla oss, så
            hjälper vi dig.
          </p>
        </div>
        <div class="editorial-panel">
          <span class="section-kicker">Mer om fönsterputs</span>
          <h2 class="section-title">Pris och tjänster</h2>
          <ul class="guide-hub-links">
            <li><router-link to="/pris" class="text-accent text-weight-bold">Vad kostar fönsterputs i Stockholm?</router-link></li>
            <li><router-link to="/tjanst/villa-fonsterputs" class="text-accent text-weight-bold">Fönsterputs för villa och hus</router-link></li>
            <li><router-link to="/tjanst/lagenhet-fonsterputs" class="text-accent text-weight-bold">Fönsterputs för lägenhet</router-link></li>
            <li><router-link to="/tjanst/abonnemang-fonsterputs" class="text-accent text-weight-bold">Abonnemang på fönsterputs</router-link></li>
            <li><router-link to="/foretag" class="text-accent text-weight-bold">Fönsterputs för företag</router-link></li>
          </ul>
        </div>
      </section>

      <section class="cta-band">
        <div class="cta-band__text">
          <h2 class="cta-band__title">Vill du ha en offert?</h2>
          <p class="cta-band__lead">Fyll i offertformuläret så återkommer vi med ett pris efter RUT-avdrag.</p>
        </div>
        <q-btn unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
      </section>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { getGuidesSortedByDate } from 'src/data/guides';

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default defineComponent({
  name: 'GuideHubComponent',
  setup() {
    const sortedGuides = computed(() => getGuidesSortedByDate());
    return { sortedGuides, formatDate };
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

.guide-hub-links {
  display: grid;
  gap: 0.6rem;
  margin: 1rem 0 0;
  padding-left: 1.1rem;
}
</style>
