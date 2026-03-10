<template>
  <q-page>
    <div class="row q-flex q-pa-sm justify-center items-center">
      <div class="col-lg-6 col-md-8 col-xs-11 text-center">
        <h1 :class="[$q.screen.lt.sm ? 'text-h4' : 'text-h3', 'text-bold text-primary text-uppercase']">Professionell fönsterputs för ditt företag</h1>
      </div>

      <!-- Cards section -->
      <div class="row justify-center q-pt-md">
        <div class="col-md-6 col-sm-10 col-xs-12">
          <q-card bordered class="text-container shadow q-ma-sm">
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
            <q-card-actions align="center" class="q-pb-md">
              <q-btn
                label="Ta kontakt"
                color="accent"
                class="text-black q-pa-sm"
                @click="scrollToFooter"
              />
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-md-6 col-sm-10 col-xs-12">
          <q-card bordered class="text-container shadow q-ma-sm">
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CompanyComponent',
  methods: {
    scrollToFooter() {
      const footer = document.querySelector('.q-footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  meta: {
    title: 'Företagskunder – Fönsterputsning för kontor i Stockholm | Rutputs',
    meta: {
      description: {
        name: 'description',
        content: 'Professionell fönsterputsning för företag i norra Stockholm. Regelbunden service, flexibla avtal och skinande rena fönster för ditt kontor.'
      }
    }
  },
  props: {}
});
</script>
<style></style>
