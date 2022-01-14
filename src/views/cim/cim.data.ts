import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export const columns: BasicColumn[] = [
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
    // ifShow: false,
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
