<template>
  <q-page>
    <div class="row q-flex q-pa-md justify-center items-center text-center">
      <q-parallax>

        <!-- Display image in landscape mode for larger screens -->
        <template v-if="$q.screen.gt.sm" v-slot:media>
          <img :src="randomLandscapeImage" alt="Professionell fönsterputsning i norra Stockholm" style="opacity: 0.3;">
        </template>

        <!-- Display image in portrait mode for smaller screens -->
        <template v-else v-slot:media>
          <img :src="randomPortraitImage" alt="Fönsterputsare i Järfälla och norra Stockholm" style="opacity: 0.3;">
        </template>
          <div class="col-lg-6 col-md-8 col-xs-10">

          <h1 :class="[$q.screen.lt.sm ? 'text-h5 q-pt-xl' : 'text-h2', 'text-bold text-primary text-uppercase']">
            Din rutputsare i norra Stockholm
          </h1>

          <!-- CTA button to navigate to price list -->
          <q-btn
            class="q-pa-md q-mt-md text-black"
            label="Se vad det kostar"
            color="accent"
            @click="goToPriceList"
          />
        </div>
      </q-parallax>

        <!-- Card section -->
        <div class="row justify-center q-pt-md">
          <div class="col-xl-5 col-lg-6 col-md-8 col-xs-12">
            <q-card bordered class="text-container shadow">
              <q-card-section
                class="custom-line-height text-body1 text-primary text-justify q-py-xl q-px-xl"
                :style="textStyle"
                >
                <div class="text-h6 text-center text-accent">Välkommen till RUTPUTS</div>
                <hr class="text-primary">
                Jag är din lokala rutputsare i norra Stockholm som gärna ger ditt hem den glans det förtjänar.
                Med många års erfarenhet och professionell noggrannhet kan du lita på att du
                kommer att se bättre ut efter ett besök av mig.
                <br>
                <br>
                Varje kund är unik, och därför anpassar jag mig efter dina behov och önskemål.
                Oavsett om det handlar om en bostad, en hel lägenhetsbyggnad eller ett företagskontor,
                är inget jobb för stort eller för litet.
                <br>
                <br>
                Med RUT-avdraget kan du få dina fönster skinande rena från 350 kronor!
                Jag utgår från Järfälla men åker gärna till övriga delar av norra Stockholm.
                Fyll i det enkla formuläret för att se DITT pris.
                <br>
                <br>
                <strong>Områden jag täcker:</strong>
                <span v-for="(a, i) in areaLinks" :key="a.slug">
                  <router-link :to="'/omrade/' + a.slug" class="text-accent">{{ a.name }}</router-link><span v-if="i < areaLinks.length - 1">, </span>
                </span>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { areas } from 'src/data/areas';
export default defineComponent({
  name: 'LandingComponent',
  meta: {
    title: 'Rutputs – Fönsterputsning med RUT-avdrag i norra Stockholm',
    meta: {
      description: {
        name: 'description',
        content: 'Boka professionell fönsterputs i norra Stockholm. Snabbt, enkelt och prisvärt!'
      },
      ogTitle: {
        property: 'og:title',
        content: 'Rutputs – Fönsterputsning med RUT-avdrag i norra Stockholm'
      },
      ogDescription: {
        property: 'og:description',
        content: 'Boka professionell fönsterputs i norra Stockholm. Snabbt, enkelt och prisvärt!'
      },
      ogImage: {
        property: 'og:image',
        content: 'https://www.rutputs.nu/og-image.jpg'
      },
      ogUrl: {
        property: 'og:url',
        content: 'https://www.rutputs.nu'
      },
      twitterCard: {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      twitterTitle: {
        name: 'twitter:title',
        content: 'Rutputs – Fönsterputsning med RUT-avdrag i norra Stockholm'
      },
      twitterDescription: {
        name: 'twitter:description',
        content: 'Boka professionell fönsterputs i norra Stockholm. Snabbt, enkelt och prisvärt!'
      },
      twitterImage: {
        name: 'twitter:image',
        content: 'https://www.rutputs.nu/og-image.jpg'
      }
    },
    link: {
      canonical: {
        rel: 'canonical',
        href: 'https://www.rutputs.nu'
      }
    },
    script: {
      faqSchema: {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Vad kostar fönsterputsning med RUT-avdrag?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Fönsterputsning med RUT-avdrag börjar från 350 kr. Det exakta priset beror på antal fönster och typ av bostad. Använd vår priskalkylator för att se ditt pris direkt.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Vilka områden täcker Rutputs?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Rutputs täcker norra Stockholm: Järfälla, Bromma, Kista, Solna, Sundbyberg, Spånga, Sollentuna och Täby.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Hur bokar jag fönsterputsning?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Fyll i formuläret på vår prissida så räknas ditt pris ut direkt. Vi kontaktar dig sedan för att boka en tid som passar.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Putsar ni även företagsfönster?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Ja, vi erbjuder professionell fönsterputsning för kontor och företagslokaler i norra Stockholm. Kontakta oss för en offert.'
              }
            }
          ]
        })
      }
    }
  },
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
    // Array of landscape images for parallax effect on larger screens
    const landscapeImages = [
      '/img/25050.webp',
      '/img/25051.webp',
      '/img/25052.webp',
      '/img/25053.webp',
      '/img/25054.webp',
      '/img/25055.webp'
    ];
    // Array of portrait images for parallax effect on smaller screens
    const portraitImages = [
      '/img/15050.webp',
      '/img/15051.webp',
      '/img/15052.webp',
      '/img/15053.webp'
    ];
    // Reactive references for random images
    const randomLandscapeImage = ref('');
    const randomPortraitImage = ref('');
    // Select random images on component mount
    onMounted(() => {
      randomLandscapeImage.value = landscapeImages[Math.floor(Math.random() * landscapeImages.length)];
      randomPortraitImage.value = portraitImages[Math.floor(Math.random() * portraitImages.length)];}
    );
    const areaLinks = areas;
    return {
      areaLinks, randomLandscapeImage, randomPortraitImage
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
</style>
