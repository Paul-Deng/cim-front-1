<template>
  <div class="mapSelect" id="mapSelect">
    <div class="kcimModel">
      <BasicForm class="kcimForm" @register="registerKCIM" label-width="large" />
    </div>
    <div class="targetModel" id="target">
      <BasicForm class="targetForm" @register="registerTarget" />
    </div>
  </div>
  <div class="colSelect" id="colSelect">
    <BasicTable
      class="kcimTable"
      @register="registerKCIMTable"
      @selection-change="handleKcimSelect"
    />
    <div class="mapBtnArea">
      <a v-if="isMap" class="multiBtn" href="javascript:void(0)" @click="goAnchor('colSelect')">
        添加多条映射关系
      </a>
      <a v-if="isMulti" class="multiBtn" href="javascript:void(0)" @click="goAnchor('mapSelect')">
        添加单条映射关系
      </a>
      <a-button
        v-if="isMap"
        class="mapBtn"
        @click="handleSubmitMap"
        type="primary"
        shape="circle"
        style="border: none"
      >
        <swap-outlined :style="{ color: 'white' }" />
      </a-button>
      <a-button
        v-if="isMulti"
        class="mapBtn"
        @click="handleAddMap"
        type="primary"
        shape="circle"
        style="border: none"
      >
        <plus-outlined :style="{ color: 'white' }" />
      </a-button>
    </div>
    <BasicTable
      class="targetTable"
      @register="registerTargetTable"
      @selection-change="handleTargetSelect"
    />
  </div>
  <div id="MultiTable">
    <BasicTable v-if="isMulti" class="multiTable" @register="registerMultiTable">
      <template #toolbar>
        <a-button v-if="isMulti" type="primary" @click="handleMultiSubmit">
          提交所有映射关系
        </a-button>
      </template>
    </BasicTable>
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
  import { ref, watch, nextTick } from 'vue';
  import { GlobalEnum } from '/@/enums/globalEnums';
  import { useUserStore } from '/@/store/modules/user';
  import { SwapOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { notification } from 'ant-design-vue';
  import { useMapStore } from '/@/store/modules/mapping';
  import { MappingItem } from '/@/api/menu/model/mapping';
  import { cloneDeep } from 'lodash-es';
  import { BasicColumn } from '/@/components/Table/src/types/table';

  let kcimFieldId = ref<number>(1);
  let kcimBizId = ref<number>(1);
  let kcimTableId = ref<number>(1);
  let targetRepoId = ref<number>(1);
  let targetFieldId = ref<number>(1);
  let targetBizId = ref<number>(1);
  let targetTableId = ref<number>(1);
  let isCol = ref<Boolean>(false);
  let isMap = ref<Boolean>(true);
  let isMulti = ref<Boolean>(false);

  // const props = defineProps({
  //   material: {
  //     type: Object,
  //     default: () => {
  //       return {};
  //     },
  //   },
  // });
  // watch(
  //   () => props.material.id,
  //   (val) => {
  //     if (val && document.getElementById(val) != null) {
  //       document.getElementById(val).scrollIntoView(true);
  //     }
  //   },
  // );
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
            pageSize: 1000,
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
            pageSize: 1000,
            fieldId: formModel.KCIMFieldId,
          },
          onChange: (e: ChangeEvent) => {
            formModel.KCIMTableId = null;
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
      field: 'KCIMTableId',
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
            pageSize: 1000,
            bizId: formModel.KCIMBizId,
          },
          onChange: (e: ChangeEvent) => {
            kcimTableId.value = +e;
          },
        };
      },
    },
  ];

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
            pageSize: 10000,
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
            pageSize: 10000,
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
            pageSize: 10000,
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
            pageSize: 10000,
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

  const MultiSelectColumns: BasicColumn[] = [
    {
      title: '源模型字段',
      dataIndex: 'kColName',
      width: 100,
      align: 'left',
    },
    {
      title: '源模型字段类型',
      dataIndex: 'kColType',
      width: 50,
    },
    {
      title: '源模型字段长度',
      dataIndex: 'kColLength',
      width: 50,
    },
    {
      title: '目标模型字段',
      dataIndex: 'tColName',
      width: 100,
    },
    {
      title: '目标模型字段类型',
      dataIndex: 'tColType',
      width: 50,
    },
    {
      width: 50,
      title: '目标模型字段长度',
      dataIndex: 'tColLength',
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
  let kcimColName = ref<string>();
  let kcimColType = ref<string>();
  let kcimColLength = ref<string>();
  let targetColName = ref<string>();
  let targetColType = ref<string>();
  let targetColLength = ref<string>();
  let targetColId = ref<number>(1);

  function handleKcimSelect(keys) {
    console.log(keys);
    console.log(keys.rows[0]);
    if (keys.rows[0]) {
      kcimColId.value = keys.rows[0].id;
      kcimColName.value = keys.rows[0].columnName;
      kcimColType.value = keys.rows[0].columnType;
      kcimColLength.value = keys.rows[0].columnLength;
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
      targetColName.value = keys.rows[0].columnName;
      targetColType.value = keys.rows[0].columnType;
      targetColLength.value = keys.rows[0].columnLength;
      targetColSelect.value = true;
    } else {
      targetColSelect.value = false;
    }
  }

  const mapStore = useMapStore();
  let mapParams = {
    customId: 0,
    mappingType: 0,
    parentId: 0,
    repositoryId: 0,
    standardId: 1,
  };
  const mapData: MappingItem[] = [];
  const tempMapData: Array<string | undefined> = [];

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
          standardId: kcimColId.value,
          mappingType: 5,
          parentId: 9,
          repositoryId: targetRepoId.value,
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

  // const [registerMultiModal, { openModal }] = useModal();
  const [registerMultiTable, { setTableData }] = useTable({
    title: '批量导入映射关系',
    columns: MultiSelectColumns,
    // api: GetTableColumnApi,
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
  });

  watch(
    () => mapData,
    (list) => {
      nextTick(() => {
        setTableData(cloneDeep(list));
      });
    },
    {
      immediate: true,
    },
  );
  async function handleAddMap() {
    console.log('multi select');
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
          standardId: kcimColId.value,
          mappingType: 5,
          parentId: 9,
          repositoryId: targetRepoId.value,
          // standardId: ,
        };
        let tempMap = {
          kColName: kcimColName.value,
          kColType: kcimColType.value,
          kColLength: kcimColLength.value,
          tColName: targetColName.value,
          tColType: targetColType.value,
          tColLength: targetColLength.value,
        };
        mapData.push(mapParams);
        console.log(mapData);
        //@ts-ignore
        tempMapData.push(tempMap);
        console.log('tempMap');
        console.log(tempMap);
        setTableData(tempMapData);
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
  async function handleMultiSubmit() {
    console.log('multi submit');
    try {
      const result = await mapStore.saveOrUpdateMap(mapData);
      if (result) {
        notification.success({
          message: '所有映射关系提交成功',
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
  }

  function goAnchor(id) {
    var anchor = document.getElementById(id);
    console.log(id);
    // chrome
    if (id == 'colSelect') {
      //@ts-ignore
      document.body.scrollTop = anchor.offsetTop;
      isMap.value = false;
      isMulti.value = true;
    } else if (id == 'mapSelect') {
      //@ts-ignore
      document.body.scrollTop = anchor.offsetTop;
      isMap.value = true;
      isMulti.value = false;
    }
  }
</script>
<style>
  .mapSelect {
    overflow: auto;
  }
  .kcimModel {
    width: 50%;
    float: left;
    overflow: hidden;
  }
  .kcimForm {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .targetModel {
    overflow: hidden;
    width: 50%;
    float: right;
  }
  .targetForm {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .colSelect {
    overflow: auto;
  }
  .kcimTable {
    float: left;
    width: 40%;
    margin-left: 3%;
    /* margin-right: 10%; */
    margin-top: 5%;
  }

  .targetTable {
    float: right;
    width: 40%;
    margin-right: 2%;
    /* margin-left: 5%; */
    margin-top: 5%;
  }
  .mapBtnArea {
    float: left;
    width: 14%;
    margin-top: 6%;
    margin-left: 0.5%;
    /* height: 200px; */
  }
  .multiBtn {
    margin-left: 25%;
  }
  .mapBtn {
    overflow: auto;
    width: 55%;
    font-size: 370%;
    margin-top: 80px;
    margin-left: 23.5%;
    margin-right: 22.5%;
    height: 140px;
  }
  #MultiTable {
    margin-top: 30px;
    margin-left: 5%;
    margin-right: 5%;
    height: 470px;
    margin-bottom: 100px;
  }
</style>
