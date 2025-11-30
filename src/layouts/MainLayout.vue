<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-primary text-secondary" height-hint="98">

<!-- Navigation -->
      <q-tabs align="left" role="tablist">
        <q-img
          src="/icons/favicon.png"
          aria-label="Company logo without text"
          role="img"
          class="q-mx-md"
          style="height: 30px; max-width: 30px"
          @click="goToLanding()"
        />
        <q-route-tab to="/" label="Puts på rut" @click="goToLanding()" />
        <q-route-tab to="/pris" label="Prislista" @click="goToPriceList()" />
        <q-route-tab to="/foretag" label="Företag" @click="goToCompany()" />
      </q-tabs>
    </q-header>

<!-- Page content -->
      <q-page-container class="q-pa-md">
          <div class="q-flex column items-center">
            <img
              class="fit q-mt-md"
              aria-label="Company logo with text"
              style="max-width: 900px;"
              src="/icons/main_logo.png"
              @click="goToLanding()"
            />
          </div>
          <component :is="currentComponent" :title="currentComponent" />
      </q-page-container>

    <q-footer elevated class="bg-primary text-secondary">
      <div class="row justify-center text-overline">
        <div class="col">
          <p class="q-ma-xl text-uppercase text-bold text-subtitle1 text-center">
            Telefon: 0734-64 46 04
          </p>
        </div>
      </div>
      <q-separator color="accent" />
        <div class="row justify-center text-overline">
          <div class="col">
            <p class="q-ma-xl text-uppercase text-bold text-subtitle1 text-center">
              E-Mail: kontakt (at) rutputs.nu
            </p>
          </div>
        </div>
        <q-separator color="accent" />
        <div class="row justify-center text-overline">
          <div class="col">
            <p class="q-ma-md text-uppercase text-bold  text-subtitle3 text-center">Copyright &copy;{{ currentYear }}</p>
          </div>
        </div>
        <q-separator color="accent" />
        <div class="row justify-center text-overline">
          <div class="col">
            <p class="q-ma-md text-subtitle2 text-center">
              <router-link to="/integritetspolicy" class="text-secondary">Integritetspolicy</router-link>
              <span class="q-mx-sm">|</span>
              <a href="#" class="text-secondary" @click.prevent="openCookieSettings">Cookieinställningar</a>
            </p>
          </div>
        </div>
    </q-footer>

    <!-- Cookie Consent Banner -->
    <CookieConsentBanner ref="cookieConsentRef" />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Landing from 'src/components/LandingComponent.vue';
import PriceList from 'src/components/PriceListComponent.vue';
import Company from 'src/components/CompanyComponent.vue';
import Confirmation from 'src/components/ConfirmationComponent.vue';
import FormFail from 'src/components/FormFailComponent.vue';
import PrivacyPolicy from 'src/components/PrivacyPolicyComponent.vue';
import CookieConsentBanner from 'src/components/CookieConsentBanner.vue';
import { useConsent } from 'src/composables/useConsent';

export default defineComponent({
  name: 'App',
  components: {
    Landing,
    PriceList,
    Company,
    Confirmation,
    FormFail,
    PrivacyPolicy,
    CookieConsentBanner,
  },
  setup() {
    const router = useRouter();
    const { triggerShowBanner } = useConsent();
    const cookieConsentRef = ref<InstanceType<typeof CookieConsentBanner> | null>(null);

    const currentComponent = computed(() => {
      switch (router.currentRoute.value.path) {
        case '/':
          return 'Landing';
        case '/pris':
          return 'PriceList';
        case '/foretag':
          return 'Company';
        case '/bekraftelse':
          return 'Confirmation';
        case '/fel':
          return 'FormFail';
        case '/integritetspolicy':
          return 'PrivacyPolicy';
        default:
          return 'Landing';
      }
    });

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

    return {
      currentComponent,
      currentYear,
      goToLanding,
      goToPriceList,
      goToCompany,
      goToConfirmation,
      goToFormFail,
      openCookieSettings,
      cookieConsentRef,
    };
  },
});
</script>

<style>
</style>
