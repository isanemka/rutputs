<template>
  <q-page>
    <div class="row q-flex q-pa-md justify-center items-center text-center">
      <q-parallax>
        <template v-if="$q.screen.gt.sm" v-slot:media>
          <img :src="randomLandscapeImage" style="opacity: 0.3;">
        </template>
        <template v-else v-slot:media>
          <img :src="randomPortraitImage" style="opacity: 0.3;">
        </template>
          <div class="col-lg-6 col-md-8 col-xs-10">
            <h1 v-if="$q.screen.lt.sm" class="text-h5 text-bold text-primary text-uppercase q-pt-xl">
            Din rutputsare i Avesta med omnejd
          </h1>
            <h1 v-else class="text-h2 text-bold text-primary text-uppercase">
            Din rutputsare i Avesta med omnejd
          </h1>
          <q-btn
            class="q-pa-md q-mt-md"
            label="Se vad det kostar"
            color="accent"
            @click="goToPriceList"
          />
        </div>
      </q-parallax>
        <div class="row justify-center q-pt-md">
          <div class="col-lg-6 col-md-8 col-xs-12">
            <q-card bordered class="text-container shadow">
              <q-card-section
                class="custom-line-height text-body1 text-accent q-pa-xl"
                :style="textStyle"
                >
                <div class="text-h6">Välkommen till RUTPUTS</div>
                <hr class="text-primary">
                Jag är din lokala rutputsare som gärna ger ditt hem den glans det förtjänar.
                Med passion för perfektion och dedikation till kundnöjdhet står jag redo att
                göra dina fönster skinande rena, oavsett om det är för ditt hem eller din arbetsplats.
                <br>
                Med många års erfarenhet och professionell noggrannhet kan du lita på
                att du kommer att se bättre ut efter ett besök av mig.
                <br>
                <br>
                Varje kund är unik, och därför anpassar jag mig efter dina behov och önskemål.
                Oavsett om det handlar om en bostad, en hel lägenhetsbyggnad eller ett företagskontor,
                är inget jobb för stort eller för litet.
                <br>
                Med RUT-avdraget kan du få dina fönster skinande rena för endast 350 kronor!
                Fyll i det enkla formuläret för att se ditt pris.
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'LandingComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup() {
    const landscapeImages = [
      '/src/assets/img/25050.webp',
      '/src/assets/img/25051.webp',
      '/src/assets/img/25052.webp',
      '/src/assets/img/25053.webp',
      '/src/assets/img/25054.webp',
      '/src/assets/img/25055.webp'
    ];
    const portraitImages = [
      '/src/assets/img/15050.webp',
      '/src/assets/img/15051.webp',
      '/src/assets/img/15052.webp',
      '/src/assets/img/15053.webp'
    ];
    const randomLandscapeImage = ref('');
    const randomPortraitImage = ref('');
    onMounted(() => {
      randomLandscapeImage.value = landscapeImages[Math.floor(Math.random() * landscapeImages.length)];
      randomPortraitImage.value = portraitImages[Math.floor(Math.random() * portraitImages.length)];}
    );
    return {
      randomLandscapeImage, randomPortraitImage
    };
  },
  methods: {
    goToPriceList() {
      this.$router.push('/priceList');
    }
  },
  computed: {
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
</style>
