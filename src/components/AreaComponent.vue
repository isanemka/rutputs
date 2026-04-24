<template>
  <q-page class="page-shell">
    <div v-if="area" class="page-stack">
      <section class="hero-shell area-hero">
        <picture class="hero-shell__media area-hero__media">
          <source media="(min-width: 600px)" :srcset="randomLandscapeImage" type="image/webp">
          <img class="hero-shell__image" :src="randomPortraitImage" :alt="'Fönsterputsning i ' + area.name">
        </picture>
        <div class="hero-shell__content">
          <span class="hero-kicker">{{ area.name }}</span>
          <h1 class="hero-title area-hero__title">Fönsterputsning i {{ area.name }} med lokalt fokus</h1>
          <p class="hero-lead">
            {{ area.content }}
          </p>
          <div class="hero-actions">
            <q-btn unelevated color="accent" text-color="black" label="Se vad det kostar" to="/pris" />
          </div>
        </div>
      </section>

      <section class="section-grid section-grid--two">
        <div class="editorial-panel editorial-panel--solid">
          <span class="section-kicker">Lokalt upplägg</span>
          <h2 class="section-title">En smidigare bokning när arbetet redan sker i området</h2>
          <p class="section-text">
            Fönsterputsning i {{ area.name }} passar villor, radhus, lägenheter och mindre fastigheter där rena fönster
            gör stor skillnad för ljusinsläpp och helhetsintryck. När du bokar hos Rutputs är det jag som kommer och putsar, och jag arbetar redan i området.
          </p>
          <p class="section-text">
            Jag hjälper kunder i {{ districtSummary }} och närliggande delar av området. Med RUT-avdraget kan du få ett tydligt pris
            från 499 kronor och skicka en offertförfrågan när det passar dig.
          </p>
        </div>

        <div class="editorial-panel">
          <span class="section-kicker">Så går det till</span>
          <h2 class="section-title">Från prisförfrågan till färdigt resultat</h2>
          <ul class="feature-list">
            <li>Fyll i uppgifterna på prissidan och se priset direkt.</li>
            <li>Skicka in förfrågan när upplägget känns rätt.</li>
            <li>Få återkoppling om bokning, tid och eventuella detaljer.</li>
            <li>Få arbetet utfört av någon som redan är verksam i {{ area.name }}.</li>
          </ul>
        </div>
      </section>

      <section class="editorial-panel">
        <span class="section-kicker">Delområden</span>
        <h2 class="section-title">Områden jag täcker i {{ area.name }}</h2>
        <p class="section-text">
          Jag arbetar återkommande i flera delar av {{ area.name }}, vilket gör det enkelt att boka både enstaka putsningar och återkommande hjälp.
        </p>
        <div class="mini-card-grid q-mt-lg area-districts">
          <article v-for="district in area.districts" :key="district" class="mini-card">
            <h3 class="mini-card__title">{{ district }}</h3>
            <p class="mini-card__text">Fönsterputsning för bostäder och mindre fastigheter i {{ district }} med tydlig prissättning och smidig bokning.</p>
          </article>
        </div>
      </section>

      <section class="cta-band">
        <div class="cta-band__text">
          <h2 class="cta-band__title">Vill du se priset för {{ area.name }} direkt?</h2>
          <p class="cta-band__lead">Prissidan ger dig en snabb väg vidare utan att du först behöver invänta manuell offert.</p>
        </div>
        <q-btn unelevated color="accent" text-color="black" label="Gå till prislistan" to="/pris" />
      </section>

      <section class="editorial-panel faq-shell">
        <span class="section-kicker">Vanliga frågor</span>
        <h2 class="section-title">Det här undrar kunder i {{ area.name }} oftast</h2>
        <q-list bordered separator>
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
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAreaBySlug } from 'src/data/seo';

export default defineComponent({
  name: 'AreaComponent',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const area = computed(() => {
      const slug = route.params.area as string;
      return getAreaBySlug(slug);
    });

    const districtSummary = computed(() => {
      if (!area.value) {
        return '';
      }

      return area.value.districts.join(', ');
    });

    watch(area, (val) => {
      if (!val) {
        router.replace('/404');
      }
    }, { immediate: true });

    const landscapeImages = [
      '/img/25050.webp',
      '/img/25051.webp',
      '/img/25052.webp',
      '/img/25053.webp',
      '/img/25054.webp',
      '/img/25055.webp'
    ];
    const portraitImages = [
      '/img/15050.webp',
      '/img/15051.webp',
      '/img/15052.webp',
      '/img/15053.webp'
    ];
    const randomLandscapeImage = ref('');
    const randomPortraitImage = ref('');
    onMounted(() => {
      randomLandscapeImage.value = landscapeImages[Math.floor(Math.random() * landscapeImages.length)];
      randomPortraitImage.value = portraitImages[Math.floor(Math.random() * portraitImages.length)];
    });

    return {
      area,
      districtSummary,
      randomLandscapeImage,
      randomPortraitImage,
    };
  },
  meta() {
    const slug = this.$route.params.area as string;
    const area = getAreaBySlug(slug);
    if (!area) {
      return {
        title: 'Sidan hittades inte – Rutputs',
        meta: {
          robots: { name: 'robots', content: 'noindex' }
        }
      };
    }
    return {
      title: area.title,
      meta: {
        description: {
          name: 'description',
          content: area.description
        },
        ogTitle: {
          property: 'og:title',
          content: area.title
        },
        ogDescription: {
          property: 'og:description',
          content: area.description
        },
        ogImage: {
          property: 'og:image',
          content: 'https://www.rutputs.nu/og-image.jpg'
        },
        ogUrl: {
          property: 'og:url',
          content: `https://www.rutputs.nu/omrade/${area.slug}`
        },
        twitterCard: {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        twitterTitle: {
          name: 'twitter:title',
          content: area.title
        },
        twitterDescription: {
          name: 'twitter:description',
          content: area.description
        },
        twitterImage: {
          name: 'twitter:image',
          content: 'https://www.rutputs.nu/og-image.jpg'
        }
      },
      script: {
        serviceSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `Fönsterputs i ${area.name}`,
            serviceType: 'Fönsterputsning',
            description: area.description,
            url: `https://www.rutputs.nu/omrade/${area.slug}`,
            provider: {
              '@type': 'LocalBusiness',
              name: 'Rutputs',
              url: 'https://www.rutputs.nu/'
            },
            areaServed: {
              '@type': 'City',
              name: area.name
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'SEK',
              price: '499',
              description: 'Från-pris efter RUT-avdrag'
            }
          })
        },
        faqSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: area.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
              }
            }))
          })
        }
      },
      link: {
        canonical: {
          rel: 'canonical',
          href: `https://www.rutputs.nu/omrade/${area.slug}`
        }
      }
    };
  }
});
</script>

<style scoped>
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
</style>
