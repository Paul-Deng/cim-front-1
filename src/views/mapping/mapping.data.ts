// import { useRoute } from 'vue-router';
import {
  BizObjListApi,
  FieldListApi,
  repositoryListApi,
  TableListApi,
} from '/@/api/menu/repositories/model';
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { GlobalEnum } from '/@/enums/globalEnums';
import { useUserStore } from '/@/store/modules/user';

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

// const route = useRoute();
const userStore = useUserStore();
export const MappingKCIMSchemas: FormSchema[] = [
  {
    field: 'KCIMRepositoryId',
    component: 'ApiSelect',
    label: '模型',
    defaultValue: 'KCIM模型',
    disabledLabelWidth: false,
    required: true,
    componentProps: {
      disabled: true,
    },
    colProps: {
      span: 12,
      flex: 'wrap',
    },
  },
  {
    field: 'KCIMFieldId',
    component: 'ApiSelect',
    label: '领域',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        placeholder: '请选择领域',
        api: FieldListApi,
        default: null,
        resultField: 'items',
        labelField: 'fieldName',
        valueField: 'id',
        numberToString: true,
        params: {
          repositoryId: GlobalEnum.KCIM_REPOSITORY_ID,
        },
        onChange: (e: ChangeEvent) => {
          formModel.KCIMBizId = undefined;
          console.log('choose field');
          console.log(e);
        },
      };
    },
  },
  {
    field: 'KCIMBizId',
    component: 'ApiSelect',
    label: '业务对象',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        api: BizObjListApi,
        resultField: 'items',
        labelField: 'businessObjectName',
        valueField: 'id',
        numberToString: true,
        params: {
          fieldId: formModel.KCIMFieldId,
        },
        onChange: (e: ChangeEvent) => {
          formModel.CIMTableId = null;
          console.log('choose biz');
          console.log(e);
        },
      };
    },
  },
  {
    label: '表',
    field: 'CIMTableId',
    component: 'ApiSelect',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        api: TableListApi,
        resultField: 'items',
        labelField: 'tableCode',
        valueField: 'id',
        placeholder: '表名称',
        numberToString: true,
        params: {
          bizId: formModel.CIMBizId,
        },
        onChange: (e: ChangeEvent) => {
          console.log(formModel.standardFieldId);
          console.log('choose table');
          console.log(e);
        },
      };
    },
  },
];
export const MappingTargetSchemas: FormSchema[] = [
  {
    field: 'repositoryId',
    component: 'ApiSelect',
    label: '目标模型',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        placeholder: '请选择模型',
        api: repositoryListApi,
        resultField: 'items',
        labelField: 'repositoryName',
        valueField: 'id',
        numberToString: true,
        params: {
          userId: userStore.getUserIdState,
        },
        onChange: async (e: ChangeEvent) => {
          formModel.fieldId = null;
          console.log(e);
        },
      };
    },
    colProps: {
      offset: 0,
      span: 12,
    },
  },
  {
    field: 'fieldId',
    component: 'ApiSelect',
    label: '目标领域',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        placeholder: '请选择领域',
        api: FieldListApi,
        resultField: 'items',
        labelField: 'fieldName',
        valueField: 'id',
        numberToString: true,
        params: {
          repositoryId: formModel.repositoryId,
        },
        onChange: (e: ChangeEvent) => {
          formModel.bizId = null;
          console.log(e);
        },
      };
    },
  },
  {
    field: 'bizId',
    component: 'ApiSelect',
    label: '目标业务对象',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        api: BizObjListApi,
        resultField: 'items',
        labelField: 'businessObjectName',
        valueField: 'id',
        placeholder: '表所属的领域名称',
        numberToString: true,
        params: {
          fieldId: formModel.fieldId,
        },
        onChange: (e: ChangeEvent) => {
          console.log(e.target);
        },
      };
    },
  },
  {
    label: '目标表',
    field: 'customTableId',
    component: 'ApiSelect',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        api: TableListApi,
        labelField: 'tableCode',
        valueField: 'id',
        resultField: 'items',
        placeholder: '表名称',
        numberToString: true,
        params: {
          bizId: formModel.bizId,
        },
        onChange: () => {
          console.log(formModel.customFieldId);
        },
      };
    },
  },
];
export const MapColColumns: BasicColumn[] = [
  {
    title: '字段名',
    dataIndex: 'columnName',
    width: 100,
    align: 'left',
  },
  {
    title: '字段类型',
    dataIndex: 'columnType',
    width: 80,
  },
  {
    title: '字段长度',
    dataIndex: 'columnLength',
    width: 80,
  },
];
