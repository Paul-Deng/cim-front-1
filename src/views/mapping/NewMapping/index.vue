<template>
  <div>
    <div class="kcimModel">
      <BasicForm class="kcimForm" @register="registerKCIM" label-width="large" />
      <BasicTable class="kcimTable" @register="registerKCIMTable" />
    </div>
    <div class="mapBtn">
      <!-- <swap-outlined /> -->
      <a-button class="mapBtn" size="large" type="primary" shape="circle" style="border: none">
        <swap-outlined />
        <!-- <template #icon><swap-outlined /></template> -->
      </a-button>
    </div>
    <div class="targetModel">
      <BasicForm class="targetForm" @register="registerTarget" />
      <BasicTable class="targetTable" @register="registerTargetTable" />
    </div>
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { MapColColumns } from '../mapping.data';
  import BasicTable from '/@/components/Table/src/BasicTable.vue';
  import { useTable } from '/@/components/Table';
  import {
    BizObjListApi,
    FieldListApi,
    GetTableColumnApi,
    repositoryListApi,
    TableListApi,
  } from '/@/api/menu/repositories/model';
  import { ref } from 'vue';
  import { GlobalEnum } from '/@/enums/globalEnums';
  import { useUserStore } from '/@/store/modules/user';
  import { SwapOutlined } from '@ant-design/icons-vue';

  let kcimFieldId = ref<number>(1);
  let kcimBizId = ref<number>(1);
  let kcimTableId = ref<number>(1);

  const MappingKCIMSchemas: FormSchema[] = [
    {
      field: 'KCIMIntro',
      component: 'Divider',
      label: 'KCIM标准模型',
      defaultValue: 'KCIM标准模型',
      disabledLabelWidth: false,
      // required: true,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      field: 'KCIMRepositoryId',
      component: 'Input',
      label: '模型',
      defaultValue: 'KCIM模型',
      disabledLabelWidth: false,
      required: true,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 20,
      },
    },
    {
      field: 'fieldIntro',
      component: 'Divider',
      label: '请选择领域',
      defaultValue: '请选择标准模型',
      disabledLabelWidth: false,
      // required: true,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      field: 'KCIMFieldId',
      component: 'ApiSelect',
      label: '领域',
      required: true,
      colProps: {
        span: 20,
      },
      componentProps: ({ formModel }) => {
        return {
          placeholder: '',
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
            kcimFieldId.value = +e;
            // console.log('choose field');
            // console.log(e);
            // console.log(kcimFieldId.value);
          },
        };
      },
    },
    {
      field: 'bizIntro',
      component: 'Divider',
      label: '请选择业务对象',
      defaultValue: '请选择业务对象',
      disabledLabelWidth: false,
      // required: true,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      field: 'KCIMBizId',
      component: 'ApiSelect',
      label: '业务对象',
      required: true,
      colProps: {
        span: 20,
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
            // console.log('choose biz');
            kcimBizId.value = +e;
            // console.log(e);
          },
        };
      },
    },
    {
      field: 'tableIntro',
      component: 'Divider',
      label: '请选择表名称',
      defaultValue: '请选择表名称',
      disabledLabelWidth: false,
      // required: true,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      label: '表名称',
      field: 'CIMTableId',
      component: 'ApiSelect',
      required: true,
      colProps: {
        span: 20,
      },
      componentProps: ({ formModel }) => {
        return {
          api: TableListApi,
          resultField: 'items',
          labelField: 'tableCode',
          valueField: 'id',
          placeholder: '',
          numberToString: true,
          params: {
            bizId: formModel.CIMBizId,
          },
          onChange: (e: ChangeEvent) => {
            console.log(formModel.standardFieldId);
            // console.log('choose table');
            kcimTableId.value = +e;
            // console.log(kcimTableId.value);
            // console.log(e);
          },
        };
      },
    },
  ];
  let isCol = ref<Boolean>(false);
  const [registerKCIM, {}] = useForm({
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 10,
    },
    schemas: MappingKCIMSchemas,
    actionColOptions: {
      offset: 8,
    },
    submitButtonOptions: {
      text: '查询字段',
    },
    submitFunc: customSubmitFunc,
    showResetButton: false,
  });
  const userStore = useUserStore();
  const MappingTargetSchemas: FormSchema[] = [
    {
      field: 'modelIntro',
      component: 'Divider',
      label: '请选择目标模型',
      defaultValue: '请选择目标模型',
      disabledLabelWidth: false,
      // required: true,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      field: 'repositoryId',
      component: 'ApiSelect',
      label: '目标模型',
      required: true,
      componentProps: ({ formModel }) => {
        return {
          placeholder: '',
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
        // offset: 0,
        span: 25,
      },
    },
    {
      field: 'fieldIntro',
      component: 'Divider',
      label: '请选择目标领域',
      defaultValue: '请选择目标领域',
      disabledLabelWidth: false,
      // required: true,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      field: 'fieldId',
      component: 'ApiSelect',
      label: '目标领域',
      required: true,
      colProps: {
        span: 25,
      },
      componentProps: ({ formModel }) => {
        return {
          placeholder: '',
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
      field: 'bizIntro',
      component: 'Divider',
      label: '请选择目标业务对象',
      defaultValue: '请选择目标业务对象',
      disabledLabelWidth: false,
      // required: true,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      field: 'bizId',
      component: 'ApiSelect',
      label: '目标业务对象',
      required: true,
      colProps: {
        span: 25,
      },
      componentProps: ({ formModel }) => {
        return {
          api: BizObjListApi,
          resultField: 'items',
          labelField: 'businessObjectName',
          valueField: 'id',
          placeholder: '',
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
      field: 'tableIntro',
      component: 'Divider',
      label: '请选择目标表名称',
      defaultValue: '请选择目标表名称',
      disabledLabelWidth: false,
      // required: true,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      label: '目标表',
      field: 'customTableId',
      component: 'ApiSelect',
      required: true,
      colProps: {
        span: 25,
      },
      componentProps: ({ formModel }) => {
        return {
          api: TableListApi,
          labelField: 'tableCode',
          valueField: 'id',
          resultField: 'items',
          placeholder: '',
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

  let kcimParams = {
    repositoryId: 1,
    fieldId: 1,
    businessObjectId: 1,
    tableId: 1,
  };

  const [registerKCIMTable, { tableReload }] = useTable({
    title: 'KCIM模型',
    columns: MapColColumns,
    api: GetTableColumnApi,
    formConfig: {
      labelWidth: 120,
    },
    isTreeTable: true,
    striped: true,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    searchInfo: kcimParams,
    rowSelection: { type: 'radio' },
  });

  const [registerTarget, {}] = useForm({
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 10,
    },
    schemas: MappingTargetSchemas,
    actionColOptions: {
      offset: 8,
    },
    submitButtonOptions: {
      text: '查询字段',
    },
    submitFunc: customSubmitFunc,
    showResetButton: false,
  });

  const [registerTargetTable, {}] = useTable({
    title: '目标模型',
    columns: MapColColumns,
    api: GetTableColumnApi,
    formConfig: {
      labelWidth: 120,
    },
    isTreeTable: true,
    striped: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    searchInfo: kcimParams,
    // actionColumn: {
    //   width: 80,
    //   title: '操作',
    //   dataIndex: 'action',
    //   slots: { customRender: 'action' },
    //   fixed: undefined,
    // },
  });

  async function customSubmitFunc() {
    isCol.value = true;
    console.log('submit table');
    kcimParams = {
      repositoryId: 1,
      fieldId: kcimFieldId.value,
      businessObjectId: kcimBizId.value,
      tableId: kcimTableId.value,
    };
    console.log(kcimParams);
    tableReload({
      searchInfo: kcimParams,
    });
  }
</script>
<style>
  .kcimModel {
    width: 45%;
    float: left;
    overflow: hidden;
  }
  .kcimForm {
    width: 50%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .kcimTable {
    width: 85%;
    margin-left: 5%;
    margin-right: 10%;
    /* background-color: ; */
  }
  .targetModel {
    width: 50%;
    float: right;
  }
  .targetForm {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .targetTable {
    width: 85%;
    margin-right: 5%;
    margin-left: 10%;
  }
  .mapBtn {
    overflow: hidden;
    width: 20%;
    margin-left: 30%;
    height: 20%;
  }
</style>
