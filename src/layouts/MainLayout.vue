<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-primary text-secondary" height-hint="98">

<!-- Navigation -->
      <nav aria-label="Huvudnavigering" class="row items-center no-wrap top-nav">
        <router-link to="/" aria-label="Gå till startsidan" class="top-nav__logo-link q-mx-md">
          <q-img
            src="/icons/favicon.png"
            alt="Rutputs logotyp"
            role="img"
            class="top-nav__logo"
            style="height: 30px; max-width: 30px"
          />
        </router-link>
        <q-tabs align="left" class="top-nav__tabs">
          <q-route-tab to="/" label="Puts på rut" class="top-nav__tab" />
          <q-route-tab to="/pris" label="Prislista" class="top-nav__tab" />
          <q-route-tab to="/foretag" label="Företag" class="top-nav__tab" />
        </q-tabs>
      </nav>
    </q-header>

<!-- Page content -->
      <q-page-container class="q-pa-md">
          <div class="q-flex column items-center">
            <a href="/" @click.prevent="goToLanding()" style="max-width: 900px; display: block;">
              <img
                class="fit q-mt-md"
                alt="Rutputs – Fönsterputsning i norra Stockholm"
                style="max-width: 900px;"
                src="/icons/main_logo.png"
                width="900"
                height="200"
                fetchpriority="high"
              />
            </a>
          </div>
          <router-view />
      </q-page-container>

    <q-footer id="kontakt" elevated class="bg-primary text-secondary" role="contentinfo">
      <div class="row justify-center text-overline">
        <div class="col footer-block">
          <p class="q-ma-xl text-uppercase text-bold text-subtitle1 text-center footer-line footer-line--stacked">
            <span class="footer-item">Telefon: <a href="tel:+46734644604" class="text-secondary">0734-64 46 04</a></span>
            <span class="footer-divider q-mx-sm" aria-hidden="true">|</span>
            <span class="footer-item">E-post: <a href="mailto:kontakt@rutputs.nu" class="text-secondary">kontakt@rutputs.nu</a></span>
          </p>
        </div>
      </div>
      <q-separator color="accent" />
        <div class="row justify-center text-overline">
          <div class="col footer-block">
            <p class="q-ma-md text-uppercase text-bold text-subtitle2 text-center">
              Godkänd för F-skatt
            </p>
          </div>
        </div>
        <q-separator color="accent" />
        <div class="row justify-center q-pa-sm">
          <div class="col text-center footer-block">
            <p class="text-subtitle2 text-uppercase text-bold q-mb-xs">Områden</p>
            <p class="text-caption footer-links">
              <template v-for="(a, i) in areaLinks" :key="a.slug">
                <router-link :to="'/omrade/' + a.slug" class="text-secondary footer-link">
                  {{ a.name + ' '}}
                </router-link>
                <span v-if="i < areaLinks.length - 1" class="footer-divider q-mx-xs" aria-hidden="true">|</span>
              </template>
            </p>
          </div>
        </div>
        <q-separator color="accent" />
        <div class="row justify-center text-overline">
          <div class="col footer-block">
            <p class="q-ma-md text-uppercase text-bold text-subtitle3 text-center footer-line footer-line--stacked">
              <span class="footer-item">Copyright &copy;{{ currentYear }}</span>
              <span class="footer-divider q-mx-sm" aria-hidden="true">|</span>
              <span class="footer-item">Webbplats av <a href="https://pixelpioneer.se" target="_blank" rel="noopener" class="text-accent">PixelPioneer</a></span>
              <span class="footer-divider q-mx-sm" aria-hidden="true">|</span>
              <span class="footer-item"><router-link to="/integritetspolicy" class="text-secondary">Integritetspolicy</router-link></span>
              <span class="footer-divider q-mx-sm" aria-hidden="true">|</span>
              <span class="footer-item"><a href="#" class="text-secondary" @click.prevent="openCookieSettings">Cookieinställningar</a></span>
            </p>
          </div>
        </div>
    </q-footer>

    <!-- Cookie Consent Banner -->
    <CookieConsentBanner />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import CookieConsentBanner from 'src/components/CookieConsentBanner.vue';
import { useConsent } from 'src/composables/useConsent';
import { areas } from 'src/data/areas';

export default defineComponent({
  name: 'App',
  components: {
    CookieConsentBanner,
  },
  setup() {
    const router = useRouter();
    const { triggerShowBanner } = useConsent();

    const currentYear = computed(() => new Date().getFullYear());

    const goToLanding = () => {
      router.push('/');
    };

    const goToConfirmation = () => {
      router.push('/bekraftelse');
    };

    const goToFormFail = () => {
      router.push('/fel');
    };

    const openCookieSettings = () => {
      // Trigger showing the cookie consent banner
      triggerShowBanner();
    };

    const areaLinks = areas;

    return {
      currentYear,
      areaLinks,
      goToLanding,
      goToConfirmation,
      goToFormFail,
      openCookieSettings,
    };
  },
});
</script>

<style>
.top-nav {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.top-nav__tabs {
  flex: 1 1 auto;
  min-width: 0;
}

.top-nav__logo-link {
  display: inline-flex;
}

.top-nav__tab {
  min-width: 0;
}

@media (max-width: 500px) {
  .top-nav__logo {
    display: none;
  }
}

.footer-block {
  max-width: 960px;
  margin: 0 auto;
}

.footer-line {
  line-height: 1.8;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.125rem 0.35rem;
}

.footer-link {
  white-space: nowrap;
}

@media (max-width: 599px) {
  .top-nav__tabs {
    width: 100%;
  }

  .top-nav__tab {
    font-size: 0.75rem;
  }

  .footer-line--stacked {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
  }

  .footer-line--stacked .footer-divider {
    display: none;
  }

  .footer-line--stacked .footer-item {
    display: block;
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  .footer-links {
    gap: 0.25rem 0.5rem;
  }

  .footer-links .footer-divider {
    display: none;
  }

  .footer-link {
    white-space: normal;
  }
}
</style>
