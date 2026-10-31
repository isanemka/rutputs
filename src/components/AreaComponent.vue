<template>
  <q-page class="page-shell">
    <div v-if="area" class="page-stack">
      <nav class="breadcrumbs" aria-label="Brödsmulor">
        <router-link to="/">Start</router-link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{{ area.name }}</span>
      </nav>
      <section class="hero-shell area-hero">
        <picture class="hero-shell__media area-hero__media">
          <source media="(min-width: 600px)" :srcset="hero.landscape" type="image/webp">
          <img class="hero-shell__image" :src="hero.portrait" :alt="'Fönsterputsning ' + inArea" fetchpriority="high">
        </picture>
        <div class="hero-shell__content">
          <span class="hero-kicker">{{ area.name }}</span>
          <h1 class="hero-title area-hero__title">Fönsterputsning {{ inArea }}</h1>
          <p class="hero-lead">
            {{ area.content }}
          </p>
          <div class="hero-actions">
            <q-btn unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
          </div>
        </div>
      </section>

      <section class="section-grid section-grid--two">
        <div class="editorial-panel editorial-panel--solid">
          <span class="section-kicker">Lokalt upplägg</span>
          <h2 class="section-title">En smidigare bokning när arbetet redan sker i området</h2>
          <p class="section-text">
            Fönsterputsning {{ inArea }} passar villor, radhus, lägenheter och mindre fastigheter där rena fönster
            gör stor skillnad för ljusinsläpp och helhetsintryck. Vi arbetar redan i området, vilket gör det enkelt att hitta en tid som passar.
          </p>
          <p class="section-text">
            Vi hjälper kunder i {{ districtSummary }} och närliggande delar av området. Med RUT-avdraget börjar priset
            från 499 kronor och du skickar enkelt en offertförfrågan när det passar dig.
          </p>
        </div>

        <div class="editorial-panel">
          <span class="section-kicker">Så går det till</span>
          <h2 class="section-title">Från offertförfrågan till färdigt resultat</h2>
          <ul class="feature-list">
            <li>Fyll i uppgifterna i offertformuläret.</li>
            <li>Skicka in förfrågan när upplägget känns rätt, så återkommer vi med en offert.</li>
            <li>Få återkoppling om bokning, tid och eventuella detaljer.</li>
            <li>Få arbetet utfört av någon som redan är verksam {{ inArea }}.</li>
          </ul>
        </div>
      </section>

      <section class="editorial-panel">
        <span class="section-kicker">Delområden</span>
        <h2 class="section-title">Områden vi täcker {{ inArea }}</h2>
        <p class="section-text">
          Vi arbetar återkommande i flera delar av {{ area.name }}, vilket gör det enkelt att boka både enstaka putsningar och återkommande hjälp.
        </p>
        <div class="mini-card-grid q-mt-lg area-districts">
          <article v-for="district in area.districts" :key="district" class="mini-card">
            <h3 class="mini-card__title">{{ district }}</h3>
            <p class="mini-card__text">Fönsterputsning för bostäder och mindre fastigheter i {{ district }} med tydlig prissättning och smidig bokning.</p>
          </article>
        </div>
      </section>

      <section v-if="area.nearbyAreas?.length" class="editorial-panel">
        <span class="section-kicker">Utforska fler områden</span>
        <h2 class="section-title">Fönsterputs i närliggande områden</h2>
        <div class="nearby-areas-grid">
          <router-link
            v-for="nearby in area.nearbyAreas"
            :key="nearby.slug"
            :to="`/omrade/${nearby.slug}`"
            class="area-chip"
          >
            {{ nearby.name }}
          </router-link>
        </div>
      </section>

      <section class="cta-band">
        <div class="cta-band__text">
          <h2 class="cta-band__title">Vill du ha en offert för {{ area.name }}?</h2>
          <p class="cta-band__lead">Fyll i offertformuläret så återkommer vi med ett tydligt pris efter RUT-avdrag.</p>
        </div>
        <q-btn unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
      </section>

      <section class="editorial-panel faq-shell">
        <span class="section-kicker">Vanliga frågor</span>
        <h2 class="section-title">Det här undrar kunder {{ inArea }} oftast</h2>
        <q-list bordered separator role="none">
          <q-expansion-item
            v-for="item in area.faq"
            :key="item.question"
            :label="item.question"
            expand-separator
            header-class="text-primary text-weight-medium"
          >
            <q-card flat>
              <q-card-section class="text-body2 text-primary">
                {{ item.answer }}
                <div v-if="item.links?.length" class="faq-link-row">
                  <router-link
                    v-for="link in item.links"
                    :key="link.to"
                    :to="link.to"
                    class="text-accent text-weight-bold"
                  >
                    {{ link.label }}
                  </router-link>
                </div>
                <div v-if="item.linkTo && item.linkLabel" class="faq-link-row">
                  <router-link :to="item.linkTo" class="text-accent text-weight-bold">
                    {{ item.linkLabel }}
                  </router-link>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </section>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getAreaBySlug } from 'src/data/seo';
import { areaLocative, heroImagesFor } from 'src/data/site-pages';

export default defineComponent({
  name: 'AreaComponent',
  setup() {
    const route = useRoute();

    // Unknown slugs never reach this component: the route guard renders the
    // 404 page instead (see src/router/routes.ts).
    const area = computed(() => getAreaBySlug(route.params.area as string));

    // "i Kista" / "på Östermalm"
    const inArea = computed(() => (area.value ? areaLocative(area.value) : ''));

    const districtSummary = computed(() => area.value?.districts.join(', ') ?? '');

    const hero = computed(() => heroImagesFor(route.path));

    return {
      area,
      inArea,
      districtSummary,
      hero,
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

.area-hero__media {
  position: absolute;
  inset: 0;
}

.area-hero__title {
  max-width: 14ch;
}

.area-districts {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@media (max-width: 1023px) {
  .area-districts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599px) {
  .area-hero {
    min-height: auto;
  }

  .area-hero :deep(.hero-shell__content) {
    gap: 0.75rem;
    padding: 1rem;
  }

  .area-hero__title {
    max-width: none;
    font-size: clamp(1.8rem, 8vw, 2.25rem);
    line-height: 1.02;
    text-transform: none;
  }

  .area-hero :deep(.hero-lead) {
    font-size: 0.96rem;
    line-height: 1.6;
  }

  .area-hero :deep(.hero-actions) {
    gap: 0.65rem;
  }

  .area-districts {
    grid-template-columns: 1fr;
  }
}

.nearby-areas-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.area-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--q-accent, #f4c542);
  border-radius: 9999px;
  color: var(--q-primary, #1a1a2e);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background-color 0.15s, color 0.15s;
}

.area-chip:hover,
.area-chip:focus-visible {
  background-color: var(--q-accent, #f4c542);
  outline: 2px solid var(--q-accent, #f4c542);
  outline-offset: 2px;
}
</style>
