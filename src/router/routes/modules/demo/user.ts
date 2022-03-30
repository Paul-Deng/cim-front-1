import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/files',
  meta: {
    icon: 'mdi:page-next-outline',
    title: t('routes.menus.user.user'),
  },
  children: [
    // {
    //   path: '/user/list',
    //   name: 'UserModels',
    //   component: () => import('/@/views/sys/user/model/index.vue'),
    //   meta: {
    //     title: t('routes.menus.user.my'),
    //   },
    // },
    // {
    //   path: '/user/setting',
    //   name: 'UserSetting',
    //   component: () => import('/@/views/sys/user/setting/index.vue'),
    //   meta: {
    //     title: t('routes.menus.user.setting'),
    //   },
    // },
    {
      path: '/user/files',
      name: 'UserFiles',
      component: () => import('/@/views/sys/user/file/index.vue'),
      meta: {
        title: t('routes.menus.user.setting'),
      },
    },
    // {
    //   path: '/user/info',
    //   name: 'UserInfo',
    //   component: () => import('/@/views/sys/user/info/index.vue'),
    //   meta: {
    //     title: t('routes.menus.user.info'),
    //   },
    // },
  ],
};

export default user;
