<template>
  <q-layout view="hHh lpr fff" class="site-layout">
    <q-header class="site-header text-secondary" height-hint="98">
      <nav aria-label="Huvudnavigering" class="top-nav">
        <router-link to="/" aria-label="Gå till startsidan" class="top-nav__brand">
          <q-img
            src="/icons/favicon.png"
            alt="Rutputs logotyp"
            role="img"
            class="top-nav__logo"
          />
          <div class="top-nav__brand-copy">
            <span class="top-nav__eyebrow">Rutputs</span>
            <span class="top-nav__headline">Fönsterputs i norra Stockholm</span>
          </div>
        </router-link>

        <div class="top-nav__menu">
          <q-tabs align="left" class="top-nav__tabs" indicator-color="accent" active-color="accent">
            <q-route-tab to="/" label="Start" class="top-nav__tab" />
            <q-route-tab to="/pris" label="Prislista" class="top-nav__tab" />
            <q-route-tab to="/foretag" label="Företag" class="top-nav__tab" />
          </q-tabs>
          <q-btn
            unelevated
            color="accent"
            text-color="black"
            :label="$q.screen.lt.sm ? 'Pris' : 'Få pris direkt'"
            class="top-nav__cta"
            to="/pris"
          />
        </div>
      </nav>
    </q-header>

      <q-page-container class="site-container">
          <div class="brand-banner">
            <a href="/" @click.prevent="goToLanding()" class="brand-banner__link">
              <img
                class="brand-banner__image"
                alt="Rutputs – Fönsterputsning i norra Stockholm"
                src="/icons/main_logo.png"
                width="900"
                height="200"
                fetchpriority="high"
              />
            </a>
          </div>
          <router-view />
      </q-page-container>

    <q-footer id="kontakt" class="site-footer text-secondary" role="contentinfo">
      <div class="site-footer__inner">
        <div class="site-footer__grid">
          <section class="site-footer__panel">
            <p class="site-footer__kicker">Kontakt</p>
            <h2 class="site-footer__title">Boka eller fråga om pris</h2>
            <p class="site-footer__text">Snabbast väg in är prislistan, men du kan också ringa eller mejla direkt om du vill diskutera upplägget först.</p>
            <div class="site-footer__contact-list">
              <a href="tel:+46734644604" class="site-footer__contact-link">0734-64 46 04</a>
              <a href="mailto:kontakt@rutputs.nu" class="site-footer__contact-link">kontakt@rutputs.nu</a>
            </div>
          </section>

          <section class="site-footer__panel">
            <p class="site-footer__kicker">Områden</p>
            <div class="site-footer__area-list">
              <router-link v-for="a in areaLinks" :key="a.slug" :to="'/omrade/' + a.slug" class="site-footer__pill">
                {{ a.name }}
              </router-link>
            </div>
          </section>
        </div>

        <div class="site-footer__meta">
          <span>Godkänd för F-skatt</span>
          <span>Copyright &copy;{{ currentYear }}</span>
          <span>Webbplats av <a href="https://pixelpioneer.se" target="_blank" rel="noopener" class="text-accent">PixelPioneer</a></span>
          <span><router-link to="/integritetspolicy" class="text-secondary">Integritetspolicy</router-link></span>
          <span><a href="#" class="text-secondary" @click.prevent="openCookieSettings">Cookieinställningar</a></span>
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
.site-layout {
  background: transparent;
}

.site-header {
  backdrop-filter: blur(18px);
  background: rgba(69, 90, 100, 0.88);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.top-nav {
  width: min(1180px, calc(100% - 1rem));
  margin: 0 auto;
  min-height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.top-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  color: inherit;
}

.top-nav__logo {
  width: 42px;
  height: 42px;
}

.top-nav__brand-copy {
  display: grid;
  gap: 0.1rem;
}

.top-nav__eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
}

.top-nav__headline {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.top-nav__menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.top-nav__tabs {
  min-width: 0;
}

.top-nav__tab {
  min-width: 0;
}

.top-nav__cta {
  white-space: nowrap;
}

.site-container {
  padding: 1rem 0.5rem 0;
}

.brand-banner {
  width: min(1180px, calc(100% - 1rem));
  margin: 0 auto 1rem;
  display: flex;
  justify-content: center;
}

.brand-banner__link {
  display: block;
  width: min(880px, 100%);
}

.brand-banner__image {
  display: block;
  width: 100%;
  height: auto;
}

.site-footer {
  margin-top: 2rem;
  background: #314047;
}

.site-footer__inner {
  width: min(1180px, calc(100% - 1rem));
  margin: 0 auto;
  padding: 1.4rem 0 2rem;
}

.site-footer__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1rem;
}

.site-footer__panel {
  padding: 1.25rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.site-footer__kicker {
  margin: 0 0 0.55rem;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.56);
}

.site-footer__title {
  margin: 0 0 0.55rem;
  font-size: 1.5rem;
  line-height: 1.05;
}

.site-footer__text {
  margin: 0;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.8);
}

.site-footer__contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.site-footer__contact-link,
.site-footer__pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
}

.site-footer__contact-link:hover,
.site-footer__contact-link:focus-visible,
.site-footer__pill:hover,
.site-footer__pill:focus-visible {
  transform: translateY(-1px);
  background: rgba(255, 97, 1, 0.16);
  border-color: rgba(255, 97, 1, 0.46);
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(255, 97, 1, 0.16);
  outline: none;
}

.site-footer__area-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.site-footer__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem 1.2rem;
  margin-top: 1rem;
  padding: 0 0.25rem;
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.84rem;
}

@media (max-width: 899px) {
  .top-nav {
    min-height: auto;
    padding: 0.65rem 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0.55rem;
  }

  .top-nav__brand {
    gap: 0.7rem;
  }

  .top-nav__menu {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.65rem;
  }

  .top-nav__tabs {
    width: 100%;
  }

  .top-nav__cta {
    min-height: 42px;
    padding-inline: 0.9rem;
  }

  .site-footer__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 599px) {
  .site-header {
    backdrop-filter: blur(12px);
  }

  .top-nav {
    width: min(1180px, calc(100% - 0.75rem));
    padding: 0.45rem 0;
    gap: 0.45rem;
  }

  .top-nav__brand {
    gap: 0.55rem;
  }

  .top-nav__logo {
    width: 30px;
    height: 30px;
  }

  .top-nav__eyebrow {
    display: none;
  }

  .top-nav__brand-copy {
    gap: 0;
  }

  .top-nav__headline {
    font-size: 0.78rem;
    line-height: 1.15;
  }

  .top-nav__menu {
    gap: 0.45rem;
  }

  .top-nav__tabs .q-tab {
    min-height: 40px;
    padding: 0 0.2rem;
  }

  .top-nav__tabs .q-tab__label {
    line-height: 1;
  }

  .top-nav__tab {
    font-size: 0.7rem;
  }

  .top-nav__cta {
    min-height: 40px;
    padding-inline: 0.75rem;
    font-size: 0.75rem;
  }

  .site-container {
    padding-top: 0.5rem;
  }

  .brand-banner {
    margin-bottom: 0.5rem;
  }

  .brand-banner__link {
    width: min(270px, 70vw);
  }

  .site-footer {
    margin-top: 1.25rem;
  }

  .site-footer__inner {
    width: min(1180px, calc(100% - 0.75rem));
    padding: 1rem 0 1.5rem;
  }

  .site-footer__panel {
    padding: 1rem;
  }

  .site-footer__title {
    font-size: 1.2rem;
  }

  .site-footer__contact-list,
  .site-footer__area-list {
    gap: 0.5rem;
  }

  .site-footer__contact-link,
  .site-footer__pill {
    width: 100%;
    justify-content: flex-start;
    min-height: 40px;
    padding: 0.6rem 0.85rem;
  }

  .site-footer__meta {
    flex-direction: column;
    gap: 0.45rem;
  }
}
</style>
