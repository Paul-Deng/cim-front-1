import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { TableColumnItem } from '../../menu/model/model';
enum Api {
  COLUMN_ADD = '/api-model/model/column',
  COLUMN_DELETE = '/api-model/model/column/delete',
}

export function saveOrUpdateColumnApi(params: TableColumnItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<TableColumnItem>(
    {
      url: Api.COLUMN_ADD,
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

export function deleteColumnApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<Boolean>(
    {
      url: Api.COLUMN_DELETE,
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
