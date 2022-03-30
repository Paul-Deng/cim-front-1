import { defHttp } from '/@/utils/http/axios';
import {
  MappingBizVO,
  MappingColumnVOResult,
  MappingFieldResultVO,
  MappingFieldVO,
  MappingFieldVOResult,
  MappingItem,
  MappingTableResultVO,
  MappingTableVO,
  MappingTableWelcome,
  MappingTableWelcomeResultVO,
} from '/@/api/menu/model/mapping';
import { MappingField, MappingColumnVO, MappingTableVOResult } from '../model/mapping';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { BasicPageParams } from '/@/api/model/baseModel';
import { MappingBizAddResultVO } from '/@/api/menu/model/mapping';
// import { ErrorMessageMode } from '/@/utils/http/axios/types';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  MAPPING_ADD = '/api-model/mapping',
  MAPPING_FIELD = '/api-model/mapping/field',
  MAPPING_FIELD_ADD = '/api-model/mapping/field/add',
  MAPPING_FIELD_KV = '/api-model/mapping/field/kv',

  MAPPING_BIZ = '/api-model/mapping/biz',
  MAPPING_BIZ_WELCOME_LIST = '/api-model/mapping/biz/welcome',

  MAPPING_BIZ_KV = '/api-model/mapping/biz/kv',
  MAPPING_BIZ_ADD = '/api-model/mapping/biz/add',

  MAPPING_TABLE_ADD = '/api-model/mapping/table/add',
  MAPPING_TABLE_WELCOME_LIST = '/api-model/mapping/table/welcome',

  MAPPING_COLUMN_LIST = '/api-model/mapping/column/list',
  MAPPING_COLUMN_ADD = '/api-model/mapping/column',
  MAPPING_COLUMN_DELETE = '/api-model/mapping/column/delete',
}

// export function MappingWelcomeApi(params: MappingWelcome) {
//   return defHttp.request<MappingWelcomeResultVO>({
//     url: Api.MAPPING_BIZ_WELCOME_LIST,
//     method: 'POST',
//     params,
//     headers: {
//       ignoreCancelToken: true,
//     },
//   });
// }

// export function MappingColumnApi(params: MappingColumn) {
//   return defHttp.request<MappingColumnApiResultVO>({
//     url: Api.MAPPING_WELCOME_LIST,
//     method: 'POST',
//     params,
//     headers: {
//       ignoreCancelToken: true,
//     },
//   });
// }

export function saveOrUpdateMappingFieldApi(params: MappingField) {
  const data = defHttp.request<MappingFieldResultVO>({
    url: Api.MAPPING_FIELD_ADD,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
  return data;
}

export function getMappingFieldKVApi(params: MappingField) {
  const data = defHttp.request<MappingFieldResultVO>({
    url: Api.MAPPING_FIELD_KV,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
  return data;
}

export function MappingFieldPageApi(params: MappingFieldVO) {
  const data = defHttp.request<MappingFieldVOResult>({
    url: Api.MAPPING_FIELD,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
  return data;
}

// Biz 部分
export function MappingBizPageApi(params: MappingBizVO) {
  return defHttp.request<MappingBizAddResultVO>({
    url: Api.MAPPING_BIZ,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function saveOrUpdateMappingBizApi(params: MappingBizVO) {
  const data = defHttp.request<MappingTableResultVO>({
    url: Api.MAPPING_BIZ_ADD,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
  return data;
}

export function getMappingBizKVApi(params: MappingBizVO) {
  const data = defHttp.request<MappingBizAddResultVO>({
    url: Api.MAPPING_BIZ_KV,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
  return data;
}

// Table 部分

export function MappingTableWelcomeApi(params: MappingItem) {
  return defHttp.request<MappingColumnVOResult>({
    url: Api.MAPPING_TABLE_WELCOME_LIST,
    method: 'POST',
    params,
  });
}

export function saveOrUpdateMappingTableApi(params: MappingTableVO) {
  const data = defHttp.request<MappingTableVOResult>({
    url: Api.MAPPING_TABLE_ADD,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
  return data;
}

//Column部分

export function getMappingColumnApi(params: MappingColumnVO & BasicPageParams) {
  const data = defHttp.request<MappingColumnVOResult>({
    url: Api.MAPPING_COLUMN_LIST,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
      'Content-Type': ContentTypeEnum.JSON,
    },
  });
  return data;
}

export function saveOrUpdateMappingColumnApi(params: MappingItem[]) {
  const data = defHttp.request<MappingItem>({
    url: Api.MAPPING_ADD,
    method: 'POST',
    params,
  });
  return data;
}

export function deleteMappingColumnApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<Boolean>(
    {
      url: Api.MAPPING_COLUMN_DELETE,
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
