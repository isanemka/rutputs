import { RouteRecordRaw } from 'vue-router';
import LandingComponent from 'components/LandingComponent.vue';
import PriceListComponent from 'components/PriceListComponent.vue';
import CompanyComponent from 'components/CompanyComponent.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'landing',
        component: LandingComponent,
      },
      {
        path: 'priceList',
        component: PriceListComponent,
      },
      {
        path: 'company',
        component: CompanyComponent,
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
