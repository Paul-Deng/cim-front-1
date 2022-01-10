import { BasicColumn } from '/@/components/Table/src/types/table';

export const columns: BasicColumn[] = [
  {
    title: '表编码',
    dataIndex: 'bizCode',
    width: 100,
    align: 'left',
  },
  {
    title: '表ID',
    dataIndex: 'bizId',
    width: 30,
  },
  {
    title: '表名称',
    dataIndex: 'bizName',
    width: 100,
  },
  {
    title: '领域ID',
    dataIndex: 'fieldId',
    width: 30,
  },
  {
    title: '业务对象ID',
    dataIndex: 'repositoryId',
    width: 30,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedTime',
    width: 100,
  },
];
