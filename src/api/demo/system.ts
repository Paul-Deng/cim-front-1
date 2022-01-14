import { getMenuListResultModel } from '../sys/model/menuModel';
import {
  AccountParams,
  DeptListItem,
  RoleParams,
  RolePageParams,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/api-user/role/list',
  IsAccountExist = '/system/accountExist',
  TreeList = '/system/getTreeList',
  BizList = '/api-model/model/biz/list',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/api-user/route/admin',
  RouteList = '/api-user/route/current',
  RolePageList = '/api-user/role/list',
  GetAllRoleList = '/system/getAllRoleList',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getBizList = (params?: DeptListItem) =>
  defHttp.post<DeptListGetResultModel>({ url: Api.BizList, params });

export const getTreeList = (params?: DeptListItem) =>
  defHttp.post<DeptListGetResultModel>({ url: Api.TreeList, params });

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.MenuList });
};
export const getRouteList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.RouteList });
};
export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
