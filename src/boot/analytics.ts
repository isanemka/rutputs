import { boot } from 'quasar/wrappers';
import { inject } from '@vercel/analytics';
import { useConsent } from 'src/composables/useConsent';
import { watch } from 'vue';

// Flag to prevent multiple analytics injections
let analyticsInitialized = false;

function initializeAnalytics() {
  if (!analyticsInitialized) {
    inject({ mode: 'production' });
    analyticsInitialized = true;
  }
}

export default boot(() => {
  const { consentStatus, hasAccepted } = useConsent();

  // Initialize analytics only if user has already accepted
  if (hasAccepted()) {
    initializeAnalytics();
  }

  // Watch for consent changes and initialize analytics when accepted
  watch(consentStatus, (newStatus) => {
    if (newStatus === 'accepted') {
      initializeAnalytics();
    }
  });
});
