import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

export const mycim: AppRouteModule = {
  path: '/mycim',
  name: 'MyCIM',
  component: LAYOUT,
  redirect: '/mycim/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 30,
    icon: 'mdi:alpha-m-circle-outline',
    title: t('routes.demo.mycim.mycim'),
  },
  children: [
    {
      path: 'index',
      name: 'MyCIMPage',
      component: () => import('/@/views/mycim/mycim.vue'),
      meta: {
        title: t('routes.demo.mycim.mycim'),
        hideMenu: true,
      },
    },
  ],
};

export default mycim;
