// import { BasicColumn } from '/@/components/Table';
// import { FormSchema } from '/@/components/Table';

// export const columns: BasicColumn[] = [
//   {
//     title: '模型名称',
//     dataIndex: 'repositoryName',
//     width: 100,
//     align: 'left',
//   },
//   {
//     title: '数据库类型',
//     dataIndex: 'repositoryType',
//     width: 200,
//   },
//   {
//     title: '用户ID',
//     dataIndex: 'usrId',
//     width: 50,
//   },
// ];

// const isDir = (type: string) => type === '0';
// const isButton = (type: string) => type === '2';

// export const searchFormSchema: FormSchema[] = [
//   {
//     field: 'repositoryName',
//     label: '菜单名称',
//     component: 'Input',
//     colProps: { span: 8 },
//   },
//   {
//     field: 'repositoryType',
//     label: '状态',
//     component: 'Select',
//     componentProps: {
//       options: [
//         { label: '启用', value: '0' },
//         { label: '停用', value: '1' },
//       ],
//     },
//     colProps: { span: 8 },
//   },
// ];

// export const formSchema: FormSchema[] = [
//   {
//     field: 'type',
//     label: '菜单类型',
//     component: 'RadioButtonGroup',
//     defaultValue: '0',
//     componentProps: {
//       options: [
//         { label: '目录', value: '0' },
//         { label: '菜单', value: '1' },
//         { label: '按钮', value: '2' },
//       ],
//     },
//     colProps: { lg: 24, md: 24 },
//   },
//   {
//     field: 'name',
//     label: '菜单名称',
//     component: 'Input',
//     required: true,
//   },
//   {
//     field: 'parentId',
//     label: '上级菜单',
//     component: 'Input',
//     required: true,
//   },
//   {
//     field: 'redirect',
//     label: '导向菜单',
//     component: 'Input',
//     required: true,
//     ifShow: ({ values }) => isDir(values.type),
//   },
//   {
//     field: 'orderNo',
//     label: '排序',
//     component: 'InputNumber',
//     required: true,
//   },
//   {
//     field: 'icon',
//     label: '图标',
//     component: 'IconPicker',
//     required: true,
//     ifShow: ({ values }) => isDir(values.type),
//   },

//   {
//     field: 'path',
//     label: '路由地址',
//     component: 'Input',
//     required: true,
//     ifShow: ({ values }) => !isButton(values.type),
//   },
//   {
//     field: 'component',
//     label: '组件',
//     component: 'Input',
//     required: true,
//     isAdvanced: true,
//     ifShow: ({ values }) => !isButton(values.type),
//   },

//   {
//     field: 'hideChildren',
//     label: '隐藏子菜单',
//     component: 'RadioButtonGroup',
//     defaultValue: false,
//     componentProps: {
//       options: [
//         { label: '否', value: false },
//         { label: '是', value: true },
//       ],
//     },
//     ifShow: ({ values }) => isDir(values.type),
//   },
// ];

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
