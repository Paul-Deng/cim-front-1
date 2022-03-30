import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const mapping: AppRouteModule = {
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

export default mapping;
