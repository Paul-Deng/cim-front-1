import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';
import { dashboard } from '/@/router/routes/modules/dashboard';
import { mapping } from '/@/router/routes/modules/mapping';
// import { mapping } from '/@/router/routes/modules/mapping';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

// export const MapRoute: AppRouteRecordRaw = {
//   path: '/mapping',
//   name: 'Map',
//   component: () => import('/@/views/mapping/NewMapping/index.vue'),
//   // redirect: PageEnum.BASE_TEST,
//   meta: {
//     title: 'TEST-MAP',
//   },
// };

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

export const KingdeeCloudLoginRoute: AppRouteRecordRaw = {
  path: '/oauth/kd',
  name: 'KingdeeCloud',
  component: () => import('/@/views/sys/sso/kd/index.vue'),
  meta: {
    ignoreAuth: true,
    title: '云之家授权登录',
    icon: 'bx:bx-home',
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  dashboard,
  RootRoute,
  mapping,
  // MapRoute,
  KingdeeCloudLoginRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
