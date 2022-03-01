import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { MappingItem } from '/@/api/menu/model/mapping';
enum Api {
  MAPPING_ADD = '/api-model/mapping',
  MAPPING_DELETE = '/api-model/mapping/delete',
}

export function saveOrUpdateMapApi(params: MappingItem[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<MappingItem>(
    {
      url: Api.MAPPING_ADD,
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

export function deleteMapApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<Boolean>(
    {
      url: Api.MAPPING_DELETE,
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
