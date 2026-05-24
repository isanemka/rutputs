<template>
  <q-page class="page-shell">
    <div v-if="service" class="page-stack">
      <nav class="breadcrumbs" aria-label="Brödsmulor">
        <router-link to="/">Start</router-link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{{ service.name }}</span>
      </nav>

      <section class="hero-shell area-hero">
        <picture class="hero-shell__media area-hero__media">
          <source media="(min-width: 600px)" :srcset="randomLandscapeImage" type="image/webp">
          <img class="hero-shell__image" :src="randomPortraitImage" :alt="service.bodyTitle">
        </picture>
        <div class="hero-shell__content">
          <span class="hero-kicker">Tjänst</span>
          <h1 class="hero-title area-hero__title">{{ service.bodyTitle }}</h1>
          <p class="hero-lead">{{ service.bodyIntro }}</p>
          <div class="hero-actions">
            <template v-if="service.contactOnly">
              <q-btn unelevated color="accent" text-color="black" label="Ring direkt" type="a" href="tel:+46734644604" />
              <q-btn outline color="white" label="Skicka mejl" type="a" href="mailto:kontakt@rutputs.nu" />
            </template>
            <template v-else>
              <q-btn unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
              <q-btn outline color="white" label="Ring direkt" type="a" href="tel:+46734644604" />
            </template>
          </div>
        </div>
      </section>

      <section class="editorial-panel editorial-panel--solid">
        <span class="section-kicker">Det här ingår</span>
        <h2 class="section-title">Fördelar med tjänsten</h2>
        <ul class="feature-list">
          <li v-for="benefit in service.benefits" :key="benefit">{{ benefit }}</li>
        </ul>
        <div class="hero-actions q-pt-md">
          <q-btn v-if="!service.contactOnly" unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
          <q-btn v-else unelevated color="accent" text-color="black" label="Ring direkt" type="a" href="tel:+46734644604" />
        </div>
      </section>

      <section class="cta-band">
        <div class="cta-band__text">
          <h2 class="cta-band__title">{{ service.contactOnly ? 'Intresserad av abonnemang?' : 'Vill du ha en offert?' }}</h2>
          <p class="cta-band__lead">{{ service.contactOnly ? 'Ring eller mejla så tar vi fram ett upplägg som passar dig.' : 'Fyll i offertformuläret så återkommer jag med ett pris efter RUT-avdrag.' }}</p>
        </div>
        <div v-if="service.contactOnly" class="hero-actions">
          <q-btn unelevated color="accent" text-color="black" label="Ring direkt" type="a" href="tel:+46734644604" />
          <q-btn outline color="white" label="Skicka mejl" type="a" href="mailto:kontakt@rutputs.nu" />
        </div>
        <q-btn v-else unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
      </section>

      <section class="editorial-panel faq-shell">
        <span class="section-kicker">Vanliga frågor</span>
        <h2 class="section-title">Frågor och svar</h2>
        <q-list bordered separator role="none">
          <q-expansion-item
            v-for="item in service.faq"
            :key="item.question"
            :label="item.question"
            expand-separator
            header-class="text-primary text-weight-medium"
          >
            <q-card flat>
              <q-card-section class="text-body2 text-primary">
                {{ item.answer }}
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
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getServiceBySlug } from 'src/data/seo';
import business from 'src/data/business';

export default defineComponent({
  name: 'ServicePageComponent',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const service = computed(() => {
      const slug = route.params.service as string;
      return getServiceBySlug(slug);
    });

    watch(service, (val) => {
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
      service,
      randomLandscapeImage,
      randomPortraitImage,
    };
  },
  meta() {
    const slug = this.$route.params.service as string;
    const service = getServiceBySlug(slug);
    if (!service) {
      return {
        title: 'Sidan hittades inte – Rutputs',
        meta: {
          robots: { name: 'robots', content: 'noindex' }
        }
      };
    }
    const url = `https://www.rutputs.nu/tjanst/${service.slug}`;
    return {
      title: service.title,
      meta: {
        description: { name: 'description', content: service.description },
        ogTitle: { property: 'og:title', content: service.title },
        ogDescription: { property: 'og:description', content: service.description },
        ogImage: { property: 'og:image', content: 'https://www.rutputs.nu/og-image.jpg' },
        ogUrl: { property: 'og:url', content: url },
        twitterCard: { name: 'twitter:card', content: 'summary_large_image' },
        twitterTitle: { name: 'twitter:title', content: service.title },
        twitterDescription: { name: 'twitter:description', content: service.description },
        twitterImage: { name: 'twitter:image', content: 'https://www.rutputs.nu/og-image.jpg' }
      },
      script: {
        serviceSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.bodyTitle,
            serviceType: 'Fönsterputsning',
            description: service.description,
            url,
            provider: { '@type': 'LocalBusiness', '@id': business.id, name: 'Rutputs', url: 'https://www.rutputs.nu/' },
            areaServed: 'Stockholm',
            offers: { '@type': 'Offer', priceCurrency: 'SEK', price: '499', description: 'Från-pris efter RUT-avdrag' }
          })
        },
        faqSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: service.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer }
            }))
          })
        },
        breadcrumbSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.rutputs.nu/' },
              { '@type': 'ListItem', position: 2, name: service.name, item: url }
            ]
          })
        }
      },
      link: {
        canonical: { rel: 'canonical', href: url }
      }
    };
  }
});
</script>

<style scoped>
.breadcrumbs {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.85rem;
  opacity: 0.8;
  padding: 0.5rem 0;
}

.breadcrumbs a {
  color: var(--q-accent, #f4c542);
  text-decoration: none;
}

.area-hero__media {
  position: absolute;
  inset: 0;
}
</style>
