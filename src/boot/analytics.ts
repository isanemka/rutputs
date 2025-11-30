import { boot } from 'quasar/wrappers';
import { inject } from '@vercel/analytics';
import { useConsent } from 'src/composables/useConsent';
import { watch } from 'vue';

export default boot(() => {
  const { consentStatus, hasAccepted } = useConsent();

  // Initialize analytics only if user has already accepted
  if (hasAccepted()) {
    inject({ mode: 'production' });
  }

  // Watch for consent changes and initialize analytics when accepted
  watch(consentStatus, (newStatus) => {
    if (newStatus === 'accepted') {
      inject({ mode: 'production' });
    }
  });
});
