import { RouteRecordRaw } from 'vue-router';
import LandingComponent from 'components/LandingComponent.vue';
import PriceListComponent from 'components/PriceListComponent.vue';
import CompanyComponent from 'components/CompanyComponent.vue';
import ConfirmationComponent from 'src/components/ConfirmationComponent.vue';
import FormFailComponent from 'src/components/FormFailComponent.vue';
import PrivacyPolicyComponent from 'src/components/PrivacyPolicyComponent.vue';
import AreaComponent from 'src/components/AreaComponent.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'pris',
        component: PriceListComponent,
      },
      {
        path: 'foretag',
        component: CompanyComponent,
      },
      {
        path: 'bekraftelse',
        component: ConfirmationComponent,
      },
      {
        path: 'fel',
        component: FormFailComponent,
      },
      {
        path: 'integritetspolicy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'omrade/:area',
        component: AreaComponent,
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
