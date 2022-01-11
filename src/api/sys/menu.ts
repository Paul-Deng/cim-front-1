import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuListMock = '/getMenuListMock',
  // GetMenuListMock = '/api-user/route/admin',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuListMock = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuListMock });
};
