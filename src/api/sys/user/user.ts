import { defHttp } from '/@/utils/http/axios';
// import { ErrorMessageMode } from '/@/utils/http/axios/types';
import { ErrorMessageMode } from '/#/axios';
import { GetUserInfoModel, RoleInfo } from '../model/userModel';
enum Api {
  USER_ADD = '/api-user/role/add',
}

export function saveOrUpdateUserApi(params: RoleInfo, mode: ErrorMessageMode = 'message') {
  return defHttp.request<GetUserInfoModel>(
    {
      url: Api.USER_ADD,
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
