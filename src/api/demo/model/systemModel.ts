import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  name?: string;
  code?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;
// export type RolePageParams = {};

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface BizListItem {
  id?: string;
  orderNo?: string;
  createTime?: string;
  remark?: string;
  status?: number;
  pageSize?: number;
  page?: number;
}

export interface MenuListItem {
  component: string;
  hidden?: boolean;
  id?: number;
  parentId?: number;
  requestMethod?: string;
  sort?: number;
  subMenus?: MenuListItem[];
  type?: string;
  path?: string;
  icon?: string;
  url?: string;
  menuName?: string;
}

export interface RoleItem {
  id: string;
  name: string;
  code: string;
  status: number;
  // orderNo: string;
  createdTime: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<BizListItem>;

export type MenuListGetResultModel = MenuListItem[];

export type RolePageListGetResultModel = RoleItem[];

export type RoleListGetResultModel = RoleItem[];
