import { RouteRecordRaw } from 'vue-router';

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
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
