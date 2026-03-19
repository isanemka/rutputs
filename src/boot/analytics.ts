import { boot } from 'quasar/wrappers';
import { inject } from '@vercel/analytics';
import { CONSENT_KEY, useConsent } from 'src/composables/useConsent';
import { watch } from 'vue';

const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-5SEKFW68XH';
const GTM_ID = import.meta.env.VITE_GTM_ID;

// Flag to prevent multiple analytics injections
let analyticsInitialized = false;
let googleAnalyticsInitialized = false;
let tagManagerInitialized = false;
let phoneClickTrackingBound = false;

function hasTrackingConsent() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
}

function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !hasTrackingConsent()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const phoneLink = target.closest('a[href^="tel:"]');
  if (!(phoneLink instanceof HTMLAnchorElement)) {
    return;
  }

  const phoneNumber =
    phoneLink.getAttribute('href')?.replace(/^tel:/, '') || '';

  trackEvent('phone_click', {
    phone_number: phoneNumber,
    link_text: phoneLink.textContent?.trim() || phoneNumber,
    page_location: window.location.href,
  });
}

function bindPhoneClickTracking() {
  if (phoneClickTrackingBound || typeof document === 'undefined') {
    return;
  }

  document.addEventListener('click', handleDocumentClick);
  phoneClickTrackingBound = true;
}

function runWhenIdle(callback: () => void) {
  if (typeof window === 'undefined') {
    setTimeout(callback, 1);
    return;
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 2000 });
    return;
  }

  setTimeout(callback, 1);
}

function initializeAnalytics() {
  if (!analyticsInitialized) {
    inject({ mode: 'production' });
    analyticsInitialized = true;
  }
}

function initializeGoogleTagManager() {
  if (tagManagerInitialized || typeof window === 'undefined' || !GTM_ID) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  tagManagerInitialized = true;
}

function initializeGoogleAnalytics() {
  if (googleAnalyticsInitialized || typeof window === 'undefined' || GTM_ID) {
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
    initializeGoogleTagManager();
    initializeGoogleAnalytics();
    bindPhoneClickTracking();
  });
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  }
}

export { trackEvent };

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
