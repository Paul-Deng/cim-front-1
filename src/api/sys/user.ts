import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/api-auth/oauth/login',
  Logout = '/api-auth/oauth/logout',
  GetUserInfo = '/api-user/user/current',
  getKingdeeLoginUrl = '/api-auth/oauth/kd/url',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getThirdKingdeeUrlApi<T = any>() {
  const resultData = defHttp.request<T>({
    url: Api.getKingdeeLoginUrl,
    method: 'GET',
  });
  return resultData;
}

export function getThirdAccessTokenByCodeApi<T = any>(
  url: string,
  mode: ErrorMessageMode = 'message',
) {
  const resultData = defHttp.request<T>(
    {
      url,
      method: 'GET',
      headers: {
        'Content-type': ContentTypeEnum.FORM_URLENCODED,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
  return resultData;
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
