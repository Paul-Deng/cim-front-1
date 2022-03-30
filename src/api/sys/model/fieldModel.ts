import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { FieldItem } from '/@/api/menu/model/model';

enum Api {
  FIELD_ADD = '/api-model/model/field',
  FIELD_DELETE = '/api-model/model/field/delete',
}

export function saveOrUpdateFieldApi(params: FieldItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<FieldItem>(
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
