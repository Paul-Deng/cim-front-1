import { BasicFetchResult } from '../../model/baseModel';
import { BusinessObjectItem, TableColumnItem, TableItem } from '/@/api/menu/model/model';
import { FieldItem } from './model';

export interface MappingWelcome {
  id?: number;
  mappingName?: string;
  standardFieldId?: number;
  standardBusinessObjectId?: number;
  standardTableId?: number;
  customFieldId?: number;
  customBusinessObjectId?: number;
  customTableId?: number;
  mappingUserId?: number;
  createdTime?: Date;
  updatedTime?: Date;
}

export interface MappingTableWelcome {
  id?: number;
  mappingBiz?: MappingBizVO;
  standardTable: TableItem;
  customTable: TableItem;
  standardColumn: TableColumnItem;
  customColumn: TableColumnItem;
  createdTime?: Date;
  updatedTime?: Date;
}

export type MappingTableWelcomeResultVO = BasicFetchResult<MappingTableWelcome>;

export interface MappingBizAddVO {
  id?: number;
  customFieldId?: number;
  customBusinessObjectId?: number;
}

export type MappingBizAddResultVO = BasicFetchResult<MappingBizAddVO>;

export interface MappingColumn {
  id?: number;
  customColumnId?: number;
  standardColumnId?: number;
  mappingTableId?: number;
}

export interface MappingColumnVO {
  id?: number;
  mappingTableId?: number;
  standard?: TableColumnItem;
  custom?: TableColumnItem;
}

export type MappingColumnVOResult = BasicFetchResult<MappingColumnVO>;

export interface MappingField {
  id?: number;
  standardFieldId?: number;
  customFieldId?: number;
  createdTime?: Date;
  updatedTime?: Date;
  extendFieldOne?: string;
  extendFieldTwo?: number;
}

export type MappingFieldResultVO = BasicFetchResult<MappingField>;

export interface MappingFieldVO {
  id?: number;
  standard?: FieldItem;
  custom?: FieldItem;
}

export type MappingFieldVOResult = BasicFetchResult<MappingFieldVO>;

export interface MappingBizVO {
  id?: number;
  mappingFieldId?: number;
  standard?: BusinessObjectItem;
  custom?: BusinessObjectItem;
  createdTime?: Date;
  updatedTime?: Date;
}
export type MappingBizVOResult = BasicFetchResult<MappingBizVO>;

export interface MappingTable {
  id?: number;
  mappingBusinessObjectId?: number;
  standardTableId: number;
  customTableId: number;
  createdTime?: Date;
  updatedTime?: Date;
}
export type MappingTableResultVO = BasicFetchResult<MappingTable>;

export interface MappingTableVO {
  id?: number;
  standard: TableItem;
  custom: TableItem;
  createdTime?: Date;
  updatedTime?: Date;
}
export type MappingTableVOResult = BasicFetchResult<MappingTableVO>;
