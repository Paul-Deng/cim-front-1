import { defHttp } from '/@/utils/http/axios';
import { getUserPermissionResultModel, getMenuPermissionResultModel } from './model/menuPermission';

enum Api {
  data = '/getUserPermissionInfo',
  menuData = '/getMenuPermissionInfo',
}

/**
 * @description: Get user menu based on id
 */

export const getUserPermission = () => {
  return defHttp.get<getUserPermissionResultModel>({ url: Api.data });
};
export const getMenuPermission = () => {
  return defHttp.get<getMenuPermissionResultModel>({ url: Api.menuData });
};
