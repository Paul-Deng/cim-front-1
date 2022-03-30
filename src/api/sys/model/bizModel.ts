import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BusinessObjectItem, BusinessObjectListResultVO } from '/@/api/menu/model/model';

enum Api {
  BIZ_ADD = '/api-model/model/biz',
  BIZ_DELETE = '/api-model/model/biz/delete',
}

export function saveOrUpdateBizApi(params: BusinessObjectItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<BusinessObjectListResultVO>(
    {
      url: Api.BIZ_ADD,
      method: 'POST',
      params,
      headers: {
        //@ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deleteBizApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<Boolean>(
    {
      url: Api.BIZ_DELETE,
      method: 'POST',
      params,
      headers: {
        //@ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}
