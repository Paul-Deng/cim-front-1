import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

export const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 10,
    icon: 'mdi:view-dashboard-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'index',
      name: 'DashboardDemo',
      component: () => import('../../../views/welcome/index.vueex.vue'),
      meta: {
        title: t('routes.dashboard.index'),
      },
    },
  ],
};
export default dashboard;
