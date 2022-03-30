import { BasicFetchResult } from '../../model/baseModel';
import { TableColumnItem, TableItem } from '/@/api/menu/model/model';

export interface MappingWelcome {
  id?: number;
  mappingName?: string;
  targetFieldId?: number;
  targetBusinessObjectId?: number;
  targetTableId?: number;
  sourceFieldId?: number;
  sourceBusinessObjectId?: number;
  sourceTableId?: number;
  mappingUserId?: number;
  createdTime?: Date;
  updatedTime?: Date;
}

export interface MappingColumn {
  id?: number;
  sourceColumnId?: number;
  targetColumnId?: number;
  mappingTableId?: number;
}

export interface MappingColumnVO {
  id?: number;
  mappingTableId?: number;
  target?: TableColumnItem;
  source?: TableColumnItem;
}

export type MappingColumnVOResult = BasicFetchResult<MappingColumnVO>;

export interface MappingTable {
  id?: number;
  sourceId: number;
  targetId?: number;
  createdTime?: Date;
  updatedTime?: Date;
}
export type MappingTableResultVO = BasicFetchResult<MappingTable>;

export interface MappingTableVO {
  id?: number;
  target: TableItem;
  source: TableItem;
  createdTime?: Date;
  updatedTime?: Date;
}

export interface MappingItem {
  id?: number;
  sourceRepoId?: number;
  targetRepoId?: number;
  sourceFieldId?: number;
  targetFieldId?: number;
  sourceBizId?: number;
  targetBizId?: number;
  sourceTableId?: number;
  targetTableId?: number;
  sourceColumnId?: number;
  targetColumnId?: number;
  createdTime?: Date;
  updatedTime?: Date;
}
export type MappingTableVOResult = BasicFetchResult<MappingTableVO>;