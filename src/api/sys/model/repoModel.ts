import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { TableItem, TableListResultVO } from '../../menu/model/model';
enum Api {
  REPO_ADD = '/api-model/model/repository',
  REPO_DELETE = '/api-model/model/repository/delete',
}

export function saveOrUpdateRepoApi(params: TableItem, mode: ErrorMessageMode = 'message') {
  return defHttp.request<TableListResultVO>(
    {
      url: Api.REPO_ADD,
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

export function deleteRepoApi(params: number[], mode: ErrorMessageMode = 'message') {
  return defHttp.request<Boolean>(
    {
      url: Api.REPO_DELETE,
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
