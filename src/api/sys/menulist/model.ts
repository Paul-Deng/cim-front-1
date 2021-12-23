import { defHttp } from '/@/utils/http/axios';
// import { ErrorMessageMode } from '/@/utils/http/axios/types';
import { getMenuListResultModel, RouteItem } from '../model/menuModel';
import { ErrorMessageMode } from '/#/axios';
enum Api {
  MODEL_WELCOME_LIST = '/api-model/model/welcome',

  MENULIST_ADD = '/api-user/route',
  REPOSITORY_LIST = '/api-model/model/repository',
  REPOSITORY_DELETE = '/api-model/model/repository/delete',
}

export function saveOrUpdateMenuListApi(params: RouteItem, mode: ErrorMessageMode = 'message') {
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
