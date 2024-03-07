<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-secondary text-accent" height-hint="98">

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
    <q-page-container>
      <q-page class="q-pa-md">
        <div class="q-flex column items-center">
          <img
            class="fit"
            style="max-width: 900px;"
            src="/icons/main_logo.png"
            alt="Company logo"
            @click="goToLanding()"
          />
        </div>
        <component :is="currentComponent" :title="currentComponent" />
      </q-page>
    </q-page-container>

    <q-footer elevated class="text-black footer-style">
      <q-row class="text-overline">
        <q-col>
          <p class="text-uppercase q-ma-xl text-subtitle1 text-center">
            Telefon: 0734-64 46 04
          </p>
        </q-col>
      </q-row>
      <q-separator color="white" />
        <q-row class="text-overline">
          <q-col>
            <p class="text-uppercase q-ma-xl text-subtitle1 text-center">
              E-Mail: kontakt (at) rutputs.nu
            </p>
          </q-col>
        </q-row>
        <q-separator color="white" />
        <q-row class="text-overline">
          <q-col>
            <p class="text-uppercase q-ma-md text-center">Copyright &copy;2024</p>
          </q-col>
        </q-row>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import Landing from 'src/components/LandingComponent.vue';
import PriceList from 'src/components/PriceListComponent.vue';
import Company from 'src/components/CompanyComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    Landing,
    PriceList,
    Company,
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

    return { currentComponent, goToLanding, goToPriceList, goToCompany };
  },
});
</script>

<style>
.footer-style {
  background-color: #a3a3a3;
}
</style>
