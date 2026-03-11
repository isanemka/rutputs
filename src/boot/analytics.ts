import { boot } from 'quasar/wrappers';
import { inject } from '@vercel/analytics';
import { useConsent } from 'src/composables/useConsent';
import { watch } from 'vue';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-5SEKFW68XH';

// Flag to prevent multiple analytics injections
let analyticsInitialized = false;
let googleAnalyticsInitialized = false;

function runWhenIdle(callback: () => void) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 2000 });
    return;
  }

  window.setTimeout(callback, 1);
}

function initializeAnalytics() {
  if (!analyticsInitialized) {
    inject({ mode: 'production' });
    analyticsInitialized = true;
  }
}

function initializeGoogleAnalytics() {
  if (googleAnalyticsInitialized || typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  googleAnalyticsInitialized = true;
}

function initializeAllowedAnalytics() {
  runWhenIdle(() => {
    initializeAnalytics();
    initializeGoogleAnalytics();
  });
}

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag: (...args: unknown[]) => void;
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number;
  }
}

export default boot(() => {
  const { consentStatus, hasAccepted } = useConsent();

  // Initialize analytics only if user has already accepted
  if (hasAccepted()) {
    initializeAllowedAnalytics();
  }

  // Watch for consent changes and initialize analytics when accepted
  watch(consentStatus, (newStatus) => {
    if (newStatus === 'accepted') {
      initializeAllowedAnalytics();
    }
  });
});
