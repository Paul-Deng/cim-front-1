// import { resultSuccess } from '../_util';
// import { MockMethod } from 'vite-plugin-mock';
// import type { DataItem, MenuDataItem } from '/@/api/sys/model/menuPermission';

// const data: DataItem[] = [
//   {
//     key: '1',
//     userId: '1234',
//     userName: '刘一',
//     userCharacter: '超级管理员',
//     userInfo: 'ADMIN',
//     userRight: '菜单管理，用户管理，用户信息',
//   },
//   {
//     key: '2',
//     userId: '1235',
//     userName: '刘二',
//     userCharacter: '管理员',
//     userInfo: 'CIM',
//     userRight: '菜单管理，用户信息',
//   },
//   {
//     key: '3',
//     userId: '1236',
//     userName: '刘三',
//     userCharacter: '会员',
//     userInfo: 'MYCIM',
//     userRight: '用户信息',
//   },
//   {
//     key: '4',
//     userId: '1237',
//     userName: '刘四',
//     userCharacter: '普通用户',
//     userInfo: 'KD',
//     userRight: '用户信息',
//   },
//   {
//     key: '5',
//     userId: '1238',
//     userName: '刘五',
//     userCharacter: '普通用户',
//     userInfo: 'KD',
//     userRight: '用户信息',
//   },
// ];
// const menuData: MenuDataItem[] = [
//   {
//     key: 1,
//     menuName: '首页',
//     menuURL: '/dashboard/index',
//     menuPath: '?',
//     menuCSS: 'LAYOUT',
//     menuNo: 1,
//     menuType: '菜单',
//     menuOperate: '修改/删除',
//   },
//   {
//     key: 2,
//     menuName: 'KCIM',
//     menuURL: '/kcim/index',
//     menuPath: '?',
//     menuCSS: 'LAYOUT',
//     menuNo: 2,
//     menuType: '菜单',
//     menuOperate: '修改/删除',
//   },
//   {
//     key: 3,
//     menuName: 'CIM',
//     menuURL: '/cim/index',
//     menuPath: '?',
//     menuCSS: 'LAYOUT',
//     menuNo: 3,
//     menuType: '菜单',
//     menuOperate: '修改/删除',
//   },
//   {
//     key: 4,
//     menuName: '映射',
//     menuURL: '/mapping/index',
//     menuPath: '?',
//     menuCSS: 'LAYOUT',
//     menuNo: 4,
//     menuType: '菜单',
//     menuOperate: '修改/删除',
//   },
// ];

// export default [
//   {
//     url: '/basic-api/getUserPermissionInfo',
//     timeout: 1000,
//     method: 'get',
//     response: () => {
//       return resultSuccess(data);
//     },
//   },
//   {
//     url: '/basic-api/getMenuPermissionInfo',
//     timeout: 1000,
//     method: 'get',
//     response: () => {
//       return resultSuccess(menuData);
//     },
//   },
// ] as MockMethod[];
