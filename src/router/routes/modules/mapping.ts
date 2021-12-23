import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

export const mapping: AppRouteModule = {
  path: '/mapping',
  name: 'MAPPING',
  component: LAYOUT,
  redirect: '/mapping/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'icon-park-outline:mind-mapping',
    title: t('routes.dashboard.mapping'),
    orderNo: 25,
  },
  children: [
    {
      path: 'index',
      name: 'MappingDemo',
      component: () => import('../../../views/mapping/index.vue'),
      meta: {
        title: t('routes.dashboard.mapping'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default mapping;
