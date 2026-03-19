<template>
  <q-page>
    <div v-if="area" class="row q-flex q-pa-md justify-center items-center text-center">
      <q-parallax>
        <template v-if="$q.screen.gt.sm" v-slot:media>
          <img :src="randomLandscapeImage" :alt="'Fönsterputsning i ' + area.name" style="opacity: 0.3;">
        </template>
        <template v-else v-slot:media>
          <img :src="randomPortraitImage" :alt="'Fönsterputsare i ' + area.name" style="opacity: 0.3;">
        </template>
        <div class="col-lg-6 col-md-8 col-xs-10">
          <h1 :class="[$q.screen.lt.sm ? 'text-h5 q-pt-xl' : 'text-h2', 'text-bold text-primary text-uppercase']">
            Fönsterputsning i {{ area.name }}
          </h1>
          <q-btn
            class="q-pa-md q-mt-md text-black"
            label="Se vad det kostar"
            color="accent"
            to="/pris"
          />
        </div>
      </q-parallax>

      <div class="row justify-center q-pt-md">
        <div class="col-xl-5 col-lg-6 col-md-8 col-xs-12">
          <q-card bordered class="text-container shadow">
            <q-card-section
              class="custom-line-height text-body1 text-primary text-justify q-py-xl q-px-xl"
              :style="textStyle"
            >
              <h2 class="text-h6 text-center text-accent q-mb-sm">Fönsterputs i {{ area.name }} med RUT-avdrag</h2>
              <hr class="text-primary">
              <p class="q-mb-md">{{ area.content }}</p>
              <p class="q-mb-md">
                Fönsterputsning i {{ area.name }} passar både villor, radhus, lägenheter och mindre fastigheter.
                När du bokar hos Rutputs får du hjälp av en lokal aktör som arbetar i norra Stockholm varje vecka,
                vilket gör det enklare att hitta tider som passar och att få ett noggrant resultat utan onödiga väntetider.
              </p>
              <p class="q-mb-none">
                Jag hjälper kunder i {{ districtSummary }} och närliggande områden. Med RUT-avdraget kan du få dina
                fönster skinande rena från 350 kronor. Fyll i det enkla formuläret för att se ditt pris direkt och
                skicka en offertförfrågan när det passar dig.
              </p>
            </q-card-section>
            <q-card-actions align="center" class="q-pb-lg">
              <q-btn
                label="Se vad det kostar"
                color="accent"
                class="text-black q-pa-sm"
                to="/pris"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div class="row justify-center q-pt-md q-gutter-md full-width">
        <div class="col-xl-5 col-lg-6 col-md-8 col-xs-12">
          <q-card bordered class="text-container shadow">
            <q-card-section class="q-px-xl q-py-lg text-primary">
              <h2 class="text-h6 text-accent q-mb-md">Områden vi täcker i {{ area.name }}</h2>
              <p class="text-body1 q-mb-lg" :style="textStyle">
                Vi arbetar återkommande i flera delar av {{ area.name }}, vilket gör det enkelt att boka både enstaka
                putsningar och mer återkommande hjälp. Det är särskilt uppskattat av kunder som vill ha rena fönster
                inför vår, höst, försäljning eller när hemmet behöver släppa in mer ljus.
              </p>
              <div class="row q-col-gutter-md">
                <div v-for="district in area.districts" :key="district" class="col-sm-6 col-xs-12">
                  <q-card flat bordered class="district-card full-height">
                    <q-card-section>
                      <h3 class="text-subtitle1 text-bold text-primary q-my-none">{{ district }}</h3>
                      <p class="q-mt-sm q-mb-none text-body2 text-primary">
                        Fönsterputsning för bostäder och mindre fastigheter i {{ district }} med smidig bokning och
                        tydlig prissättning.
                      </p>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-xl-5 col-lg-6 col-md-8 col-xs-12">
          <q-card bordered class="text-container shadow">
            <q-card-section class="q-px-xl q-py-lg text-primary">
              <h2 class="text-h6 text-accent q-mb-md">Så fungerar bokningen i {{ area.name }}</h2>
              <p class="text-body1 q-mb-md" :style="textStyle">
                Börja med att gå till prissidan och fylla i de uppgifter som behövs för att räkna ut priset.
                När du skickat din förfrågan går jag igenom informationen och återkommer för att bekräfta bokning,
                tid och eventuella detaljer kring bostaden.
              </p>
              <p class="text-body1 q-mb-none" :style="textStyle">
                För många kunder i {{ area.name }} är enkelheten avgörande: du får ett tydligt upplägg, ett pris som
                börjar från 350 kr efter RUT-avdrag och hjälp av någon som redan arbetar i området. Det minskar
                administrationen och gör processen snabbare från första kontakt till färdigt resultat.
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row justify-center q-pt-md q-pb-xl full-width">
        <div class="col-xl-10 col-lg-10 col-md-10 col-xs-12">
          <q-card bordered class="text-container shadow">
            <q-card-section class="q-px-xl q-py-lg text-primary">
              <h2 class="text-h6 text-accent q-mb-md">Vanliga frågor om fönsterputs i {{ area.name }}</h2>
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
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
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
              price: '350',
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
  },
  computed: {
    textStyle() {
      if (this.$q.screen.lt.sm) {
        return {
          'font-size': '1rem',
          'line-height': '1.6',
          'padding': '1rem'
        };
      }
      return {
        'font-size': '1.2rem'
      };
    }
  }
});
</script>

<style scoped>
.district-card {
  border-radius: 12px;
}
</style>
