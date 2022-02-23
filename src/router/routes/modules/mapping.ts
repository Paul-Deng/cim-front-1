// import type { AppRouteModule } from '/@/router/types';
// import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

// export const mapping: AppRouteModule = {
//   path: '/mapping',
//   name: 'MAPPING',
//   component: LAYOUT,
//   redirect: '/mapping',
//   meta: {
//     hideChildrenInMenu: true,
//     icon: 'icon-park-outline:mind-mapping',
//     title: t('routes.dashboard.mapping'),
//     orderNo: 25,
//   },
//   children: [
//     {
//       path: 'index',
//       name: 'MappingDemo',
//       component: () => import('../../../views/mapping/index.vue'),
//       meta: {
//         title: t('routes.dashboard.mapping'),
//         icon: 'simple-icons:about-dot-me',
//         hideMenu: true,
//       },
//     },
//   ],
// };
// export default mapping;
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

export const mapping: AppRouteModule = {
  path: '/mapping',
  name: 'Mapping',
  component: LAYOUT,
  redirect: '/mapping',
  meta: {
    icon: 'ion:arrow-swap',
    title: '映射',
  },
  children: [
    {
      path: '/mapping',
      name: 'Mapping',
      component: () => import('/@/views/mapping/index.vue'),
      meta: {
        title: '映射',
        icon: 'ion:arrow-swap',
      },
    },
    {
      path: '/mapping/add',
      name: 'MappingTableAdd',
      component: () => import('/@/views/mapping/NewMapping/index.vue'),
      meta: {
        title: '添加映射关系',
        icon: 'ion:arrow-swap',
      },
    },
    {
      path: '/mapping/list',
      name: 'ExistMapping',
      component: () => import('/@/views/mapping/ExistMapping/index.vue'),
      meta: {
        title: '查看映射关系',
        icon: 'ion:arrow-swap',
      },
    },
  ],
};

export default mapping;
