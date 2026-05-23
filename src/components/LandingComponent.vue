<template>
  <q-page class="page-shell">
    <div class="page-stack">
      <section ref="heroSection" class="hero-shell">
        <picture class="hero-shell__media" :style="heroMediaStyle">
          <source media="(min-width: 600px)" :srcset="randomLandscapeImage" type="image/webp">
          <img
            class="hero-shell__image"
            :src="randomPortraitImage"
            alt="Professionell fönsterputsning i Stockholm"
            fetchpriority="high"
            decoding="async"
          >
        </picture>

        <div class="hero-shell__content">
          <span class="hero-kicker">Lokal fönsterputsare</span>
          <h1 class="hero-title">Professionell fönsterputs i Stockholm</h1>
          <p class="hero-lead">
            Jag hjälper hushåll och företag i Stockholm med fönsterputsning. Berätta lite om dina fönster i formuläret så återkommer jag med en personlig offert.
            När du bokar hos Rutputs är det också jag som kommer och putsar, oavsett om du vill ha en enstaka puts eller ett återkommande upplägg.
          </p>
          <div class="hero-actions">
            <q-btn class="text-black" label="Begär offert" color="accent" unelevated @click="goToPriceList" />
            <q-btn outline color="white" label="Se områden jag täcker" :to="{ hash: '#areas' }" />
          </div>
          <div class="hero-metrics">
            <div class="hero-metric">
              <span class="hero-metric__value">Från 499 kr</span>
              <span class="hero-metric__label">Efter RUT-avdrag</span>
            </div>
            <div class="hero-metric">
              <span class="hero-metric__value">Kostnadsfri offert</span>
              <span class="hero-metric__label">Via formuläret</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section-grid section-grid--two">
        <div class="editorial-panel editorial-panel--solid">
          <span class="section-kicker">Tydligt upplägg</span>
          <h2 class="section-title">Fönsterputs i Stockholm utan onödigt krångel</h2>
          <p class="section-text">
            Jag erbjuder professionell fönsterputsning för dig som vill ha rena fönster utan att jaga priser,
            ringa runt eller vänta på otydliga offerter. Du skickar in en enkel förfrågan och får en personlig offert och snabb återkoppling direkt från mig.
          </p>
          <p class="section-text">
            Putsningar utförs i större delen av Stockholm och jag kan erbjuda snabbare bokning och mer flexibla upplägg än större aktörer, samtidigt som jag
            håller kvaliteten jämn och ger dig ett mer personligt upplägg. För dig som vill slippa tänka på när det är dags igen kan jag också lägga upp abonnemang för återkommande puts.
          </p>
        </div>

        <div class="editorial-panel">
          <span class="section-kicker">Därför fungerar det</span>
          <h2 class="section-title">Byggt för riktiga hem och riktiga bokningar</h2>
          <ul class="feature-list">
            <li>Personlig offert utifrån dina fönster.</li>
            <li>Passar villor, radhus, lägenheter och andra fastigheter.</li>
            <li>Direkt kontakt med personen som också kommer och putsar.</li>
            <li>Möjlighet till abonnemang för dig som vill ha återkommande puts.</li>
            <li>Smidig väg från första klick till bekräftad tid.</li>
          </ul>
        </div>
      </section>

      <section class="editorial-panel editorial-panel--solid">
        <span class="section-kicker">Så går det till</span>
        <h2 class="section-title">Tre enkla steg till skinande rena fönster</h2>
        <div class="mini-card-grid">
          <article class="mini-card">
            <h3 class="mini-card__title">1. Välj bostad</h3>
            <p class="mini-card__text">Fyll i vad du bor i och vilka typer av fönster som ska putsas.</p>
          </article>
          <article class="mini-card">
            <h3 class="mini-card__title">2. Beskriv dina fönster</h3>
            <p class="mini-card__text">Ange antal fönster, vilka sidor du vill ha putsade och om de har spröjs.</p>
          </article>
          <article class="mini-card">
            <h3 class="mini-card__title">3. Skicka förfrågan</h3>
            <p class="mini-card__text">Skicka in uppgifterna så återkommer jag med en offert och bekräftar tid och detaljer.</p>
          </article>
          <article class="mini-card">
            <h3 class="mini-card__title">4. Få jobbet gjort</h3>
            <p class="mini-card__text">Jag kommer själv och putsar med fokus på resultat, ljusinsläpp och ett rent helhetsintryck.</p>
          </article>
        </div>
      </section>

      <section class="section-grid section-grid--two">
        <div class="editorial-panel editorial-panel--solid">
          <span class="section-kicker">Abonnemang</span>
          <h2 class="section-title">Återkommande fönsterputs för dig som vill slippa boka om varje gång</h2>
          <p class="section-text">
            För många hushåll passar abonnemang bättre än enstaka bokningar. Då får du ett löpande upplägg av mig
            som anpassas efter bostad, säsong och hur ofta du vill ha putsat, utan att du behöver hålla reda på när det är dags igen.
          </p>
          <p class="section-text">
            Det fungerar bra för dig som vill ha rena fönster året om, jämn kvalitet över tid och samma person som lär sig hur du vill ha det.
          </p>
          <div class="hero-actions q-pt-sm">
            <q-btn outline color="primary" label="Läs mer om abonnemang" to="/tjanst/abonnemang-fonsterputs" />
          </div>
        </div>

        <div class="editorial-panel">
          <span class="section-kicker">Det här passar om</span>
          <h2 class="section-title">Ett upplägg som gör återkommande puts enklare</h2>
          <ul class="feature-list">
            <li>Du vill ha fasta eller flexibla intervaller utan att boka om varje gång.</li>
            <li>Du vill ha ett upplägg som passar bostad, ljusinsläpp och säsong.</li>
            <li>Du föredrar att boka direkt med mig och få samma person på plats varje gång.</li>
            <li>Du vill kunna börja med en vanlig puts och sedan gå över till abonnemang.</li>
          </ul>
          <div class="hero-actions q-pt-sm">
            <q-btn unelevated color="accent" text-color="black" label="Ta kontakt" :to="{ hash: '#kontakt' }" />
          </div>
        </div>
      </section>

      <section class="editorial-panel reviews-shell">
        <span class="section-kicker">Kundomdömen</span>
        <h2 class="section-title">Omdömen från kunder som bokat fönsterputs i Stockholm</h2>
        <p class="section-text">
          Riktiga omdömen från kunder som bokat fönsterputs i Stockholm. Vill du läsa fler eller lämna ett eget omdöme hittar du Rutputs på Google.
        </p>
        <div class="review-grid q-mt-lg">
          <article v-for="review in reviewsData.reviews" :key="review.author + review.date" class="review-card">
            <div class="review-card__stars" role="img" :aria-label="review.rating + ' av 5 stjärnor'">
              <span v-for="n in review.rating" :key="n" aria-hidden="true">★</span>
            </div>
            <p class="review-card__text">&ldquo;{{ review.text }}&rdquo;</p>
            <p class="review-card__meta">
              <strong>{{ review.author }}</strong>
              <span v-if="review.area"> &middot; {{ review.area }}</span>
            </p>
          </article>
        </div>
        <div class="hero-actions q-pt-md">
          <a :href="reviewsData.googleBusinessUrl" target="_blank" rel="noopener" class="text-accent text-weight-bold">
            Läs alla recensioner på Google →
          </a>
        </div>
      </section>

      <section class="neighbor-offer">
        <div class="neighbor-offer__badge">Erbjudande</div>
        <div class="neighbor-offer__content">
          <h2 class="section-title">Boka med din granne – båda får rabatt</h2>
          <p class="section-text">
            Bor du nära någon som också vill ha rena fönster? När ni bokar samma dag i samma område får ni båda
            rabatt på er bokning. Ni delar på resvägen, jag kan jobba mer effektivt och rabatten landar direkt på era priser.
          </p>
          <ul class="feature-list">
            <li>Båda hushållen får rabatt på sin bokning.</li>
            <li>Jag planerar samma dag i samma område, så det blir smidigt för alla.</li>
            <li>Funkar för villor, radhus, lägenheter och andra fastigheter.</li>
            <li>Skriv bara i förfrågan att ni vill boka tillsammans, så ordnar jag resten.</li>
          </ul>
          <div class="hero-actions q-pt-sm">
            <q-btn unelevated color="accent" text-color="black" label="Begär offert med granne" @click="goToPriceList" />
          </div>
        </div>
      </section>

      <section id="areas" class="editorial-panel">
        <span class="section-kicker">Områden</span>
        <h2 class="section-title">Jag täcker områden där närhet faktiskt gör skillnad</h2>
        <p class="section-text">
          Jag arbetar i stora delar av Stockholm med extra stark närvaro i norra Stockholm, där jag kan erbjuda kortare restider,
          snabbare bokning och ett smidigare upplägg för återkommande kunder. Välj din ort för att läsa mer om hur tjänsten passar där du bor.
        </p>
        <div class="area-link-grid q-mt-lg">
          <router-link
            v-for="item in areaLinks"
            :key="item.slug"
            :to="'/omrade/' + item.slug"
            class="area-link text-accent text-weight-bold"
          >
            {{ item.name }}
          </router-link>
        </div>
        <p class="section-text" style="margin-top: 2rem">
          Bor du i ett annat område? Skicka in en förfrågan ändå så ser jag om jag kan hjälpa dig.
        </p>
      </section>

      <section class="cta-band">
        <div class="cta-band__text">
          <h2 class="cta-band__title">Vill du ha en offert eller anmäla intresse för abonnemang?</h2>
          <p class="cta-band__lead">Offertformuläret är byggt för att vara snabbt, begripligt och enkelt att fylla i oavsett om du sitter på mobil eller dator. Om du är intresserad av återkommande fönsterputs kan du skriva det i din förfrågan så återkommer jag med ett passande upplägg.</p>
        </div>
        <q-btn unelevated color="accent" text-color="black" label="Begär offert" @click="goToPriceList" />
      </section>

      <section class="editorial-panel faq-shell">
        <span class="section-kicker">Vanliga frågor</span>
        <h2 class="section-title">Det här brukar kunder vilja veta först</h2>
        <q-list bordered separator role="none">
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
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { areas } from 'src/data/areas';
import { homeSeo } from 'src/data/seo';
import { reviewsData } from 'src/data/reviews';

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
      },
      reviewSchema: {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': 'https://www.rutputs.nu/',
          name: 'Rutputs',
          url: 'https://www.rutputs.nu/',
          image: 'https://www.rutputs.nu/og-image.jpg',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: reviewsData.aggregateRating.toFixed(1),
            reviewCount: reviewsData.reviewCount,
            bestRating: '5',
            worstRating: '1'
          },
          review: reviewsData.reviews.map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.author },
            datePublished: r.date,
            reviewBody: r.text,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: String(r.rating),
              bestRating: '5',
              worstRating: '1'
            }
          }))
        })
      },
      organizationSchema: {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Rutputs',
          url: 'https://www.rutputs.nu/',
          logo: 'https://www.rutputs.nu/icons/main_logo.png',
          telephone: '+46734644604'
        })
      },
      breadcrumbSchema: {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [{
            '@type': 'ListItem',
            position: 1,
            name: 'Start',
            item: 'https://www.rutputs.nu/'
          }]
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
      // Defer portrait randomization until after LCP is measured.
      // The prerendered src="/img/15050.webp" is preloaded in index.html,
      // so it loads immediately. Swapping before LCP fires would waste that
      // preload and delay the LCP metric.
      const randomizePortrait = () => {
        randomPortraitImage.value = pickRandomImage(portraitImages);
      };
      if ('requestIdleCallback' in window) {
        requestIdleCallback(randomizePortrait, { timeout: 5000 });
      } else {
        setTimeout(randomizePortrait, 3000);
      }
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
      reviewsData,
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
  }
});
</script>
<style>
.hero-shell__media {
  will-change: transform;
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 1023px) {
  .review-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599px) {
  .review-grid {
    grid-template-columns: 1fr;
  }
}

.review-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.review-card__stars {
  color: #f4c542;
  font-size: 1rem;
  letter-spacing: 2px;
}

.review-card__text {
  font-style: italic;
  margin: 0;
  line-height: 1.5;
}

.review-card__meta {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.85;
}
</style>
