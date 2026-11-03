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
          <img class="hero-shell__image" :src="hero.portrait" :alt="'Fönsterputs ' + inArea" fetchpriority="high">
        </picture>
        <div class="hero-shell__content">
          <span class="hero-kicker">{{ area.name }}</span>
          <h1 class="hero-title area-hero__title">Fönsterputs {{ inArea }}</h1>
          <p class="hero-lead">
            {{ area.content }}
          </p>
          <div class="hero-actions">
            <q-btn unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
            <q-btn outline color="white" label="Se priser" :to="{ hash: '#pris' }" />
          </div>
        </div>
      </section>

      <section class="section-grid section-grid--two">
        <div class="editorial-panel editorial-panel--solid">
          <span class="section-kicker">Bostäder</span>
          <h2 class="section-title">Fönster och bostäder {{ inArea }}</h2>
          <p v-for="paragraph in area.housing" :key="paragraph" class="section-text">{{ paragraph }}</p>
        </div>

        <div class="editorial-panel">
          <span class="section-kicker">Så går det till</span>
          <h2 class="section-title">Från förfrågan till rena fönster</h2>
          <ul class="feature-list">
            <li>Fyll i bostadstyp, antal fönster och vad som ska putsas i offertformuläret.</li>
            <li>Du får en offert med fast pris efter RUT-avdrag – inget timpris.</li>
            <li>Vi bokar en tid som passar och tar med stege och allt material.</li>
            <li>RUT-avdraget dras direkt på fakturan, vi sköter kontakten med Skatteverket.</li>
          </ul>
        </div>
      </section>

      <section id="pris" class="editorial-panel area-price">
        <span class="section-kicker">Pris</span>
        <h2 class="section-title">Vad kostar fönsterputs {{ inArea }}?</h2>
        <p class="section-text">{{ area.priceNote }}</p>
        <PriceTable :rows="area.priceRows" :caption="'Pris för fönsterputs ' + inArea + ' med och utan RUT-avdrag'" />
        <p class="section-text q-mt-md">
          <router-link to="/pris" class="text-accent text-weight-bold">Se hela prislistan och vad som påverkar priset</router-link>
        </p>
      </section>

      <section v-if="area.districts.length > 1" class="editorial-panel">
        <span class="section-kicker">Delområden</span>
        <h2 class="section-title">Här putsar vi fönster {{ inArea }}</h2>
        <div class="mini-card-grid q-mt-lg area-districts">
          <article v-for="district in area.districts" :key="district.name" class="mini-card">
            <h3 class="mini-card__title">{{ district.name }}</h3>
            <p class="mini-card__text">{{ district.text }}</p>
          </article>
        </div>
      </section>

      <section class="editorial-panel editorial-panel--solid">
        <span class="section-kicker">Bra att veta</span>
        <h2 class="section-title">Att tänka på inför fönsterputs {{ inArea }}</h2>
        <p v-for="paragraph in area.tips" :key="paragraph" class="section-text">{{ paragraph }}</p>
      </section>

      <section class="section-grid section-grid--two">
        <div class="editorial-panel">
          <span class="section-kicker">Tjänster</span>
          <h2 class="section-title">Tjänster {{ inArea }}</h2>
          <ul class="area-link-list">
            <li v-for="service in relatedServices" :key="service.to">
              <router-link :to="service.to" class="text-accent text-weight-bold">{{ service.label }}</router-link>
            </li>
          </ul>
        </div>
        <div v-if="relatedGuides.length" class="editorial-panel">
          <span class="section-kicker">Guider</span>
          <h2 class="section-title">Läs mer innan du bokar</h2>
          <ul class="area-link-list">
            <li v-for="guide in relatedGuides" :key="guide.slug">
              <router-link :to="'/guide/' + guide.slug" class="text-accent text-weight-bold">{{ guide.h1 }}</router-link>
            </li>
          </ul>
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
          <p class="cta-band__lead">Fyll i offertformuläret så återkommer vi med ett fast pris efter RUT-avdrag.</p>
        </div>
        <q-btn unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
      </section>

      <section class="editorial-panel faq-shell">
        <span class="section-kicker">Vanliga frågor</span>
        <h2 class="section-title">Vanliga frågor om fönsterputs {{ inArea }}</h2>
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
import PriceTable from 'src/components/PriceTable.vue';
import { getAreaBySlug, getServiceBySlug } from 'src/data/seo';
import { getGuideBySlug } from 'src/data/guides';
import { areaLocative, heroImagesFor } from 'src/data/site-pages';

export default defineComponent({
  name: 'AreaComponent',
  components: { PriceTable },
  setup() {
    const route = useRoute();

    // Unknown slugs never reach this component: the route guard renders the
    // 404 page instead (see src/router/routes.ts).
    const area = computed(() => getAreaBySlug(route.params.area as string));

    // "i Kista" / "på Östermalm"
    const inArea = computed(() => (area.value ? areaLocative(area.value) : ''));

    const hero = computed(() => heroImagesFor(route.path));

    const relatedServices = computed(() => {
      const links = (area.value?.services ?? [])
        .map((slug) => getServiceBySlug(slug))
        .filter((service): service is NonNullable<typeof service> => !!service)
        .map((service) => ({ to: `/tjanst/${service.slug}`, label: service.bodyTitle }));
      if (area.value?.company) {
        links.push({ to: '/foretag', label: 'Fönsterputs för företag' });
      }
      return links;
    });

    const relatedGuides = computed(() =>
      (area.value?.guides ?? [])
        .map((slug) => getGuideBySlug(slug))
        .filter((guide): guide is NonNullable<typeof guide> => !!guide),
    );

    return {
      area,
      inArea,
      hero,
      relatedServices,
      relatedGuides,
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

.area-link-list {
  display: grid;
  gap: 0.6rem;
  margin: 1rem 0 0;
  padding-left: 1.1rem;
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
