import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export const TableColumns: BasicColumn[] = [
  {
    title: '表编码',
    dataIndex: 'tableCode',
    width: 160,
    align: 'left',
  },
  {
    title: '表ID',
    dataIndex: 'id',
    width: 30,
  },
];
export const ColColumns: BasicColumn[] = [
  {
    title: '字段名',
    dataIndex: 'columnName',
    width: 150,
    align: 'left',
  },
  {
    title: '字段类型',
    dataIndex: 'columnType',
    width: 50,
  },
  {
    title: '字段长度',
    dataIndex: 'columnLength',
    width: 50,
  },
  {
    title: '表ID',
    dataIndex: 'tableId',
    width: 30,
  },
  {
    title: '业务对象ID',
    dataIndex: 'bizId',
    width: 55,
  },
  {
    width: 80,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    fixed: undefined,
    ifShow: true,
  },
];
export const BizColumns: BasicColumn[] = [
  {
    title: '业务对象',
    dataIndex: 'businessObjectCode',
    width: 150,
    align: 'left',
  },
  {
    title: '业务对象名称',
    dataIndex: 'businessObjectName',
    width: 50,
  },
];
export const RepoColumns: BasicColumn[] = [
  {
    title: '模型',
    dataIndex: 'repositoryName',
    width: 80,
  },
  {
    title: '数据库类型',
    dataIndex: 'repositoryType',
    width: 80,
    align: 'left',
  },
  {
    title: '模型ID',
    dataIndex: 'id',
    width: 55,
  },
  {
    title: '介绍',
    dataIndex: 'description',
    width: 55,
  },
];

export const mappingFormSchema: FormSchema[] = [
  {
    field: 'targetRepositoryName',
    label: '目标模型',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请选择目标模型',
      },
    ],
  },
  {
    field: 'id',
    label: '目标领域',
    component: 'Input',
    required: true,
  },
  {
    field: 'sourceBizId',
    label: '目标业务对象',
    component: 'Input',
    required: true,
  },
  {
    field: 'customTableCode',
    label: '目标表',
    component: 'Input',
    required: true,
  },
  {
    field: 'customColumnName',
    label: '目标字段',
    component: 'Input',
    required: true,
  },
];

export const MappingListColumns: BasicColumn[] = [
  {
    title: '表映射关系',
    dataIndex: 'standardTableCode',
    width: '20%',
    slots: {
      customRender: 'mappingTableCode',
    },
  },
  {
    title: '标准模型字段名',
    dataIndex: 'standardColumnName',
    slots: {
      customRender: 'standardColumn',
    },
    width: '20%',
  },
  {
    title: '标准模型字段类型',
    dataIndex: 'standardColumnType',
    slots: {
      customRender: 'standardColumnType',
    },
    width: '10%',
  },
  {
    title: '自定义模型字段',
    dataIndex: 'customColumnName',
    slots: {
      customRender: 'customColumn',
    },
    width: '20%',
  },
  {
    title: '自定义模型类型',
    dataIndex: 'customColumnType',
    slots: {
      customRender: 'customColumnType',
    },
    width: '10%',
  },
];
