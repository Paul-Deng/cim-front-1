// import { resultSuccess, getRequestToken, requestParams } from '../_util';
// import { MockMethod } from 'vite-plugin-mock';
// import { createFakeUserList } from './user';

// const dashboardRoute = {
//   path: '/dashboard',
//   name: 'Dashboard',
//   component: 'LAYOUT',
//   redirect: '/dashboard/index',
//   meta: {
//     hideChildrenInMenu: true,
//     orderNo: 10,
//     icon: 'mdi:view-dashboard-outline',
//     title: 'routes.dashboard.dashboard',
//   },
//   children: [
//     {
//       path: 'index',
//       name: 'DashboardDemo',
//       component: '/welcome/index',
//       // component: () => import('/@/views/lxmongo/index.vue'),
//       meta: {
//         title: 'routes.dashboard.index',
//       },
//     },
//   ],
// };

// const kcimRoute = {
//   path: '/kcim',
//   name: 'KCIM',
//   component: 'LAYOUT',
//   redirect: '/kcim/index',
//   meta: {
//     hideChildrenInMenu: true,
//     orderNo: 20,
//     icon: 'mdi:alpha-k-circle-outline',
//     title: 'routes.demo.kcim.kcim',
//   },
//   children: [
//     {
//       path: 'index',
//       name: 'KCIMDemo',
//       component: '/kcim/kcim',
//       meta: {
//         title: 'routes.demo.kcim.kcim',
//         hideMenu: true,
//       },
//     },
//   ],
// };

// const mycimRoute = {
//   path: '/mycim',
//   name: 'MyCIM',
//   component: 'LAYOUT',
//   redirect: '/mycim/index',
//   meta: {
//     hideChildrenInMenu: true,
//     orderNo: 30,
//     icon: 'mdi:alpha-m-circle-outline',
//     title: 'routes.demo.mycim.mycim',
//   },
//   children: [
//     {
//       path: 'index',
//       name: 'MyCIMPage',
//       component: '/mycim/mycim',
//       // component: () => import('/@/views/lxmongo/mycim.vue'),
//       meta: {
//         title: 'routes.demo.mycim.mycim',
//         hideMenu: true,
//       },
//     },
//   ],
// };

// const cimRoute = {
//   path: '/cim',
//   name: 'CIM',
//   component: 'LAYOUT',
//   redirect: '/cim/index',
//   meta: {
//     hideChildrenInMenu: true,
//     orderNo: 15,
//     icon: 'mdi:alpha-c-circle-outline',
//     title: 'routes.demo.cim.cim',
//   },
//   children: [
//     {
//       path: 'index',
//       name: 'CIMDemo',
//       component: '/cim/cim',
//       // component: () => import('/@/views/lxmongo/cim.vue'),
//       meta: {
//         title: 'routes.demo.cim.cim',
//         currentActiveMenu: '/cim',
//       },
//     },
//   ],
// };

// const mappingRoute = {
//   path: '/mapping',
//   name: 'MAPPING',
//   component: 'LAYOUT',
//   redirect: '/mapping/index',
//   meta: {
//     hideChildrenInMenu: true,
//     icon: 'icon-park-outline:mind-mapping',
//     title: 'routes.dashboard.mapping',
//     orderNo: 25,
//   },
//   children: [
//     {
//       path: 'index',
//       name: 'MappingDemo',
//       component: '/mapping/mapping',
//       // component: () => import('/@/views/lxmongo/mapping.vue'),
//       meta: {
//         title: 'routes.dashboard.mapping',
//         icon: 'simple-icons:about-dot-me',
//         hideMenu: true,
//       },
//     },
//   ],
// };

// const permissionRoute = {
//   path: '/permission',
//   name: 'PERMISSION',
//   component: 'LAYOUT',
//   redirect: '/permission/index',
//   meta: {
//     hideChildrenInMenu: true,
//     icon: 'icon-park-outline:permissions',
//     title: 'routes.demo.permission.permission',
//     orderNo: 25,
//   },
//   children: [
//     {
//       path: 'index',
//       name: 'PermissionDemo',
//       component: '/lxmongo/permission',
//       meta: {
//         title: 'routes.demo.permission.permission',
//         icon: 'icon-park-outline:permissions',
//         hideMenu: true,
//       },
//     },
//   ],
// };

// const sysRoute = {
//   path: '/system',
//   name: 'System',
//   component: 'LAYOUT',
//   redirect: '/system/account',
//   meta: {
//     icon: 'ion:settings-outline',
//     title: 'routes.demo.system.moduleName',
//   },
//   children: [
//     {
//       path: 'account',
//       name: 'AccountManagement',
//       meta: {
//         title: 'routes.demo.system.account',
//         ignoreKeepAlive: true,
//       },
//       component: '/system/account/index',
//     },
//     {
//       path: 'account_detail/:id',
//       name: 'AccountDetail',
//       meta: {
//         hideMenu: true,
//         title: 'routes.demo.system.account_detail',
//         ignoreKeepAlive: true,
//         showMenu: false,
//         currentActiveMenu: '/system/account',
//       },
//       component: '/system/account/AccountDetail',
//     },
//     {
//       path: 'role',
//       name: 'RoleManagement',
//       meta: {
//         title: 'routes.demo.system.role',
//         ignoreKeepAlive: true,
//       },
//       component: '/system/role/index',
//     },

//     {
//       path: 'menu',
//       name: 'MenuManagement',
//       meta: {
//         title: 'routes.demo.system.menu',
//         ignoreKeepAlive: true,
//       },
//       component: '/system/menu/index',
//     },
//     {
//       path: 'dept',
//       name: 'DeptManagement',
//       meta: {
//         title: 'routes.demo.system.dept',
//         ignoreKeepAlive: true,
//       },
//       component: '/system/dept/index',
//     },
//     {
//       path: 'changePassword',
//       name: 'ChangePassword',
//       meta: {
//         title: 'routes.demo.system.password',
//         ignoreKeepAlive: true,
//       },
//       component: '/system/password/index',
//     },
//   ],
// };

// export default [
//   {
//     url: '/api/getMenuListMock',
//     timeout: 1000,
//     method: 'get',
//     response: (request: requestParams) => {
//       const token = getRequestToken(request);
//       let menu: Object[];
//       if (!token) {
//         dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path;
//         menu = [dashboardRoute, kcimRoute, cimRoute, mappingRoute, permissionRoute, sysRoute];
//         return resultSuccess(menu);
//       }
//       const checkUser = createFakeUserList().find((item) => item.token === token);
//       if (!checkUser) {
//         dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path;
//         menu = [dashboardRoute, kcimRoute, mycimRoute, cimRoute, mappingRoute];
//         return resultSuccess(menu);
//       }
//       const id = checkUser.userId;
//       switch (id) {
//         case '1':
//           dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path;
//           menu = [dashboardRoute, kcimRoute];
//           break;
//         case '2':
//           dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[1].path;
//           menu = [dashboardRoute, kcimRoute, mycimRoute, cimRoute, mappingRoute];
//           break;
//         default:
//           menu = [dashboardRoute, kcimRoute, mycimRoute, cimRoute, mappingRoute];
//       }

//       return resultSuccess(menu);
//     },
//   },
// ] as MockMethod[];
