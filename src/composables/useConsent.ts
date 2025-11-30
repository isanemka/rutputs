import { ref, readonly } from 'vue';

const CONSENT_KEY = 'analytics-consent';

export type ConsentStatus = 'pending' | 'accepted' | 'rejected';

// Reactive state stored at module level so it persists across the app
const consentStatus = ref<ConsentStatus>(getStoredConsent());

function getStoredConsent(): ConsentStatus {
  if (typeof window === 'undefined') {
    return 'pending';
  }
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'accepted' || stored === 'rejected') {
    return stored;
  }
  return 'pending';
}

function setConsent(status: 'accepted' | 'rejected'): void {
  localStorage.setItem(CONSENT_KEY, status);
  consentStatus.value = status;
}

export function useConsent() {
  const acceptConsent = () => {
    setConsent('accepted');
  };

  const rejectConsent = () => {
    setConsent('rejected');
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    consentStatus.value = 'pending';
  };

  const hasUserDecided = () => {
    return consentStatus.value !== 'pending';
  };

  const hasAccepted = () => {
    return consentStatus.value === 'accepted';
  };

  return {
    consentStatus: readonly(consentStatus),
    acceptConsent,
    rejectConsent,
    resetConsent,
    hasUserDecided,
    hasAccepted,
  };
}
