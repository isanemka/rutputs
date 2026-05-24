<template>
  <q-page class="page-shell">
    <div v-if="guide" class="page-stack">
      <nav class="breadcrumbs" aria-label="Brödsmulor">
        <router-link to="/">Start</router-link>
        <span aria-hidden="true">›</span>
        <router-link to="/guide">Guider</router-link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{{ guide.h1 }}</span>
      </nav>

      <article class="guide-article">
        <header class="hero-shell guide-article__header">
          <div class="hero-shell__content">
            <span class="hero-kicker">{{ guideCategoryLabel }}</span>
            <h1 class="hero-title">{{ guide.h1 }}</h1>
            <p class="hero-lead">{{ guide.intro }}</p>
            <p class="guide-article__meta">
              Publicerad {{ formattedPublishedAt }}
              <template v-if="guide.updatedAt"> · Uppdaterad {{ formattedUpdatedAt }}</template>
              · {{ guide.readingTimeMin }} min läsning · av {{ guide.author }}
            </p>
          </div>
        </header>

        <section
          v-for="section in guide.sections"
          :key="section.heading"
          class="editorial-panel editorial-panel--solid guide-article__section"
        >
          <h2 class="section-title">{{ section.heading }}</h2>
          <div class="guide-article__body" v-html="section.html"></div>
        </section>

        <section class="editorial-panel faq-shell">
          <span class="section-kicker">Vanliga frågor</span>
          <h2 class="section-title">Frågor och svar</h2>
          <q-list bordered separator role="none">
            <q-expansion-item
              v-for="item in guide.faq"
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

        <section class="cta-band">
          <div class="cta-band__text">
            <h2 class="cta-band__title">Vill du ha en offert?</h2>
            <p class="cta-band__lead">Fyll i offertformuläret så återkommer jag med ett pris efter RUT-avdrag.</p>
          </div>
          <q-btn unelevated color="accent" text-color="black" label="Begär offert" to="/pris" />
        </section>

        <section
          v-if="relatedAreas.length || relatedServices.length"
          class="editorial-panel editorial-panel--solid"
        >
          <h2 class="section-title">Läs vidare</h2>
          <div v-if="relatedServices.length" class="guide-article__links">
            <p class="guide-article__links-label">Relaterade tjänster:</p>
            <ul>
              <li v-for="service in relatedServices" :key="service.slug">
                <router-link :to="'/tjanst/' + service.slug">{{ service.bodyTitle }}</router-link>
              </li>
            </ul>
          </div>
          <div v-if="relatedAreas.length" class="guide-article__links">
            <p class="guide-article__links-label">Områden vi täcker:</p>
            <ul>
              <li v-for="area in relatedAreas" :key="area.slug">
                <router-link :to="'/omrade/' + area.slug">Fönsterputs i {{ area.name }}</router-link>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getGuideBySlug } from 'src/data/guides';
import { getAreaBySlug, getServiceBySlug } from 'src/data/seo';

const SITE_URL = 'https://www.rutputs.nu';

function formatDate(iso?: string): string {
  if (!iso) return '';
  const date = new Date(iso + 'T00:00:00');
  return date.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default defineComponent({
  name: 'GuideComponent',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const guide = computed(() => {
      const slug = route.params.slug as string;
      return getGuideBySlug(slug);
    });

    watch(guide, (val) => {
      if (!val) {
        router.replace('/404');
      }
    }, { immediate: true });

    const formattedPublishedAt = computed(() => formatDate(guide.value?.publishedAt));
    const formattedUpdatedAt = computed(() => formatDate(guide.value?.updatedAt));

    const guideCategoryLabel = computed(() => {
      switch (guide.value?.category) {
        case 'jämförelse': return 'Jämförelse';
        case 'tips': return 'Tips';
        default: return 'Guide';
      }
    });

    const relatedAreas = computed(() => {
      const slugs = guide.value?.relatedAreaSlugs ?? [];
      return slugs.map((s) => getAreaBySlug(s)).filter((a): a is NonNullable<typeof a> => !!a);
    });

    const relatedServices = computed(() => {
      const slugs = guide.value?.relatedServiceSlugs ?? [];
      return slugs.map((s) => getServiceBySlug(s)).filter((s): s is NonNullable<typeof s> => !!s);
    });

    return {
      guide,
      formattedPublishedAt,
      formattedUpdatedAt,
      guideCategoryLabel,
      relatedAreas,
      relatedServices,
    };
  },
  meta() {
    const slug = this.$route.params.slug as string;
    const guide = getGuideBySlug(slug);
    if (!guide) {
      return {
        title: 'Sidan hittades inte – Rutputs',
        meta: { robots: { name: 'robots', content: 'noindex' } },
      };
    }
    const url = `${SITE_URL}/guide/${guide.slug}`;
    return {
      title: `${guide.title} | Rutputs`,
      meta: {
        description: { name: 'description', content: guide.description },
        ogTitle: { property: 'og:title', content: guide.title },
        ogDescription: { property: 'og:description', content: guide.description },
        ogType: { property: 'og:type', content: 'article' },
        ogUrl: { property: 'og:url', content: url },
        ogImage: { property: 'og:image', content: `${SITE_URL}/og/guide-${guide.slug}.jpg` },
        articlePublished: { property: 'article:published_time', content: guide.publishedAt },
        articleModified: { property: 'article:modified_time', content: guide.updatedAt || guide.publishedAt },
        twitterCard: { name: 'twitter:card', content: 'summary_large_image' },
        twitterTitle: { name: 'twitter:title', content: guide.title },
        twitterDescription: { name: 'twitter:description', content: guide.description },
        twitterImage: { name: 'twitter:image', content: `${SITE_URL}/og/guide-${guide.slug}.jpg` },
      },
      link: {
        canonical: { rel: 'canonical', href: url },
      },
      script: {
        articleSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.h1,
            description: guide.description,
            image: `${SITE_URL}/og/guide-${guide.slug}.jpg`,
            datePublished: guide.publishedAt,
            dateModified: guide.updatedAt || guide.publishedAt,
            author: { '@type': 'Organization', name: guide.author, url: `${SITE_URL}/` },
            publisher: {
              '@type': 'Organization',
              name: 'Rutputs',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/icons/main_logo.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          }),
        },
        faqSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: guide.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }),
        },
        breadcrumbSchema: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Guider', item: `${SITE_URL}/guide` },
              { '@type': 'ListItem', position: 3, name: guide.h1, item: url },
            ],
          }),
        },
      },
    };
  },
});
</script>

<style scoped>
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
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
.guide-article {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.guide-article__header {
  min-height: clamp(200px, 30vw, 360px);
}
.guide-article__meta {
  font-size: 0.85rem;
  opacity: 0.75;
  margin: 0;
}
.guide-article__body :deep(p) {
  margin: 0 0 1rem;
  line-height: 1.7;
}
.guide-article__body :deep(ul),
.guide-article__body :deep(ol) {
  margin: 0 0 1rem 1.25rem;
  line-height: 1.7;
}
.guide-article__body :deep(li) {
  margin-bottom: 0.5rem;
}
.guide-article__body :deep(a) {
  color: var(--q-accent, #f4c542);
  text-decoration: underline;
}
.guide-article__body :deep(strong) {
  font-weight: 700;
}
.guide-article__links {
  margin-top: 1rem;
}
.guide-article__links-label {
  font-weight: 600;
  margin: 0 0 0.5rem;
}
.guide-article__links ul {
  margin: 0 0 0 1.25rem;
}
.guide-article__links a {
  color: var(--q-accent, #f4c542);
  text-decoration: none;
}
.faq-link-row {
  margin-top: 0.5rem;
}
</style>
