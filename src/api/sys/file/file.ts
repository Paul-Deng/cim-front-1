import { FileItem, FileListResultVO } from '../model/file';
import { defHttp } from '/@/utils/http/axios';

import { ErrorMessageMode } from '/@/utils/http/axios/types';
enum Api {
  //   UPLOAD_FILE = '/api-file/file/upload',
  FILE_LIST = '/api-file/file/list',
  FILE_DELETE = '/api-file/file/delete',

  DOWNLOAD_FILE = '/api/api-file/file',
  DEFAULT_MODEL = '/api/api-model/model/export',
  DEFAULT_BIZ = '/api/api-model/model/biz/export',
  DEFAULT_TABLE = '/api/api-model/model/table/export',
  DEFAULT_TABLE_COLUMN = '/api/api-model/model/column/export',
}

export function FileListApi(params: FileItem) {
  return defHttp.request<FileListResultVO>({
    url: Api.FILE_LIST,
    method: 'POST',
    params,
    headers: {
      //@ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export function deleteFileApi(params: Number[], mode?: ErrorMessageMode) {
  return defHttp.request<Boolean>(
    {
      url: Api.FILE_DELETE,
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

export function downloadFileApi(params: Number) {
  downloadApi(Api.DOWNLOAD_FILE, params);
}

export function downloadDefaultModelApi() {
  downloadApi(Api.DEFAULT_MODEL);
}

export function downloadDefaultBizApi() {
  downloadApi(Api.DEFAULT_BIZ);
}

export function downloadDefaultTableApi() {
  downloadApi(Api.DEFAULT_TABLE);
}

export function downloadDefaultModelColumnApi() {
  downloadApi(Api.DEFAULT_TABLE_COLUMN);
}

export function downloadApi(api: Api, params?: Number) {
  const link = document.createElement('a');
  let url = String(api);
  if (params) {
    url = url + '?id=' + params;
  }
  link.href = url;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}
