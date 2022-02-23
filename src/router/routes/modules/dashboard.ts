import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

export const dashboard: AppRouteModule = {
  path: '/welcome',
  name: 'Welcome',
  component: LAYOUT,
  redirect: '/welcome/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 10,
    icon: 'mdi:view-dashboard-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'index',
      name: 'WelcomeDemo',
      component: () => import('/@/views/welcome/index.vue'),
      meta: {
        title: t('routes.dashboard.index'),
      },
    },
  ],
};
export default dashboard;
