<template>
  <q-page>
    <div class="row q-flex q-pa-md justify-center items-center text-center">
      <section ref="heroSection" class="hero-section col-12">
        <picture class="hero-media" :style="heroMediaStyle">
          <source media="(min-width: 600px)" :srcset="randomLandscapeImage" type="image/webp">
          <img
            class="hero-image"
            :src="randomPortraitImage"
            alt="Professionell fönsterputsning i norra Stockholm"
            fetchpriority="high"
            decoding="async"
          >
        </picture>

        <div class="hero-content col-lg-6 col-md-8 col-xs-10">
          <h1 :class="[$q.screen.lt.sm ? 'text-h5 q-pt-xl' : 'text-h2', 'text-bold text-primary text-uppercase']">
            Din rutputsare i norra Stockholm
          </h1>

          <q-btn
            class="q-pa-md q-mt-md text-black"
            label="Se vad det kostar"
            color="accent"
            @click="goToPriceList"
          />
        </div>
      </section>

        <!-- Card section -->
        <div class="row justify-center q-pt-md">
          <div class="col-xl-5 col-lg-6 col-md-8 col-xs-12">
            <q-card bordered class="text-container shadow">
              <q-card-section
                class="custom-line-height text-body1 text-primary text-justify q-py-xl q-px-xl"
                :style="textStyle"
                >
                <h2 class="text-h6 text-center text-accent q-mb-sm">Fönsterputs i norra Stockholm med tydligt pris</h2>
                <hr class="text-primary">
                <p class="q-mb-md">
                  Rutputs erbjuder professionell fönsterputsning i norra Stockholm för dig som vill ha rena fönster
                  utan krångel. Med RUT-avdrag börjar priset från 350 kr, och via vår prissida kan du snabbt se vad
                  jobbet kostar innan du skickar din förfrågan.
                </p>
                <p class="q-mb-md">
                  Jag utgår från Järfälla och arbetar löpande i flera närliggande områden, vilket gör det enklare att
                  boka tider som passar och att hålla en jämn kvalitet i varje uppdrag. Tjänsten passar både villor,
                  radhus, lägenheter och mindre fastigheter där rena fönster förbättrar både ljusinsläpp och helhetsintryck.
                </p>
                <p class="q-mb-none">
                  Oavsett om du behöver hjälp inför våren, hösten, en försäljning eller bara vill ha återkommande
                  fönsterputsning får du ett tydligt upplägg med snabb återkoppling. Några av områdena jag täcker är
                  <span v-for="(a, i) in areaLinks" :key="a.slug">
                    <router-link :to="'/omrade/' + a.slug" class="text-accent">{{ a.name }}</router-link><span v-if="i < areaLinks.length - 1">, </span>
                  </span>.
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="row justify-center q-pt-md q-gutter-md full-width">
          <div class="col-xl-5 col-lg-6 col-md-8 col-xs-12">
            <q-card bordered class="text-container shadow full-height">
              <q-card-section class="q-px-xl q-py-lg text-primary">
                <h2 class="text-h6 text-accent q-mb-md">Varför välja Rutputs?</h2>
                <p class="text-body1 q-mb-md" :style="textStyle">
                  För många hushåll handlar fönsterputs inte bara om utseende utan om att få mer ljus in i hemmet och
                  slippa lägga tid på ett tidskrävande arbete. Med Rutputs får du hjälp av en lokal fönsterputsare som
                  arbetar i norra Stockholm och som anpassar upplägget efter bostadens storlek och dina önskemål.
                </p>
                <p class="text-body1 q-mb-none" :style="textStyle">
                  Det gör tjänsten till ett bra val för både enstaka bokningar och återkommande hjälp. Priset är tydligt,
                  RUT-avdraget gör stor skillnad för privatpersoner och hela bokningsflödet är byggt för att vara enkelt
                  från första klick till bekräftad tid.
                </p>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-xl-5 col-lg-6 col-md-8 col-xs-12">
            <q-card bordered class="text-container shadow full-height">
              <q-card-section class="q-px-xl q-py-lg text-primary">
                <h2 class="text-h6 text-accent q-mb-md">Så fungerar det</h2>
                <ol class="text-body1 q-pl-lg q-mb-none" :style="textStyle">
                  <li class="q-mb-sm">Gå till prissidan och fyll i uppgifterna om din bostad och dina fönster.</li>
                  <li class="q-mb-sm">Se ditt pris direkt och skicka in din offertförfrågan online.</li>
                  <li>Få återkoppling för att bekräfta tid, detaljer och nästa steg för bokningen.</li>
                </ol>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="row justify-center q-pt-md full-width">
          <div class="col-xl-10 col-lg-10 col-md-10 col-xs-12">
            <q-card bordered class="text-container shadow">
              <q-card-section class="q-px-xl q-py-lg text-primary">
                <h2 class="text-h6 text-accent q-mb-md">Områden vi täcker</h2>
                <p class="text-body1 q-mb-lg" :style="textStyle">
                  Rutputs fokuserar på norra Stockholm och närliggande områden där efterfrågan på lokal och pålitlig
                  fönsterputsning är hög. Genom att ha tydliga områdessidor blir det också enklare för dig att se om vi
                  arbetar i just ditt område och hur tjänsten passar där du bor.
                </p>
                <div class="row q-col-gutter-md">
                  <div v-for="item in areaLinks" :key="item.slug" class="col-md-3 col-sm-4 col-xs-6">
                    <q-card flat bordered class="area-link-card full-height">
                      <q-card-section class="text-center">
                        <h3 class="text-subtitle1 text-bold text-primary q-my-none">{{ item.name }}</h3>
                        <router-link :to="'/omrade/' + item.slug" class="text-accent">Läs om fönsterputs i {{ item.name }}</router-link>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="row justify-center q-pt-md q-pb-xl full-width">
          <div class="col-xl-10 col-lg-10 col-md-10 col-xs-12">
            <q-card bordered class="text-container shadow">
              <q-card-section class="q-px-xl q-py-lg text-primary">
                <h2 class="text-h6 text-accent q-mb-md">Vanliga frågor</h2>
                <q-list bordered separator>
                  <q-expansion-item
                    v-for="item in homeFaqs"
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
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { areas } from 'src/data/areas';
import { homeSeo } from 'src/data/seo';

const homeFaqs = homeSeo.faq ?? [];

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

export default defineComponent({
  name: 'LandingComponent',
  meta: {
    title: homeSeo.title,
    meta: {
      description: {
        name: 'description',
        content: homeSeo.description
      },
      ogTitle: {
        property: 'og:title',
        content: homeSeo.title
      },
      ogDescription: {
        property: 'og:description',
        content: homeSeo.description
      },
      ogImage: {
        property: 'og:image',
        content: 'https://www.rutputs.nu/og-image.jpg'
      },
      ogUrl: {
        property: 'og:url',
        content: 'https://www.rutputs.nu/'
      },
      twitterCard: {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      twitterTitle: {
        name: 'twitter:title',
        content: homeSeo.title
      },
      twitterDescription: {
        name: 'twitter:description',
        content: homeSeo.description
      },
      twitterImage: {
        name: 'twitter:image',
        content: 'https://www.rutputs.nu/og-image.jpg'
      }
    },
    link: {
      canonical: {
        rel: 'canonical',
        href: 'https://www.rutputs.nu/'
      }
    },
    script: {
      faqSchema: {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': homeFaqs.map((item) => ({
            '@type': 'Question',
            'name': item.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.answer
            }
          }))
        })
      }
    }
  },
  setup() {
    const heroSection = ref<HTMLElement | null>(null);
    const parallaxOffset = ref(0);
    const randomLandscapeImage = ref(landscapeImages[0]);
    const randomPortraitImage = ref(portraitImages[0]);
    let animationFrameId = 0;

    const pickRandomImage = (images: string[]) => images[Math.floor(Math.random() * images.length)];

    const updateParallax = () => {
      if (typeof window === 'undefined' || !heroSection.value) {
        return;
      }

      const rect = heroSection.value.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom <= 0 || rect.top >= viewportHeight) {
        return;
      }

      const scrollProgress = Math.min(Math.max(-rect.top, 0), 200);
      parallaxOffset.value = Math.min(scrollProgress * 0.12, 24);
    };

    const scheduleParallaxUpdate = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = 0;
        updateParallax();
      });
    };

    onMounted(() => {
      randomLandscapeImage.value = pickRandomImage(landscapeImages);
      randomPortraitImage.value = pickRandomImage(portraitImages);
      updateParallax();

      window.addEventListener('scroll', scheduleParallaxUpdate, { passive: true });
      window.addEventListener('resize', scheduleParallaxUpdate, { passive: true });
    });

    onBeforeUnmount(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', scheduleParallaxUpdate);
        window.removeEventListener('resize', scheduleParallaxUpdate);
      }

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    });

    const heroMediaStyle = computed(() => ({
      transform: `translate3d(0, ${parallaxOffset.value}px, 0) scale(1.08)`,
    }));

    const areaLinks = areas;
    return {
      areaLinks,
      homeFaqs,
      heroMediaStyle,
      heroSection,
      randomLandscapeImage,
      randomPortraitImage
    };
  },
  methods: {
    // Method to navigate to price list page
    goToPriceList() {
      this.$router.push('/pris');
    }
  },
  computed: {
    // Computed property to dynamically adjust text style based on screen size
    textStyle() {
      if (this.$q.screen.lt.sm) {
        return {
          'font-size': '1rem',
          'line-height': '1.6',
          'padding': '1rem'
        };
      } else {
        return {
          'font-size': '1.2rem'
        };
      }
    }
  }
});
</script>
<style>
.hero-section {
  position: relative;
  width: 100%;
  max-width: 1200px;
  min-height: clamp(360px, 62vw, 540px);
  overflow: hidden;
  border-radius: 16px;
}

.hero-media {
  position: absolute;
  inset: 0;
  will-change: transform;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  transform: scale(1.01);
}

.hero-content {
  position: relative;
  z-index: 1;
  min-height: clamp(360px, 62vw, 540px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
}

.area-link-card {
  border-radius: 12px;
}
</style>
