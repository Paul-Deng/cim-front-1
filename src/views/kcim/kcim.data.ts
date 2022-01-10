import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '模型名称',
    dataIndex: 'repositoryName',
    width: 100,
    align: 'left',
  },
  {
    title: '数据库类型',
    dataIndex: 'repositoryType',
    width: 200,
  },
  {
    title: '用户ID',
    dataIndex: 'usrId',
    width: 50,
  },
];

const isDir = (type: string) => type === '0';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'repositoryName',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'repositoryType',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '目录', value: '0' },
        { label: '菜单', value: '1' },
        { label: '按钮', value: '2' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'Input',
    required: true,
  },
  {
    field: 'redirect',
    label: '导向菜单',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isDir(values.type),
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => isDir(values.type),
  },

  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件',
    component: 'Input',
    required: true,
    isAdvanced: true,
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'hideChildren',
    label: '隐藏子菜单',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    ifShow: ({ values }) => isDir(values.type),
  },
];
