<template>
  <q-page class="page-shell">
    <div class="page-stack">
      <section class="hero-shell company-hero">
        <div class="hero-shell__content">
          <span class="hero-kicker">Företag & lokaler</span>
          <h1 class="hero-title company-hero__title">Fönsterputs som stärker helhetsintrycket för din verksamhet</h1>
          <p class="hero-lead">
            Rutputs hjälper företag i Stockholm med återkommande eller punktvisa upplägg
            för kontor, lokaler och skyltfönster där tydlighet, flexibilitet och ett bra resultat är viktigast.
          </p>
          <div class="hero-actions">
            <q-btn unelevated color="accent" text-color="black" label="Ta kontakt" href="#kontakt" />
            <q-btn outline color="white" label="Läs vanliga frågor" href="#company-faq" />
          </div>
        </div>
      </section>

      <section class="section-grid section-grid--two">
        <div class="editorial-panel editorial-panel--solid">
          <span class="section-kicker">Företagsfokus</span>
          <h2 class="section-title">För verksamheter som vill att lokalen ska kännas välskött</h2>
          <p class="section-text">
            Rena fönster är en del av hur en verksamhet uppfattas redan innan någon kliver in genom dörren.
            För kontor, butiker, skyltfönster och mindre fastigheter blir det en synlig kvalitetssignal både för kunder och personal.
          </p>
          <ul class="feature-list">
            <li>Kvalitet och noggrannhet i varje återkommande besök.</li>
            <li>Anpassade upplägg efter lokaltyp, intervall och tillgänglighet.</li>
            <li>Snabb återkoppling och enkel kontaktväg.</li>
            <li>Möjlighet att börja smått och skala upp över tid.</li>
          </ul>
        </div>

        <div class="editorial-panel">
          <span class="section-kicker">Vad du får</span>
          <h2 class="section-title">En enklare driftspartner, inte bara en engångsinsats</h2>
          <p class="section-text">
            Upplägget anpassas efter hur din verksamhet fungerar i praktiken. Vissa vill ha fasta intervaller,
            andra behöver puts inför visningar, event, säsongsskiften eller för att skyltfönster ska hålla ett jämnt och välskött intryck. Målet är samma: ett enkelt och pålitligt flöde.
          </p>
          <p class="section-text">
            När arbetsplatsen ser välhållen ut förbättras både helhetsintrycket och miljön för dem som vistas där varje dag.
          </p>
        </div>
      </section>

      <section class="editorial-panel editorial-panel--solid">
        <span class="section-kicker">Så fungerar det</span>
        <h2 class="section-title">Ett upplägg som går att förstå direkt</h2>
        <div class="mini-card-grid company-grid">
          <article class="mini-card">
            <h3 class="mini-card__title">Inventering</h3>
            <p class="mini-card__text">Vi går igenom lokaltyp, omfattning och vilka tider som passar verksamheten bäst.</p>
          </article>
          <article class="mini-card">
            <h3 class="mini-card__title">Förslag</h3>
            <p class="mini-card__text">Du får ett tydligt upplägg för intervall, utförande och hur tjänsten kan utvecklas över tid.</p>
          </article>
          <article class="mini-card">
            <h3 class="mini-card__title">Genomförande</h3>
            <p class="mini-card__text">Arbetet planeras med hänsyn till er drift så att resultatet blir bra utan onödigt störmoment.</p>
          </article>
          <article class="mini-card">
            <h3 class="mini-card__title">Uppföljning</h3>
            <p class="mini-card__text">Behoven kan justeras över tid om lokalen förändras eller om ni vill utöka upplägget.</p>
          </article>
        </div>
      </section>

      <section id="company-faq" class="editorial-panel faq-shell">
        <span class="section-kicker">Vanliga frågor</span>
        <h2 class="section-title">Det här frågar företag oftast om först</h2>
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

      <section class="cta-band">
        <div class="cta-band__text">
          <h2 class="cta-band__title">Vill du diskutera ett företagsupplägg?</h2>
          <p class="cta-band__lead">Ta kontakt så går vi igenom lokal, intervall och hur ett fungerande upplägg kan se ut för just er verksamhet.</p>
        </div>
        <q-btn unelevated color="accent" text-color="black" label="Kontakta Rutputs" href="#kontakt" />
      </section>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { companySeo } from 'src/data/seo';

const companyFaqs = companySeo.faq ?? [];

export default defineComponent({
  name: 'CompanyComponent',
  meta: {
    title: companySeo.title,
    meta: {
      description: {
        name: 'description',
        content: companySeo.description
      },
      ogTitle: {
        property: 'og:title',
        content: companySeo.title
      },
      ogDescription: {
        property: 'og:description',
        content: companySeo.description
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
        content: companySeo.title
      },
      twitterDescription: {
        name: 'twitter:description',
        content: companySeo.description
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
.company-hero {
  background: linear-gradient(135deg, rgba(69, 90, 100, 0.94), rgba(46, 68, 78, 0.8));
}

.faq-link-row {
  margin-top: 0.65rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.85rem;
}

.company-hero__title {
  max-width: 18ch;
  overflow-wrap: normal;
  word-break: normal;
  hyphens: none;
}

.company-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.scroll-arrow {
  display: inline-block;
  animation: scroll-arrow-bounce 1.5s infinite;
  text-decoration: none;
}

@media (max-width: 1023px) {
  .company-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599px) {
  .company-hero {
    min-height: auto;
  }

  .company-hero :deep(.hero-shell__content) {
    gap: 0.75rem;
    padding: 1rem;
  }

  .company-hero__title {
    max-width: none;
    font-size: clamp(1.8rem, 8vw, 2.35rem);
    line-height: 1.02;
    text-transform: none;
  }

  .company-hero :deep(.hero-lead) {
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .company-hero :deep(.hero-actions) {
    gap: 0.7rem;
  }

  .company-grid {
    grid-template-columns: 1fr;
  }
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
