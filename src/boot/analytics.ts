import { boot } from 'quasar/wrappers';
import { inject } from '@vercel/analytics';
import { CONSENT_KEY, useConsent } from 'src/composables/useConsent';
import { watch } from 'vue';

const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-5SEKFW68XH';
const GTM_ID = import.meta.env.VITE_GTM_ID;
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID;
const GOOGLE_ADS_CONVERSION_LABEL = import.meta.env
  .VITE_GOOGLE_ADS_CONVERSION_LABEL;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;

// Flag to prevent multiple analytics injections
let analyticsInitialized = false;
let googleAnalyticsInitialized = false;
let googleAdsInitialized = false;
let metaPixelInitialized = false;
let clarityInitialized = false;
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

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
}

function trackConversion(
  conversionType: 'lead' | 'phone_call' | 'form_submit',
  params: Record<string, unknown> = {},
) {
  if (typeof window === 'undefined' || !hasTrackingConsent()) {
    return;
  }

  if (
    typeof window.gtag === 'function' &&
    GOOGLE_ADS_ID &&
    GOOGLE_ADS_CONVERSION_LABEL
  ) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      ...params,
    });
  }

  if (typeof window.fbq === 'function') {
    const fbEventName = conversionType === 'lead' ? 'Lead' : 'Contact';
    window.fbq('track', fbEventName, params);
  }

  trackEvent(`conversion_${conversionType}`, params);
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

  trackConversion('phone_call', {
    phone_number: phoneNumber,
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

function initializeGoogleAds() {
  if (
    googleAdsInitialized ||
    typeof window === 'undefined' ||
    !GOOGLE_ADS_ID ||
    GTM_ID
  ) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
  }

  window.gtag('config', GOOGLE_ADS_ID);

  // gtag.js script is shared with GA; load only if GA didn't already
  if (!googleAnalyticsInitialized) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(script);
  }

  googleAdsInitialized = true;
}

function initializeMetaPixel() {
  if (metaPixelInitialized || typeof window === 'undefined' || !META_PIXEL_ID) {
    return;
  }

  // Standard Meta Pixel snippet (slimmed)
  /* eslint-disable */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');

  metaPixelInitialized = true;
}

function initializeClarity() {
  if (clarityInitialized || typeof window === 'undefined' || !CLARITY_ID) {
    return;
  }

  /* eslint-disable */
  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
  /* eslint-enable */

  clarityInitialized = true;
}

function initializeAllowedAnalytics() {
  runWhenIdle(() => {
    initializeAnalytics();
    initializeGoogleTagManager();
    initializeGoogleAnalytics();
    initializeGoogleAds();
    initializeMetaPixel();
    initializeClarity();
    bindPhoneClickTracking();
  });
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: unknown;
    };
    _fbq?: unknown;
  }
}

export { trackEvent, trackConversion };

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
