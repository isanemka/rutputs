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
          <span class="hero-kicker">Lokala fönsterputsare</span>
          <h1 class="hero-title">Professionell fönsterputs i Stockholm</h1>
          <p class="hero-lead">
            Vi hjälper hushåll och företag i Stockholm med fönsterputsning. Berätta lite om dina fönster i formuläret så återkommer vi med en personlig offert.
            Vi tar hand om både enstaka putsningar och återkommande upplägg, med erfarna fönsterputsare som redan arbetar i ditt område.
          </p>
          <div class="hero-actions">
            <q-btn class="text-black" label="Begär offert" color="accent" unelevated @click="goToPriceList" />
            <q-btn outline color="white" label="Se områden vi täcker" :to="{ hash: '#areas' }" />
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
            Vi erbjuder professionell fönsterputsning för dig som vill ha rena fönster utan att jaga priser,
            ringa runt eller vänta på otydliga offerter. Du skickar in en enkel förfrågan och får en personlig offert och snabb återkoppling direkt från oss.
          </p>
          <p class="section-text">
            Putsningar utförs i större delen av Stockholm och vi kan erbjuda snabbare bokning och mer flexibla upplägg än större aktörer, samtidigt som vi
            håller kvaliteten jämn och ger dig ett mer personligt upplägg. För dig som vill slippa tänka på när det är dags igen kan vi också lägga upp abonnemang för återkommande puts.
          </p>
        </div>

        <div class="editorial-panel">
          <span class="section-kicker">Därför fungerar det</span>
          <h2 class="section-title">Byggt för riktiga hem och riktiga bokningar</h2>
          <ul class="feature-list">
            <li>Personlig offert utifrån dina fönster.</li>
            <li>Passar villor, radhus, lägenheter och andra fastigheter.</li>
            <li>Direkt kontakt med oss som utför arbetet.</li>
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
            <p class="mini-card__text">Skicka in uppgifterna så återkommer vi med en offert och bekräftar tid och detaljer.</p>
          </article>
          <article class="mini-card">
            <h3 class="mini-card__title">4. Få jobbet gjort</h3>
            <p class="mini-card__text">Vi kommer och putsar med fokus på resultat, ljusinsläpp och ett rent helhetsintryck.</p>
          </article>
        </div>
      </section>

      <section class="section-grid section-grid--two">
        <div class="editorial-panel editorial-panel--solid">
          <span class="section-kicker">Abonnemang</span>
          <h2 class="section-title">Återkommande fönsterputs för dig som vill slippa boka om varje gång</h2>
          <p class="section-text">
            För många hushåll passar abonnemang bättre än enstaka bokningar. Då får du ett löpande upplägg av oss
            som anpassas efter bostad, säsong och hur ofta du vill ha putsat, utan att du behöver hålla reda på när det är dags igen.
          </p>
          <p class="section-text">
            Det fungerar bra för dig som vill ha rena fönster året om, jämn kvalitet över tid och ett upplägg som är anpassat efter hur du vill ha det.
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
            <li>Du föredrar att boka direkt med oss och få samma noggranna upplägg varje gång.</li>
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
        <div class="review-carousel q-mt-lg" role="group" aria-roledescription="karusell" aria-label="Kundomdömen">
          <div
            ref="reviewTrack"
            class="review-carousel__track"
            tabindex="0"
            @scroll.passive="scheduleReviewMeasure"
          >
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

          <div v-show="reviewsOverflow" class="review-carousel__controls">
            <button
              type="button"
              class="review-carousel__arrow"
              :disabled="!canScrollReviewsPrev"
              aria-label="Visa föregående omdöme"
              @click="scrollReviews(-1)"
            >
              &#8249;
            </button>
            <div class="review-carousel__dots">
              <button
                v-for="index in reviewPageCount"
                :key="'dot-' + index"
                type="button"
                class="review-carousel__dot"
                :class="{ 'review-carousel__dot--active': index - 1 === activeReviewIndex }"
                :aria-label="'Gå till position ' + index + ' av ' + reviewPageCount"
                :aria-current="index - 1 === activeReviewIndex ? 'true' : undefined"
                @click="goToReview(index - 1)"
              />
            </div>
            <button
              type="button"
              class="review-carousel__arrow"
              :disabled="!canScrollReviewsNext"
              aria-label="Visa nästa omdöme"
              @click="scrollReviews(1)"
            >
              &#8250;
            </button>
          </div>
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
            rabatt på er bokning. Ni delar på resvägen, vi kan jobba mer effektivt och rabatten landar direkt på era priser.
          </p>
          <ul class="feature-list">
            <li>Båda hushållen får rabatt på sin bokning.</li>
            <li>Vi planerar samma dag i samma område, så det blir smidigt för alla.</li>
            <li>Funkar för villor, radhus, lägenheter och andra fastigheter.</li>
            <li>Skriv bara i förfrågan att ni vill boka tillsammans, så ordnar vi resten.</li>
          </ul>
          <div class="hero-actions q-pt-sm">
            <q-btn unelevated color="accent" text-color="black" label="Begär offert med granne" @click="goToPriceList" />
          </div>
        </div>
      </section>

      <section id="areas" class="editorial-panel">
        <span class="section-kicker">Områden</span>
        <h2 class="section-title">Vi täcker områden där närhet faktiskt gör skillnad</h2>
        <p class="section-text">
          Vi arbetar i stora delar av Stockholm med extra stark närvaro i norra Stockholm, där vi kan erbjuda kortare restider,
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
          Bor du i ett annat område? Skicka in en förfrågan ändå så ser vi om vi kan hjälpa dig.
        </p>
      </section>

      <section class="cta-band">
        <div class="cta-band__text">
          <h2 class="cta-band__title">Vill du ha en offert eller anmäla intresse för abonnemang?</h2>
          <p class="cta-band__lead">Offertformuläret är byggt för att vara snabbt, begripligt och enkelt att fylla i oavsett om du sitter på mobil eller dator. Om du är intresserad av återkommande fönsterputs kan du skriva det i din förfrågan så återkommer vi med ett passande upplägg.</p>
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
import business from 'src/data/business';

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
          '@id': business.id,
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
            author: { '@type': r.authorType ?? 'Person', name: r.author },
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
    let portraitTimerId: ReturnType<typeof setTimeout> | number = 0;

    const pickRandomImage = (images: string[]) => images[Math.floor(Math.random() * images.length)];

    // Omdömeskarusellen är en native scroll-container med scroll-snap, så
    // korten går att svepa mellan även utan JS. Pilarna och punkterna nedan
    // är bara ett tillgängligt komplement som döljs när allt redan får plats.
    const reviewTrack = ref<HTMLElement | null>(null);
    let reviewFrameId = 0;
    const reviewsOverflow = ref(false);
    const activeReviewIndex = ref(0);
    const reviewPageCount = ref(0);
    const canScrollReviewsPrev = ref(false);
    const canScrollReviewsNext = ref(false);

    // Ett "steg" är ett kort plus mellanrummet till nästa kort. Kortbredden är
    // procentuell och ändras bara när spåret gör det, så värdet cachas i
    // stället för att läsas ur layouten vid varje scroll. Nollställs vid resize.
    let cachedReviewStep = 0;

    const reviewStep = (track: HTMLElement) => {
      if (cachedReviewStep > 0) {
        return cachedReviewStep;
      }
      const card = track.querySelector<HTMLElement>('.review-card');
      if (!card) {
        return 0;
      }
      const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      cachedReviewStep = card.offsetWidth + gap;
      return cachedReviewStep;
    };

    const measureReviews = () => {
      const track = reviewTrack.value;
      if (!track) {
        return;
      }

      // Tolerans på 8px så att avrundning i webbläsarens scrollbredd inte
      // lämnar en pil aktiv i änden av listan.
      const maxScroll = track.scrollWidth - track.clientWidth;
      reviewsOverflow.value = maxScroll > 8;
      canScrollReviewsPrev.value = track.scrollLeft > 8;
      canScrollReviewsNext.value = track.scrollLeft < maxScroll - 8;

      // Punkterna motsvarar nåbara scrollpositioner, inte antalet kort. Visas
      // tre kort samtidigt finns bara tre positioner att gå till, och då ska
      // det vara tre punkter – annars pekar de sista punkterna på samma läge.
      const step = reviewStep(track);
      reviewPageCount.value = step > 0 ? Math.round(maxScroll / step) + 1 : 0;
      activeReviewIndex.value = step > 0 ? Math.round(track.scrollLeft / step) : 0;
    };

    // Scroll-eventet kan komma flera gånger per bildruta. Mätningen läser
    // layout, så den samlas ihop till en gång per ruta – samma mönster som
    // parallaxen ovan.
    const scheduleReviewMeasure = () => {
      if (reviewFrameId) {
        return;
      }
      reviewFrameId = window.requestAnimationFrame(() => {
        reviewFrameId = 0;
        measureReviews();
      });
    };

    const scrollBehavior = (): ScrollBehavior =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    const scrollReviews = (direction: number) => {
      const track = reviewTrack.value;
      if (!track) {
        return;
      }
      track.scrollBy({ left: direction * reviewStep(track), behavior: scrollBehavior() });
    };

    const goToReview = (index: number) => {
      const track = reviewTrack.value;
      if (!track) {
        return;
      }
      const maxScroll = track.scrollWidth - track.clientWidth;
      const left = Math.min(index * reviewStep(track), maxScroll);
      track.scrollTo({ left, behavior: scrollBehavior() });
    };

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

    // Kortbredden ändras med brytpunkterna, så karusellen måste mätas om
    // vid resize för att pilarna ska stämma.
    const onResize = () => {
      scheduleParallaxUpdate();
      cachedReviewStep = 0;
      measureReviews();
    };

    onMounted(() => {
      randomLandscapeImage.value = pickRandomImage(landscapeImages);
      // Defer portrait randomization until the browser is idle (after initial
      // paint). The prerendered src="/img/15050.webp" is preloaded in
      // index.html so it starts loading immediately; randomising before that
      // download completes would force a second image request and delay LCP.
      const randomizePortrait = () => {
        randomPortraitImage.value = pickRandomImage(portraitImages);
      };
      if ('requestIdleCallback' in window) {
        portraitTimerId = window.requestIdleCallback(randomizePortrait, { timeout: 5000 });
      } else {
        portraitTimerId = setTimeout(randomizePortrait, 3000);
      }
      updateParallax();
      measureReviews();

      window.addEventListener('scroll', scheduleParallaxUpdate, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
    });

    onBeforeUnmount(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', scheduleParallaxUpdate);
        window.removeEventListener('resize', onResize);
      }

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      if (reviewFrameId) {
        window.cancelAnimationFrame(reviewFrameId);
      }

      if (portraitTimerId) {
        if ('cancelIdleCallback' in window) {
          window.cancelIdleCallback(portraitTimerId as number);
        } else {
          clearTimeout(portraitTimerId as ReturnType<typeof setTimeout>);
        }
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
      randomPortraitImage,
      reviewTrack,
      reviewsOverflow,
      activeReviewIndex,
      reviewPageCount,
      canScrollReviewsPrev,
      canScrollReviewsNext,
      scheduleReviewMeasure,
      scrollReviews,
      goToReview
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

/* Sektionen är ett grid-item och karusellspåret ett flex-item. Utan min-width: 0
   ärver de min-width: auto, och då kan de inte krympa under spårets max-content
   (summan av alla kort). Sidan får då horisontell scroll på mobil. */
.reviews-shell,
.review-carousel {
  min-width: 0;
}

.review-carousel__track {
  display: flex;
  gap: 1rem;
  min-width: 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.review-carousel__track::-webkit-scrollbar {
  display: none;
}

/* Inåtvänd fokusring – overflow-containern skulle klippa en utåtvänd. */
.review-carousel__track:focus-visible {
  outline: 2px solid #C04D00;
  outline-offset: -2px;
  border-radius: 0.75rem;
}

.review-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* Tre kort i bredd på desktop, minus de två mellanrummen. */
  flex: 0 0 calc((100% - 2rem) / 3);
  scroll-snap-align: start;
}

@media (max-width: 1023px) {
  .review-card {
    flex-basis: calc((100% - 1rem) / 2);
  }
}

@media (max-width: 599px) {
  /* Nästa kort tittar fram i kanten så att det syns att listan går att svepa. */
  .review-card {
    flex-basis: 85%;
  }
}

.review-carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.review-carousel__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  font-size: 1.5rem;
  line-height: 1;
  color: inherit;
  background: transparent;
  border: 1px solid rgba(69, 90, 100, 0.28);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.review-carousel__arrow:hover:not(:disabled) {
  background: rgba(69, 90, 100, 0.08);
  border-color: rgba(69, 90, 100, 0.45);
}

.review-carousel__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.review-carousel__dots {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.review-carousel__dot {
  /* 24px träffyta runt en 8px prick, så den går att träffa på mobil. */
  width: 24px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.review-carousel__dot::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.3;
  transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}

.review-carousel__dot:hover::before {
  opacity: 0.55;
}

.review-carousel__dot--active::before {
  background: #C04D00;
  opacity: 1;
  transform: scale(1.25);
}

@media (prefers-reduced-motion: reduce) {
  .review-carousel__arrow,
  .review-carousel__dot::before {
    transition: none;
  }
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
