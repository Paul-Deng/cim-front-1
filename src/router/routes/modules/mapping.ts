// import type { AppRouteModule } from '/@/router/types';

// import { LAYOUT } from '/@/router/constant';

// export const mapping: AppRouteModule = {
//   path: '/mapping',
//   name: 'Mapping',
//   component: LAYOUT,
//   redirect: '/mapping',
//   meta: {
//     icon: 'ion:arrow-swap',
//     title: '映射',
//   },
//   children: [
//     {
//       path: '/mapping',
//       name: 'Mapping',
//       component: () => import('/@/views/mapping/index.vue'),
//       meta: {
//         title: '映射',
//         icon: 'ion:arrow-swap',
//       },
//     },
//     {
//       path: '/mapping/add',
//       name: 'MappingAdd',
//       component: () => import('/@/views/mapping/NewMapping/index.vue'),
//       meta: {
//         title: '添加映射关系',
//         icon: 'ion:arrow-swap',
//       },
//     },
//     {
//       path: '/mapping/list',
//       name: 'ExistMapping',
//       component: () => import('/@/views/mapping/ExistMapping/index.vue'),
//       meta: {
//         title: '查看映射关系',
//         icon: 'ion:arrow-swap',
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
  redirect: '/mapping/table',
  meta: {
    icon: 'ion:arrow-swap',
    title: '映射',
  },
  children: [
    {
      path: '/mapping/table',
      name: 'MappingTable',
      component: () => import('/@/views/menu/mapping/table/index.vue'),
      meta: {
        title: '表间字段映射关系',
        icon: 'ion:arrow-swap',
      },
    },
    {
      path: '/mapping/table/add',
      name: 'MappingTableAdd',
      component: () => import('/@/views/menu/mapping/table/add/index.vue'),
      meta: {
        title: '添加表间映射关系',
        icon: 'ion:arrow-swap',
      },
    },
    {
      path: '/mapping/column',
      name: 'MappingColumn',
      component: () => import('/@/views/menu/mapping/column/index.vue'),
      meta: {
        title: '字段映射',
        icon: 'ion:arrow-swap',
      },
    },
    {
      path: '/mapping/column/add',
      name: 'MappingColumnAdd',
      component: () => import('/@/views/menu/mapping/column/index.vue'),
      meta: {
        title: '添加字段映射关系',
        icon: 'ion:arrow-swap',
      },
    },
  ],
};
