export interface DataItem {
  key: string;
  userId: string;
  userName: string;
  userCharacter: string;
  userInfo: string;
  userRight: string;
}

export interface MenuDataItem {
  key: number;
  menuName: string;
  menuURL: string;
  menuPath: string;
  menuCSS: string;
  menuNo: number;
  menuType: string;
  menuOperate: string;
}

/**
 * @description: Get menu return value
 */
export type getUserPermissionResultModel = DataItem[];
export type getMenuPermissionResultModel = MenuDataItem[];
