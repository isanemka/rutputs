<template>
  <q-page class="page-shell">
    <div v-if="service" class="page-stack">
      <nav class="breadcrumbs" aria-label="Brödsmulor">
        <router-link to="/">Start</router-link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{{ service.name }}</span>
      </nav>

      <section class="hero-shell area-hero">
        <picture class="hero-shell__media area-hero__media">
          <source media="(min-width: 600px)" :srcset="hero.landscape" type="image/webp">
          <img class="hero-shell__image" :src="hero.portrait" :alt="service.bodyTitle" fetchpriority="high">
        </picture>
        <div class="hero-shell__content">
          <span class="hero-kicker">Tjänst</span>
          <h1 class="hero-title area-hero__title">{{ service.bodyTitle }}</h1>
          <p class="hero-lead">{{ service.bodyIntro }}</p>
          <div class="hero-actions">
            <template v-if="service.contactOnly">
              <q-btn unelevated color="accent" text-color="black" label="Ring direkt" type="a" href="tel:+46734644604" />
              <q-btn outline color="white" label="Skicka mejl" type="a" href="mailto:kontakt@rutputs.nu" />
            </template>
            <template v-else>
              <q-btn unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
              <q-btn outline color="white" label="Ring direkt" type="a" href="tel:+46734644604" />
            </template>
          </div>
        </div>
      </section>

      <section class="editorial-panel editorial-panel--solid">
        <span class="section-kicker">Det här ingår</span>
        <h2 class="section-title">Fördelar med tjänsten</h2>
        <ul class="feature-list">
          <li v-for="benefit in service.benefits" :key="benefit">{{ benefit }}</li>
        </ul>
        <div class="hero-actions q-pt-md">
          <q-btn v-if="!service.contactOnly" unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
          <q-btn v-else unelevated color="accent" text-color="black" label="Ring direkt" type="a" href="tel:+46734644604" />
        </div>
      </section>

      <section v-if="service.priceRows?.length" id="pris" class="editorial-panel">
        <span class="section-kicker">Pris</span>
        <h2 class="section-title">{{ service.priceHeading || 'Vad kostar det?' }}</h2>
        <p v-if="service.priceNote" class="section-text">{{ service.priceNote }}</p>
        <PriceTable :rows="service.priceRows" :caption="service.bodyTitle + ' – pris med och utan RUT-avdrag'" />
        <p class="section-text q-mt-md">
          <router-link to="/pris" class="text-accent text-weight-bold">Se hela prislistan och vad som påverkar priset</router-link>
        </p>
      </section>

      <section
        v-for="(section, index) in service.sections ?? []"
        :key="section.heading"
        class="editorial-panel"
        :class="{ 'editorial-panel--solid': index % 2 === 1 }"
      >
        <h2 class="section-title">{{ section.heading }}</h2>
        <p v-for="paragraph in section.paragraphs" :key="paragraph" class="section-text">{{ paragraph }}</p>
      </section>

      <section class="cta-band">
        <div class="cta-band__text">
          <h2 class="cta-band__title">{{ service.contactOnly ? 'Intresserad av abonnemang?' : 'Vill du ha en offert?' }}</h2>
          <p class="cta-band__lead">{{ service.contactOnly ? 'Ring eller mejla så tar vi fram ett upplägg som passar dig.' : 'Fyll i offertformuläret så återkommer vi med ett pris efter RUT-avdrag.' }}</p>
        </div>
        <div v-if="service.contactOnly" class="hero-actions">
          <q-btn unelevated color="accent" text-color="black" label="Ring direkt" type="a" href="tel:+46734644604" />
          <q-btn outline color="white" label="Skicka mejl" type="a" href="mailto:kontakt@rutputs.nu" />
        </div>
        <q-btn v-else unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
      </section>

      <section class="editorial-panel faq-shell">
        <span class="section-kicker">Vanliga frågor</span>
        <h2 class="section-title">Frågor och svar</h2>
        <q-list bordered separator role="none">
          <q-expansion-item
            v-for="item in service.faq"
            :key="item.question"
            :label="item.question"
            expand-separator
            header-class="text-primary text-weight-medium"
          >
            <q-card flat>
              <q-card-section class="text-body2 text-primary">
                {{ item.answer }}
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

      <section v-if="relatedGuides.length || relatedAreas.length" class="section-grid section-grid--two">
        <div v-if="relatedGuides.length" class="editorial-panel">
          <span class="section-kicker">Guider</span>
          <h2 class="section-title">Läs mer</h2>
          <ul class="service-link-list">
            <li v-for="guide in relatedGuides" :key="guide.slug">
              <router-link :to="'/guide/' + guide.slug" class="text-accent text-weight-bold">{{ guide.h1 }}</router-link>
            </li>
            <li v-if="service.company">
              <router-link to="/foretag" class="text-accent text-weight-bold">Fönsterputs för företag</router-link>
            </li>
          </ul>
        </div>
        <div v-if="relatedAreas.length" class="editorial-panel">
          <span class="section-kicker">Områden</span>
          <h2 class="section-title">Här putsar vi bland annat</h2>
          <div class="nearby-areas-grid">
            <router-link
              v-for="area in relatedAreas"
              :key="area.slug"
              :to="'/omrade/' + area.slug"
              class="area-chip"
            >
              {{ area.name }}
            </router-link>
          </div>
        </div>
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
import { heroImagesFor } from 'src/data/site-pages';

export default defineComponent({
  name: 'ServicePageComponent',
  components: { PriceTable },
  setup() {
    const route = useRoute();

    // Unknown slugs never reach this component: the route guard renders the
    // 404 page instead (see src/router/routes.ts).
    const service = computed(() => getServiceBySlug(route.params.service as string));

    const hero = computed(() => heroImagesFor(route.path));

    const relatedGuides = computed(() =>
      (service.value?.guides ?? [])
        .map((slug) => getGuideBySlug(slug))
        .filter((guide): guide is NonNullable<typeof guide> => !!guide),
    );

    const relatedAreas = computed(() =>
      (service.value?.areas ?? [])
        .map((slug) => getAreaBySlug(slug))
        .filter((area): area is NonNullable<typeof area> => !!area),
    );

    return {
      service,
      hero,
      relatedGuides,
      relatedAreas,
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

.service-link-list {
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
}

.area-chip:hover,
.area-chip:focus-visible {
  background-color: var(--q-accent, #f4c542);
  outline: 2px solid var(--q-accent, #f4c542);
  outline-offset: 2px;
}
</style>
