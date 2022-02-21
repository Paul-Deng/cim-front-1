import {
  TableColumnItem,
  TableListResultVO,
  FieldVOPageResult,
  RepositoryItem,
} from '../model/model';
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  BusinessObjectItem,
  ModelAll,
  BusinessObjectListResultVO,
  RepositoryVOPageResult,
} from '../model/model';
import { ModelAllResultVO, TableItem, FieldItem } from '../model/model';
import { MappingColumnVOResult, MappingItem } from '../model/mapping';

enum Api {
  MODEL_WELCOME_LIST = '/api-model/model/welcome',

  REPOSITORY_ADD = '/api-model/model/repository/add',
  REPOSITORY_LIST = '/api-model/model/repository/list',
  REPOSITORY_DELETE = '/api-model/model/repository/delete',

  FIELD_LIST = '/api-model/model/field/list',
  FILED_ADD = '/api-model/model/field/add',
  FILED_DELETE = '/api-model/model/field/delete',

  BUSINESS_OBJECT_LIST = '/api-model/model/biz/list',
  BUSINESS_OBJECT_ADD = '/api-model/model/biz/add',
  BUSINESS_OBJECT_DELETE = '/api-model/model/biz/delete',
  BUSINESS_OBJECT_EXCEL_IMPORT = '/api-model/model/biz/import',
  BUSINESS_OBJECT_EXCEL_EXPORT = '/api-model/model/biz/export',

  TABLE_LIST = '/api-model/model/table/list',
  TABLE_ADD = '/api-model/model/table/add',
  TABLE_DELETE = '/api-model/model/table/delete',

  MODEL_COLUMN_LIST = '/api-model/model/column/list',
  MODEL_COLUMN_ADD = '/api-model/model/column/add',
  MODEL_COLUMN_DELETE = '/api-model/model/column/delete',

  REMOTE_REPOSITORY = '/api-model/model/repository/kv',
  REMOTE_FILED = '/api-model/model/field/kv',
  REMOTE_BUSINESS_OBJECT = '/api-model/model/biz/kv',
  REMOTE_TABLE = '/api-model/model/table/kv',

  MAPPING_LIST = '/api-model/mapping/table/welcome',
  MAPPING_ADD = '/api-model/mapping',
  MAPPING_DELETE = '/api-model/mapping/delete',
  MAPPING_CONVERT = '/api-model/mapping/convert',
  MAPPING_COLUMN_LIST = '/api-model/mapping/column/list',
}

export function MappingListApi(params: MappingItem) {
  return defHttp.request<MappingColumnVOResult>({
    url: Api.MAPPING_LIST,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function SaveOrUpdateMappingApi(params: MappingItem[]) {
  return defHttp.request<MappingColumnVOResult>({
    url: Api.MAPPING_ADD,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function ModelWelcomeApi(params: ModelAll, mode: ErrorMessageMode = 'message') {
  return defHttp.request<ModelAllResultVO>(
    {
      url: Api.MODEL_WELCOME_LIST,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function repositoryListApi(params?: RepositoryItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<ModelAllResultVO>(
    {
      url: Api.REPOSITORY_LIST,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function saveOrUpdateRepositoryApi(
  params: RepositoryItem,
  mode: ErrorMessageMode = 'message',
) {
  return defHttp.request<RepositoryVOPageResult>(
    {
      url: Api.REPOSITORY_ADD,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deleteRepositoryApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<Boolean>(
    {
      url: Api.REPOSITORY_DELETE,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function RepositoryKVApi(params: RepositoryItem) {
  return defHttp.request<RepositoryVOPageResult>({
    url: Api.REMOTE_REPOSITORY,
    method: 'POST',
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function FieldListApi(params?: TableItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<TableListResultVO>(
    {
      url: Api.FIELD_LIST,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
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
      url: Api.FILED_DELETE,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function saveOrUpdateFieldApi(params: FieldItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<FieldItem>(
    {
      url: Api.FILED_ADD,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function FieldKVApi(params: FieldItem) {
  return defHttp.request<FieldVOPageResult>({
    url: Api.REMOTE_FILED,
    method: 'POST',
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function BizObjListApi(params?: BusinessObjectItem) {
  return defHttp.request<BusinessObjectListResultVO>({
    url: Api.BUSINESS_OBJECT_LIST,
    method: 'POST',
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function saveOrUpdateBizObjApi(
  params: BusinessObjectItem,
  mode: ErrorMessageMode = 'message',
) {
  return defHttp.request<BusinessObjectListResultVO>(
    {
      url: Api.BUSINESS_OBJECT_ADD,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
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
      url: Api.BUSINESS_OBJECT_DELETE,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function saveBatchBizObjApi(
  params: BusinessObjectItem[],
  mode: ErrorMessageMode = 'message',
) {
  return defHttp.request<BusinessObjectListResultVO>(
    {
      url: Api.BUSINESS_OBJECT_EXCEL_IMPORT,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getExportDefaultBizApi() {
  return defHttp.request<BusinessObjectListResultVO>({
    url: Api.BUSINESS_OBJECT_EXCEL_EXPORT,
    method: 'GET',
  });
}

export function BizObjKVApi(params: BusinessObjectItem) {
  return defHttp.request<BusinessObjectListResultVO>({
    url: Api.REMOTE_BUSINESS_OBJECT,
    method: 'POST',
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function TableListApi(params?: TableItem) {
  return defHttp.request<TableListResultVO>({
    url: Api.TABLE_LIST,
    method: 'POST',
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function TableKVApi(params: TableItem) {
  return defHttp.request<TableListResultVO>({
    url: Api.REMOTE_TABLE,
    method: 'POST',
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function saveOrUpdateTableApi(params: TableItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<TableListResultVO>(
    {
      url: Api.TABLE_ADD,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
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
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function saveOrUpdateTableColumnApi(
  params: TableColumnItem,
  mode: ErrorMessageMode = 'message',
) {
  return defHttp.request<TableColumnItem>(
    {
      url: Api.MODEL_COLUMN_ADD,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deleteTableColumnApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<Boolean>(
    {
      url: Api.MODEL_COLUMN_DELETE,
      method: 'POST',
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function GetTableColumnApi(params?: TableItem) {
  return defHttp.request<TableListResultVO>({
    url: Api.MODEL_COLUMN_LIST,
    method: 'POST',
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
}
