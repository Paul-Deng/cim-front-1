<template>
  <div>
    <div class="kcimModel">
      <BasicForm class="kcimForm" @register="registerKCIM" label-width="large" />
      <BasicTable
        class="kcimTable"
        @register="registerKCIMTable"
        @selection-change="handleKcimSelect"
      />
    </div>
    <div class="mapBtnArea">
      <a-button
        class="mapBtn"
        @click="handleSubmitMap"
        type="primary"
        shape="circle"
        style="border: none"
      >
        <swap-outlined :style="{ color: 'white' }" />
      </a-button>
    </div>
    <div class="targetModel">
      <BasicForm class="targetForm" @register="registerTarget" />
      <BasicTable
        class="targetTable"
        @register="registerTargetTable"
        @selection-change="handleTargetSelect"
      />
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
  import { notification } from 'ant-design-vue';
  import { useMapStore } from '/@/store/modules/mapping';
  import { MappingItem } from '/@/api/menu/model/mapping';

  let kcimFieldId = ref<number>(1);
  let kcimBizId = ref<number>(1);
  let kcimTableId = ref<number>(1);
  let targetRepoId = ref<number>(1);
  let targetFieldId = ref<number>(1);
  let targetBizId = ref<number>(1);
  let targetTableId = ref<number>(1);

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
            formModel.KCIMBizId = null;
            formModel.KCIMTableId = null;
            kcimFieldId.value = +e;
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
            kcimBizId.value = +e;
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
            kcimTableId.value = +e;
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
    submitFunc: customKcimSubmitFunc,
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
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      field: 'customRepositoryId',
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
            formModel.customFieldId = null;
            formModel.customBizId = null;
            formModel.customTableId = null;
            console.log(e);
            targetRepoId.value = +e;
          },
        };
      },
      colProps: {
        span: 25,
      },
    },
    {
      field: 'fieldIntro',
      component: 'Divider',
      label: '请选择目标领域',
      defaultValue: '请选择目标领域',
      disabledLabelWidth: false,
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 50,
      },
    },
    {
      field: 'customFieldId',
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
            repositoryId: formModel.customRepositoryId,
          },
          onChange: (e: ChangeEvent) => {
            formModel.customBizId = null;
            formModel.customTableId = null;
            console.log(e);
            targetFieldId.value = +e;
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
      field: 'customBizId',
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
            repositoryId: formModel.customRepositoryId,
            fieldId: formModel.customFieldId,
          },
          onChange: (e: ChangeEvent) => {
            formModel.customTableId = null;
            console.log(e);
            targetBizId.value = +e;
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
            repositoryId: formModel.customRepositoryId,
            fieldId: formModel.customFieldId,
            bizId: formModel.customBizId,
          },
          onChange: (e: ChangeEvent) => {
            // console.log(formModel.customFieldId);
            targetTableId.value = +e;
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

  let targetParams = {
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
    submitFunc: customTargetSubmitFunc,
    showResetButton: false,
  });

  const [registerTargetTable, { table2Reload }] = useTable({
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
    searchInfo: targetParams,
    rowSelection: { type: 'radio' },
  });

  async function customKcimSubmitFunc() {
    isCol.value = true;
    // console.log('submit table');
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
  let kcimColSelect = ref<boolean>(false);
  let targetColSelect = ref<boolean>(false);
  let kcimColId = ref<number>(1);
  let targetColId = ref<number>(1);

  function handleKcimSelect(keys) {
    console.log(keys);
    console.log(keys.rows[0]);
    if (keys.rows[0]) {
      kcimColId.value = keys.rows[0].id;
      kcimColSelect.value = true;
    } else {
      kcimColSelect.value = false;
    }
  }
  async function customTargetSubmitFunc() {
    isCol.value = true;
    // console.log('submit table');
    targetParams = {
      repositoryId: targetRepoId.value,
      fieldId: targetFieldId.value,
      businessObjectId: targetBizId.value,
      tableId: targetTableId.value,
    };
    console.log(targetParams);
    table2Reload({
      searchInfo: targetParams,
    });
  }
  function handleTargetSelect(keys) {
    console.log(keys);
    console.log(keys.rows[0]);
    if (keys.rows[0]) {
      targetColId.value = keys.rows[0].id;
      targetColSelect.value = true;
    } else {
      targetColSelect.value = false;
    }
  }

  const mapStore = useMapStore();
  let mapParams = {
    customId: 0,
    id: 0,
    mappingType: 0,
    parentId: 0,
    repositoryId: 0,
    standardId: 1,
  };
  const mapData: MappingItem[] = [];
  // const mapData = [];
  console.log(typeof mapData);
  console.log(mapData);
  async function handleSubmitMap() {
    console.log('map submit');
    if (kcimColSelect.value && !targetColSelect.value) {
      notification.error({
        message: '请选择目标模型字段',
        duration: 3,
      });
      console.log('target not');
    } else if (!kcimColSelect.value && targetColSelect.value) {
      notification.error({
        message: '请选择标准模型字段',
        duration: 3,
      });
      console.log('kcim not');
    } else if (kcimColSelect.value && targetColSelect.value) {
      try {
        mapParams = {
          customId: targetColId.value,
          id: kcimColId.value,
          mappingType: 5,
          parentId: 9,
          repositoryId: targetRepoId.value,
          standardId: 1,
        };
        mapData.push(mapParams);

        const result = await mapStore.saveOrUpdateMap(mapData);
        if (result) {
          notification.success({
            message: '映射关系提交成功',
            duration: 2,
          });
        } else {
          notification.error({
            message: '映射失败',
            duration: 3,
          });
        }
      } finally {
      }
      console.log('both');
    } else {
      notification.error({
        message: '请选择参与映射的字段',
        duration: 3,
      });
      console.log('either');
    }
  }
</script>
<style>
  .kcimModel {
    width: 43%;
    float: left;
    overflow: hidden;
  }
  .kcimForm {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .kcimTable {
    width: 85%;
    margin-left: 5%;
    margin-right: 10%;
    margin-top: 5%;
  }
  .targetModel {
    overflow: hidden;
    width: 43%;
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
    margin-top: 5%;
  }
  .mapBtnArea {
    overflow: hidden;
    float: left;
    width: 14%;
    margin-top: 10px;
    /* margin-left: 30%; */
    height: 200%;
  }
  .mapBtn {
    overflow: hidden;
    width: 55%;
    font-size: 350%;
    margin-top: 600px;
    margin-left: 22.5%;
    height: 110px;
    text-shadow: none;
    background-color: #0960bd;
  }
</style>
