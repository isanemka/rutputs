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
                <div class="text-h6 text-accent">Varför väljer man RUTPUTS?</div>
                <hr>
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
                <div class="text-h6 text-accent">Företagsfördelar</div>
                <hr>
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
export default defineComponent({
  name: 'CompanyComponent',
  meta: {
    title: 'Företagskunder – Fönsterputsning för kontor i Stockholm | Rutputs',
    meta: {
      description: {
        name: 'description',
        content: 'Professionell fönsterputsning för företag i norra Stockholm. Regelbunden service, flexibla avtal och skinande rena fönster för ditt kontor.'
      },
      ogTitle: {
        property: 'og:title',
        content: 'Företagskunder – Fönsterputsning för kontor i Stockholm | Rutputs'
      },
      ogDescription: {
        property: 'og:description',
        content: 'Professionell fönsterputsning för företag i norra Stockholm. Regelbunden service, flexibla avtal och skinande rena fönster.'
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
        content: 'Företagskunder – Fönsterputsning för kontor i Stockholm | Rutputs'
      },
      twitterDescription: {
        name: 'twitter:description',
        content: 'Professionell fönsterputsning för företag i norra Stockholm.'
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
    }
  },
  props: {}
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
