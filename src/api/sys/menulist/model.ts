import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel, RouteItem } from '../model/menuModel';
import { ErrorMessageMode } from '/#/axios';
enum Api {
  MODEL_WELCOME_LIST = '/api-model/model/welcome',

  MENULIST_ADD = '/api-user/route',
  ROUTE_DELETE = '/api-user/route/delete',
}

export function saveOrUpdateRouteApi(params: RouteItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<getMenuListResultModel>(
    {
      url: Api.MENULIST_ADD,
      method: 'POST',
      params,
      headers: {
        // ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deleteRouteApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<getMenuListResultModel>(
    {
      url: Api.ROUTE_DELETE,
      method: 'POST',
      params,
      // headers: {},
    },
    {
      errorMessageMode: mode,
    },
  );
}
