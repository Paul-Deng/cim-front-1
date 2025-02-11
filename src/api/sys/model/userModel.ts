/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  grantType: string;
}

export interface RoleInfo {
  roleName?: string;
  value?: string;
  roles?: RoleInfo[];
  // 用户id
  userId?: string | number;
  // 用户名
  username?: string;
  // 真实名字
  realName?: string;
  // 头像
  avatar?: string;
  // 介绍
  desc?: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  access_token: string;
  role: RoleInfo;
  expires_in: number;
  token_type: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface Oauth2LoginParams {
  grantType: string;
  accessToken?: string;
  mobile?: string;
  username?: string;
  password?: string;
  accountType?: string;
}

