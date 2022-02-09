import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { TableItem, TableListResultVO } from '../../menu/model/model';
enum Api {
  FIELD_ADD = '/api-model/model/field',
  FIELD_DELETE = '/api-model/model/field/delete',
}

export function saveOrUpdateFieldApi(params: TableItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<TableListResultVO>(
    {
      url: Api.FIELD_ADD,
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

export function deleteFieldApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<Boolean>(
    {
      url: Api.FIELD_DELETE,
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
