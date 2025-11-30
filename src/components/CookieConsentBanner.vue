<template>
  <q-dialog
    v-model="showBanner"
    persistent
    position="bottom"
    seamless
    :maximized="$q.screen.lt.sm"
  >
    <q-card class="cookie-consent-card bg-white text-dark">
      <q-card-section>
        <div class="text-h6 text-primary">Cookieinställningar</div>
        <p class="q-mt-sm text-body2">
          Vi använder Vercel Analytics för att förbättra vår webbplats. Detta
          verktyg samlar in anonym information om hur du använder webbplatsen,
          till exempel vilka sidor du besöker och vilken enhet du använder.
          Ingen personlig information delas med tredje part.
        </p>
        <p class="text-body2">
          Du kan läsa mer om hur vi hanterar din data i vår
          <router-link to="/integritetspolicy" class="text-accent">
            integritetspolicy</router-link
          >.
        </p>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center" class="q-pa-md">
        <q-btn
          flat
          label="Avvisa"
          color="grey-7"
          @click="handleReject"
          class="q-mr-sm"
          aria-label="Avvisa cookies"
        />
        <q-btn
          unelevated
          label="Acceptera"
          color="accent"
          text-color="black"
          @click="handleAccept"
          aria-label="Acceptera cookies"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useConsent } from 'src/composables/useConsent';

export default defineComponent({
  name: 'CookieConsentBanner',
  setup() {
    const {
      consentStatus,
      showBannerTrigger,
      acceptConsent,
      rejectConsent,
      hasUserDecided,
    } = useConsent();
    const showBanner = ref(false);

    onMounted(() => {
      // Only show banner if user hasn't made a decision yet
      if (!hasUserDecided()) {
        showBanner.value = true;
      }
    });

    // Watch for external trigger to show banner
    watch(showBannerTrigger, () => {
      showBanner.value = true;
    });

    const handleAccept = () => {
      acceptConsent();
      showBanner.value = false;
    };

    const handleReject = () => {
      rejectConsent();
      showBanner.value = false;
    };

    const show = () => {
      showBanner.value = true;
    };

    return {
      showBanner,
      consentStatus,
      handleAccept,
      handleReject,
      show,
    };
  },
});
</script>

<style scoped>
.cookie-consent-card {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 599px) {
  .cookie-consent-card {
    max-width: 100%;
    border-radius: 16px 16px 0 0;
  }
}
</style>
