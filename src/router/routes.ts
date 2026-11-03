import { NavigationGuard, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { getAreaBySlug, getServiceBySlug } from 'src/data/seo';
import { getGuideBySlug } from 'src/data/guides';

// Render the 404 page for an unknown slug while keeping the requested URL,
// instead of redirecting to a separate /404 address.
const decodeSegment = (segment: string) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

// Named-route params are encoded by the router, so pass decoded segments;
// otherwise /omrade/a%20b would become /omrade/a%2520b.
const notFound = (to: RouteLocationNormalized) => ({
  name: 'not-found',
  params: { pathMatch: to.path.substring(1).split('/').map(decodeSegment) },
  query: to.query,
  hash: to.hash,
});

type SlugExists = (to: RouteLocationNormalized) => boolean;

/**
 * Global guard (registered in router/index.ts). Routes with a slug declare
 * meta.slugExists; an unknown slug renders the 404 page. A per-route
 * beforeEnter would not run when only the slug changes, e.g. client-side
 * navigation from /omrade/kista to /omrade/okand.
 */
export const guardUnknownSlugs: NavigationGuard = (to) => {
  const slugExists = to.meta.slugExists as SlugExists | undefined;
  return !slugExists || slugExists(to) ? true : notFound(to);
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('components/LandingComponent.vue'),
      },
      {
        path: 'pris',
        component: () => import('components/PriceListComponent.vue'),
      },
      {
        path: 'foretag',
        component: () => import('components/CompanyComponent.vue'),
      },
      {
        path: 'bekraftelse',
        component: () => import('src/components/ConfirmationComponent.vue'),
      },
      {
        path: 'fel',
        component: () => import('src/components/FormFailComponent.vue'),
      },
      {
        path: 'integritetspolicy',
        component: () => import('src/components/PrivacyPolicyComponent.vue'),
      },
      {
        path: 'omrade/:area',
        component: () => import('src/components/AreaComponent.vue'),
        meta: { slugExists: ((to) => !!getAreaBySlug(to.params.area as string)) as SlugExists },
      },
      {
        path: 'tjanst/:service',
        component: () => import('src/components/ServicePageComponent.vue'),
        meta: { slugExists: ((to) => !!getServiceBySlug(to.params.service as string)) as SlugExists },
      },
      {
        path: 'guide',
        component: () => import('src/components/GuideHubComponent.vue'),
      },
      {
        path: 'guide/:slug',
        component: () => import('src/components/GuideComponent.vue'),
        meta: { slugExists: ((to) => !!getGuideBySlug(to.params.slug as string)) as SlugExists },
      },
      // Always leave this as the last one. Rendered inside the layout so the
      // 404 page keeps navigation and footer links.
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
  },
];

export default routes;
