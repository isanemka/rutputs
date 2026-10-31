import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { getAreaBySlug, getServiceBySlug } from 'src/data/seo';
import { getGuideBySlug } from 'src/data/guides';

// Render the 404 page for an unknown slug while keeping the requested URL,
// instead of redirecting to a separate /404 address.
const notFound = (to: RouteLocationNormalized) => ({
  name: 'not-found',
  params: { pathMatch: to.path.substring(1).split('/') },
  query: to.query,
  hash: to.hash,
});

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
        beforeEnter: (to) => (getAreaBySlug(to.params.area as string) ? true : notFound(to)),
      },
      {
        path: 'tjanst/:service',
        component: () => import('src/components/ServicePageComponent.vue'),
        beforeEnter: (to) => (getServiceBySlug(to.params.service as string) ? true : notFound(to)),
      },
      {
        path: 'guide',
        component: () => import('src/components/GuideHubComponent.vue'),
      },
      {
        path: 'guide/:slug',
        component: () => import('src/components/GuideComponent.vue'),
        beforeEnter: (to) => (getGuideBySlug(to.params.slug as string) ? true : notFound(to)),
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
