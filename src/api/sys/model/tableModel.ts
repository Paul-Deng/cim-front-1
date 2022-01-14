import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { TableItem, TableListResultVO } from '../../menu/model/model';
enum Api {
  TABLE_ADD = '/api-model/model/table',
  TABLE_DELETE = '/api-model/model/table/delete',
}

export function saveOrUpdateTableApi(params: TableItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<TableListResultVO>(
    {
      url: Api.TABLE_ADD,
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

export function deleteTableApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<Boolean>(
    {
      url: Api.TABLE_DELETE,
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
