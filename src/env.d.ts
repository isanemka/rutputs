/* eslint-disable */

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
