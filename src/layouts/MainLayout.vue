<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-primary text-secondary" height-hint="98">

<!-- Navigation -->
      <q-tabs align="left">
        <q-img
          src="/icons/favicon.png"
          class="q-mx-md"
          style="height: 30px; max-width: 30px"
          @click="goToLanding()"
        />
        <q-route-tab to="/landing" label="Puts på rut" @click="goToLanding()" />
        <q-route-tab to="/priceList" label="Prislista" @click="goToPriceList()" />
        <q-route-tab to="/company" label="Företag" @click="goToCompany()" />
      </q-tabs>
    </q-header>

<!-- Page content -->
      <q-page-container class="q-pa-md">
          <div class="q-flex column items-center">
            <img
              class="fit q-mt-md"
              style="max-width: 900px;"
              src="/icons/main_logo.png"
              alt="Company logo"
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
            <p class="q-ma-md text-uppercase text-bold  text-subtitle3 text-center">Copyright &copy;2024</p>
          </div>
        </div>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import Landing from 'src/components/LandingComponent.vue';
import PriceList from 'src/components/PriceListComponent.vue';
import Company from 'src/components/CompanyComponent.vue';
import Confirmation from 'src/components/ConfirmationComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    Landing,
    PriceList,
    Company,
    Confirmation,
  },
  setup() {
    const router = useRouter();
    const currentComponent = computed(() => {
      switch (router.currentRoute.value.path) {
        case '/landing':
          return 'Landing';
        case '/priceList':
          return 'PriceList';
        case '/company':
          return 'Company';
        case '/confirmation':
          return 'Confirmation';
        default:
          return 'Landing';
      }
    });

    const goToLanding = () => {
      router.push('/landing');
    };

    const goToPriceList = () => {
      router.push('/priceList');
    };

    const goToCompany = () => {
      router.push('/company');
    };

    const goToConfirmation = () => {
      router.push('/confirmation');
    };

    return { currentComponent, goToLanding, goToPriceList, goToCompany, goToConfirmation };
  },
});
</script>

<style>
</style>
