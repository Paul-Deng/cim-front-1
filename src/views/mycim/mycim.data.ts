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
  {
    title: '业务对象',
    dataIndex: 'bizCode',
    width: 100,
  },
  {
    title: '业务对象ID',
    dataIndex: 'bizId',
    width: 35,
  },
  {
    title: '领域ID',
    dataIndex: 'fieldId',
    width: 30,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedTime',
    width: 80,
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
    title: '非空',
    dataIndex: 'columnNull',
    width: 40,
    customRender: ({ text }) => {
      const boolval = text ? 'true' : 'false';
      return (text = boolval);
    },
  },
  {
    title: '主键',
    dataIndex: 'columnPrimary',
    width: 40,
    customRender: ({ text }) => {
      const boolval = text ? 'true' : 'false';
      return (text = boolval);
    },
  },
  {
    title: '唯一',
    dataIndex: 'columnUnique',
    width: 40,
    customRender: ({ text }) => {
      const boolval = text ? 'true' : 'false';
      return (text = boolval);
    },
  },
  {
    title: '外键',
    dataIndex: 'columnForeignKey',
    width: 40,
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
  {
    title: '业务对象ID',
    dataIndex: 'id',
    width: 55,
  },
  {
    title: '领域ID',
    dataIndex: 'fieldId',
    width: 40,
  },
  {
    title: '模型ID',
    dataIndex: 'repositoryId',
    width: 40,
  },
];
export const FieldColumns: BasicColumn[] = [
  {
    title: '领域编码',
    dataIndex: 'fieldCode',
    width: 50,
  },
  {
    title: '领域名称',
    dataIndex: 'fieldName',
    width: 100,
    align: 'left',
  },
  {
    title: '领域ID',
    dataIndex: 'id',
    width: 55,
  },
  {
    title: '模型ID',
    dataIndex: 'repositoryId',
    width: 55,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedTime',
    width: 60,
  },
];
export const RepoColumns: BasicColumn[] = [
  {
    title: '模型名称',
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

export const tableFormSchema: FormSchema[] = [
  {
    field: 'tableCode',
    label: '表编码',
    component: 'Input',
    // helpMessage: ['修改失败'],
    rules: [
      {
        required: true,
        message: '请输入表编码',
      },
    ],
  },
  {
    field: 'id',
    label: '表ID',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
    required: false,
  },
  {
    field: 'bizCode',
    label: '业务对象',
    component: 'Input',
    required: true,
  },
  {
    field: 'bizId',
    label: '业务对象ID',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'fieldId',
    label: '领域ID',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'repositoryId',
    label: '模型ID',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'userId',
    label: '用户ID',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'updatedTime',
    label: '更新时间',
    component: 'Input',
    required: true,
    ifShow: false,
  },
];

export const colFormSchema: FormSchema[] = [
  {
    field: 'columnName',
    label: '字段名',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入字段名',
      },
    ],
  },
  {
    field: 'id',
    label: '字段ID',
    component: 'Input',
    required: false,
  },
  {
    field: 'columnType',
    label: '字段类型',
    component: 'Input',
    required: false,
  },
  {
    field: 'columnLength',
    label: '字段长度',
    component: 'Input',
    required: false,
  },
  {
    field: 'columnNull',
    label: '非空',
    component: 'Input',
    required: false,
  },
  {
    field: 'columnPrimary',
    label: '主键',
    component: 'Input',
    required: false,
  },
  {
    field: 'columnUnique',
    label: '唯一',
    component: 'Input',
    required: false,
  },
];
export const bizFormSchema: FormSchema[] = [
  {
    field: 'bizCode',
    label: '业务对象',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入业务对象名称',
      },
    ],
  },
  {
    field: 'id',
    label: '业务对象ID',
    component: 'Input',
    required: false,
  },
  {
    field: 'bizName',
    label: '业务对象名称',
    component: 'Input',
    required: false,
  },
  {
    field: 'description',
    label: '业务对象描述',
    component: 'Input',
    required: false,
  },
];
export const fieldFormSchema: FormSchema[] = [
  {
    field: 'fieldCode',
    label: '领域编码',
    component: 'Input',
    // required: false,
  },
  {
    field: 'fieldName',
    label: '领域名称',
    component: 'Input',
  },
  {
    field: 'id',
    label: '领域ID',
    component: 'Input',
    required: false,
  },
  {
    field: 'repositoryId',
    label: '模型ID',
    component: 'Input',
    required: false,
  },
];
export const repoFormSchema: FormSchema[] = [
  {
    field: 'repositoryName',
    label: '模型名称',
    component: 'Input',
    // required: false,
  },
  {
    field: 'repositoryType',
    label: '数据库类型',
    component: 'Input',
  },
  {
    field: 'id',
    label: '模型ID',
    component: 'Input',
    required: false,
  },
  {
    field: 'description',
    label: '介绍',
    component: 'Input',
    required: false,
  },
];
