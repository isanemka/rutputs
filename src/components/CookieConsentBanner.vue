<template>
  <q-dialog
    v-model="showBanner"
    persistent
    position="bottom"
    seamless
    :maximized="$q.screen.lt.sm"
    full-width
    class="cookie-dialog"
  >
    <q-card class="cookie-consent-card bg-white text-dark">
      <q-card-section>
        <div class="text-h6 text-primary">Cookies</div>
        <p class="q-mt-sm text-body2">
          Vi använder cookies för att förbättra din upplevelse på vår webbplats.
          Läs mer i vår
          <router-link to="/integritetspolicy" class="text-accent">
            integritetspolicy</router-link
          >.
        </p>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center" class="q-pa-md" :vertical="$q.screen.lt.sm">
        <q-btn
          outline
          label="Avvisa"
          color="grey-7"
          @click="handleReject"
          :class="$q.screen.lt.sm ? 'q-mb-sm full-width' : 'q-mr-sm'"
          aria-label="Avvisa cookies"
        />
        <q-btn
          unelevated
          label="Acceptera"
          color="accent"
          text-color="black"
          @click="handleAccept"
          :class="$q.screen.lt.sm ? 'full-width' : ''"
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
  width: 100%;
  max-width: min(100%, 860px);
  border-radius: 22px 22px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
}

@media (max-width: 599px) {
  .cookie-consent-card {
    border-radius: 18px 18px 0 0;
  }
}
</style>

<style>
/* Override Quasar dialog padding */
.cookie-dialog .q-dialog__inner {
  padding: 0 !important;
}
</style>
