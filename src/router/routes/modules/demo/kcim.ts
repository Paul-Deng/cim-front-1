import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

export const kcim: AppRouteModule = {
  path: '/kcim',
  name: 'KCIM',
  component: LAYOUT,
  redirect: '/kcim/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 20,
    icon: 'mdi:alpha-k-circle-outline',
    title: t('routes.demo.kcim.kcim'),
  },
  children: [
    {
      path: 'index',
      name: 'KCIMDemo',
      component: () => import('../../../../views/kcim/kcim.vue'),
      meta: {
        title: t('routes.demo.kcim.kcim'),
        hideMenu: true,
      },
    },
  ],
};

export default kcim;
