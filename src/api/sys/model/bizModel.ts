import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { TableItem, TableListResultVO } from '../../menu/model/model';
enum Api {
  BIZ_ADD = '/api-model/model/biz',
  BIZ_DELETE = '/api-model/model/biz/delete',
}

export function saveOrUpdateBizApi(params: TableItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<TableListResultVO>(
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
