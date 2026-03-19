<template>
  <q-page>
    <div class="row q-flex q-pa-sm justify-center items-center">
      <div class="col-lg-6 col-md-8 col-xs-11 text-center">
        <h1 :class="[$q.screen.lt.sm ? 'text-h4' : 'text-h3', 'text-bold text-primary text-uppercase']">Professionell fönsterputs för ditt företag</h1>
      </div>

      <!-- Cards section -->
      <div class="col-12">
        <div class="row justify-center items-stretch q-pt-md">
          <div class="col-md-6 col-sm-10 col-xs-12">
            <q-card bordered class="text-container shadow q-ma-sm full-height">
              <q-card-section class="custom-line-height text-body1 text-primary q-pa-lg">
                <h2 class="text-h6 text-accent q-my-none">Varför väljer företag Rutputs?</h2>
                <hr>
                <p>
                  Rutputs hjälper företag i Stockholm och norra Stockholm som vill hålla entréer,
                  kontor och lokaler välkomnande med rena fönster. Tjänsten passar både mindre verksamheter
                  och företag som behöver ett mer återkommande upplägg med tydliga intervaller.
                </p>
                <ul>
                  <li>
                    Kvalitet och noggrannhet
                  </li>
                  <li>
                    Anpassade lösningar
                  </li>
                  <li>
                    Effektivitet och pålitlighet
                  </li>
                  <li>
                    Tillgänglighet och flexibilitet
                  </li>
                </ul>
                Ta kontakt för att diskutera dina behov och få en offert.
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6 col-sm-10 col-xs-12">
            <q-card bordered class="text-container shadow q-ma-sm full-height">
              <q-card-section class="custom-line-height text-body1 text-primary q-pa-lg">
                <h2 class="text-h6 text-accent q-my-none">Företagsfördelar</h2>
                <hr>
                <p>
                  Rena fönster gör skillnad för helhetsintrycket och kan bidra till en ljusare arbetsmiljö.
                  För verksamheter med kundkontakt blir det också en tydlig del av hur lokalen upplevs utifrån.
                </p>
                <ul>
                  <li>
                    Skapa en välkomnande och professionell atmosfär för dina kunder och anställda.
                  </li>
                  <li>
                    Förbättra arbetsmiljön genom att öka ljusinsläppet och utsikten med skinande rena fönster.
                  </li>
                  <li>
                    Öka värdet på din fastighet med regelbunden fönsterputsning och underhåll.
                  </li>
                </ul>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row justify-center q-pt-md">
          <div class="col-lg-10 col-md-10 col-sm-11 col-xs-12">
            <q-card bordered class="text-container shadow q-ma-sm">
              <q-card-section class="custom-line-height text-body1 text-primary q-pa-lg">
                <h2 class="text-h6 text-accent q-my-none">Så fungerar företagsupplägget</h2>
                <hr>
                <p>
                  När du kontaktar Rutputs går vi igenom lokaltyp, önskat intervall och vad som är viktigast för er verksamhet.
                  Det kan handla om allt från regelbunden fönsterputs för kontor till punktinsatser inför visningar,
                  kundevent eller säsongsstart.
                </p>
                <p class="q-mb-none">
                  Målet är att ge ett tydligt och enkelt upplägg med snabb återkoppling, så att du vet vad som ingår,
                  när arbetet utförs och hur lösningen kan skalas över tid om behoven förändras.
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row justify-center q-pt-md q-pb-md">
          <div class="col-lg-10 col-md-10 col-sm-11 col-xs-12">
            <q-card bordered class="text-container shadow q-ma-sm">
              <q-card-section class="text-primary q-pa-lg">
                <h2 class="text-h6 text-accent q-my-none">Vanliga frågor från företag</h2>
                <hr>
                <q-list bordered separator>
                  <q-expansion-item
                    v-for="item in companyFaqs"
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
        <div class="row justify-center items-center q-pt-lg q-pb-md" style="gap: 12px">
          <q-btn
            label="Ta kontakt"
            color="accent"
            class="text-black q-pa-sm"
            href="#kontakt"
          />
        </div>
        <div class="row justify-center q-pb-lg">
          <a href="#kontakt" class="scroll-arrow text-primary" aria-label="Scrolla till kontaktsektionen">
            <q-icon name="keyboard_arrow_down" size="2.5rem" />
          </a>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const companyFaqs = [
  {
    question: 'Erbjuder ni återkommande fönsterputs för företag?',
    answer: 'Ja, Rutputs kan hjälpa företag med både enstaka uppdrag och återkommande upplägg beroende på lokal, behov och önskat intervall.'
  },
  {
    question: 'Arbetar ni bara i norra Stockholm?',
    answer: 'Fokus ligger på Stockholm och norra Stockholm, där Rutputs redan arbetar löpande och därför kan erbjuda ett smidigare upplägg.'
  },
  {
    question: 'Hur får vi en offert?',
    answer: 'Kontakta Rutputs via formuläret eller kontaktuppgifterna på sidan så går vi igenom lokal, omfattning och önskat upplägg innan offert lämnas.'
  }
];

export default defineComponent({
  name: 'CompanyComponent',
  meta: {
    title: 'Fönsterputs för företag i Stockholm | Rutputs',
    meta: {
      description: {
        name: 'description',
        content: 'Professionell fönsterputs för företag i Stockholm och norra Stockholm. Flexibla avtal, regelbunden service och rena fönster för kontor och lokaler.'
      },
      ogTitle: {
        property: 'og:title',
        content: 'Fönsterputs för företag i Stockholm | Rutputs'
      },
      ogDescription: {
        property: 'og:description',
        content: 'Professionell fönsterputs för företag i Stockholm och norra Stockholm. Regelbunden service, flexibla avtal och skinande rena fönster.'
      },
      ogImage: {
        property: 'og:image',
        content: 'https://www.rutputs.nu/og-image.jpg'
      },
      ogUrl: {
        property: 'og:url',
        content: 'https://www.rutputs.nu/foretag'
      },
      twitterCard: {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      twitterTitle: {
        name: 'twitter:title',
        content: 'Fönsterputs för företag i Stockholm | Rutputs'
      },
      twitterDescription: {
        name: 'twitter:description',
        content: 'Professionell fönsterputs för företag i Stockholm och norra Stockholm.'
      },
      twitterImage: {
        name: 'twitter:image',
        content: 'https://www.rutputs.nu/og-image.jpg'
      }
    },
    link: {
      canonical: {
        rel: 'canonical',
        href: 'https://www.rutputs.nu/foretag'
      }
    },
    script: {
      serviceSchema: {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Fönsterputs för företag i Stockholm',
          serviceType: 'Fönsterputsning för företag',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Rutputs',
            url: 'https://www.rutputs.nu/'
          },
          areaServed: 'Stockholm',
          url: 'https://www.rutputs.nu/foretag'
        })
      },
      faqSchema: {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: companyFaqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
            }
          }))
        })
      }
    }
  },
  setup() {
    return {
      companyFaqs
    };
  }
});
</script>
<style scoped>
.scroll-arrow {
  display: inline-block;
  animation: scroll-arrow-bounce 1.5s infinite;
  text-decoration: none;
}

@keyframes scroll-arrow-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-arrow {
    animation: none;
  }
}
</style>
