<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-primary text-secondary" height-hint="98">

<!-- Navigation -->
      <nav aria-label="Huvudnavigering" class="row items-center no-wrap">
        <q-img
          src="/icons/favicon.png"
          alt="Rutputs logotyp"
          role="img"
          class="q-mx-md"
          style="height: 30px; max-width: 30px"
          @click="goToLanding()"
        />
        <q-tabs align="left">
          <q-route-tab to="/" label="Puts på rut" @click="goToLanding()" />
          <q-route-tab to="/pris" label="Prislista" @click="goToPriceList()" />
          <q-route-tab to="/foretag" label="Företag" @click="goToCompany()" />
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
        <div class="col">
          <p class="q-ma-xl text-uppercase text-bold text-subtitle1 text-center">
            Telefon: <a href="tel:+46734644604" class="text-secondary">0734-64 46 04</a>
            <span class="q-mx-sm" aria-hidden="true">|</span>
            E-post: <a href="mailto:kontakt@rutputs.nu" class="text-secondary">kontakt@rutputs.nu</a>
          </p>
        </div>
      </div>
      <q-separator color="accent" />
        <div class="row justify-center text-overline">
          <div class="col">
            <p class="q-ma-md text-uppercase text-bold text-subtitle2 text-center">
              Godkänd för F-skatt
            </p>
          </div>
        </div>
        <q-separator color="accent" />
        <div class="row justify-center q-pa-sm">
          <div class="col text-center">
            <p class="text-subtitle2 text-uppercase text-bold q-mb-xs">Områden</p>
            <p class="text-caption">
              <template v-for="(a, i) in areaLinks" :key="a.slug">
                <router-link :to="'/omrade/' + a.slug" class="text-secondary">
                  {{ a.name + ' '}}
                </router-link>
                <span v-if="i < areaLinks.length - 1" class="q-mx-xs" aria-hidden="true">|</span>
              </template>
            </p>
          </div>
        </div>
        <q-separator color="accent" />
        <div class="row justify-center text-overline">
          <div class="col">
            <p class="q-ma-md text-uppercase text-bold  text-subtitle3 text-center">
              Copyright &copy;{{ currentYear }} | Webbplats av
              <a href="https://pixelpioneer.se" target="_blank" rel="noopener" class="text-accent">PixelPioneer</a>
              <span class="q-mx-sm" aria-hidden="true">|</span>
              <router-link to="/integritetspolicy" class="text-secondary">Integritetspolicy</router-link>
              <span class="q-mx-sm" aria-hidden="true">|</span>
              <a href="#" class="text-secondary" @click.prevent="openCookieSettings">Cookieinställningar</a>
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

    const goToPriceList = () => {
      router.push('/pris');
    };

    const goToCompany = () => {
      router.push('/foretag');
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
      goToPriceList,
      goToCompany,
      goToConfirmation,
      goToFormFail,
      openCookieSettings,
    };
  },
});
</script>

<style>
</style>
