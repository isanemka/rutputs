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
              <div class="text-h6 text-center text-accent">Fönsterputs i {{ area.name }} med RUT-avdrag</div>
              <hr class="text-primary">
              {{ area.content }}
              <br><br>
              Med RUT-avdraget kan du få dina fönster skinande rena från 350 kronor!
              Fyll i det enkla formuläret för att se DITT pris.
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAreaBySlug } from 'src/data/areas';

export default defineComponent({
  name: 'AreaComponent',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const area = computed(() => {
      const slug = route.params.area as string;
      return getAreaBySlug(slug);
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
