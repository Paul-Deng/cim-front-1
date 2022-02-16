<template v-cloak>
  <div v-cloak>
    <div v-cloak>
      <div v-cloak class="side">
        <BasicTree
          title="CIM模型"
          toolbar
          search
          :clickRowToExpand="true"
          :treeData="treeData"
          :replaceFields="{ key: 'id', title: 'code' }"
          @select="handleSelect"
        />
      </div>
      <div class="atable" v-cloak>
        <BasicTable
          @register="registerTable"
          @fetch-success="onFetchSuccess"
          @edit-change="handleEditChange"
        >
          <template #action="{ record }">
            <TableAction
              :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  onClick: handleEditChange.bind(null, record),
                },
                {
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  popConfirm: {
                    title: '是否确认删除',
                    confirm: handleDelete.bind(null, record),
                  },
                },
              ]"
            />
          </template>
        </BasicTable>
        <template v-if="isBiz">
          <BizModal @register="registerModal" />
        </template>
        <template v-if="isTable">
          <TableModal @register="registerModal" />
        </template>
        <template v-if="isCol">
          <ColModal @register="registerModal" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref, toRaw } from 'vue';
  import { watch } from 'vue';
  import { TableColumns, ColColumns, BizColumns } from './cim.data';
  import { FieldListApi, GetTableColumnApi, TableListApi } from '/@/api/menu/repositories/model';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getBizList } from '/@/api/demo/system';
  import { notification } from 'ant-design-vue';
  import { useTableStore } from '/@/store/modules/tableList';
  import { useModal } from '/@/components/Modal';
  import TableModal from './TableModal.vue';
  import BizModal from './BizModal.vue';
  import ColModal from './ColModal.vue';
  import { useColumnStore } from '/@/store/modules/columnList';
  import { useBizStore } from '/@/store/modules/bizList';
  // const openKeys = ref<string[]>(['sub1']);

  // watch(
  //   () => openKeys,
  //   (val) => {
  //     console.log('openKeys', val);
  //   },
  // );

  let treeData = ref<TreeItem[]>([]);
  let bizListTree = ref<TreeItem[]>([]);
  let Params = {
    pageSize: 1000,
    repositoryId: 1,
  };

  let isBiz = ref(true);
  let isTable = ref(false);
  let isCol = ref(false);
  let isReloadData = ref(true);

  // function forceUpdate(this: any) {
  //   this.$forceUpdate();
  // }

  async function fetch() {
    treeData.value = await fieldList;
    // console.log('fetch?');
    // console.log(treeData.value);
  }
  watch(
    () => [...treeData.value],
    (treeData, prevTreeData) => {
      console.log('dataupdated');
      console.log(treeData, prevTreeData);
    },
    {
      immediate: true,
      // deep: true,
    },
  );

  onMounted(() => {
    fetch();
  });

  let fieldIdnum = ref<number>(1);
  let bizIdnum = ref<number>(1);
  let tableIdnum = ref<number>(1);

  let requestParam = {
    fieldId: fieldIdnum,
    bizId: bizIdnum,
    tableId: tableIdnum,
  };

  let requestApi = ref<any>(getBizList);
  let input = requestApi;

  const [registerModal, { openModal }] = useModal();

  let [registerTable, { tableReload, expandAll }] = useTable({
    title: '模型',
    columns: BizColumns,
    api: input,
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
    searchInfo: requestParam,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  let fieldIdMap = new Map();
  let bizIdMap = new Map();
  function handleSelect(keys) {
    console.log(keys[0]);
    let indexF = keys[0].indexOf('F');
    let indexB = keys[0].indexOf('B');
    let indexT = keys[0].indexOf('T');
    fieldIdnum.value = keys[0].substring(0, indexF);
    bizIdnum.value = keys[0].substring(indexF + 1, indexB);
    tableIdnum.value = keys[0].substring(indexB + 1, indexT);
    if (indexB > 1 && indexT < 1) {
      isReloadData.value = false;
      nextTick(async () => {
        isTable.value = true;
        isBiz.value = isCol.value = false;
        let params = {
          pageSize: 1000,
          repositoryId: 1,
          bizId: bizIdnum.value,
          fieldIdnum: fieldIdnum.value,
        };
        let arr: any[] = [];
        arr = await fieldList;
        let arr2: TreeItem[] = [];
        arr2 = arr[0].children;
        let num = bizIdMap.get(bizIdnum.value + 'B');
        bizListTree.value = (await TableListApi(params)).items as unknown as TreeItem[];
        const temp = toRaw(bizListTree.value);
        arr2[num].children = (() => {
          const childrenstr: any[] = [];
          const length = temp.length;
          for (let j = 0; j < length; j++) {
            childrenstr.push({
              code: temp[j].tableCode,
              id: keys[0] + temp[j].id + 'T',
            });
          }
          return childrenstr;
        })();
        treeData.value = arr;
        isReloadData.value = true;
      });
      tableReload({
        api: TableListApi,
        columns: TableColumns,
        searchInfo: {
          fieldId: fieldIdnum.value,
          bizId: bizIdnum.value,
        },
      });
    } else if (indexT > 1) {
      isReloadData.value = false;
      tableReload({
        api: GetTableColumnApi,
        columns: ColColumns,
        searchInfo: {
          bizId: bizIdnum.value,
          fieldId: fieldIdnum.value,
          tableId: tableIdnum.value,
        },
      });
      nextTick(() => {
        isCol.value = true;
        isBiz.value = isTable.value = false;
        isReloadData.value = true;
      });
    } else {
      isReloadData.value = false;
      // console.log('fenye');
      // console.log(keys[0]);
      nextTick(async () => {
        isBiz.value = true;
        isTable.value = isCol.value = false;
        let arr: any[] = [];
        arr = await fieldList;
        let num = fieldIdMap.get(fieldIdnum.value + 'F');
        let bizParams = {
          pageSize: 1000,
          repositoryId: 1,
          fieldIdnum: fieldIdnum.value,
        };
        bizListTree.value = (await getBizList(bizParams)).items as unknown as TreeItem[];
        const bizTemp = toRaw(bizListTree.value);
        // console.log('bizlength');
        // console.log(num);
        arr[num].children = (() => {
          const childrenstr: any[] = [];
          const bizLength = bizTemp.length;
          for (let index = 0; index < bizLength; index++) {
            bizIdMap.set(bizTemp[index].id + 'B', index);
            childrenstr.push({
              code: bizTemp[index].businessObjectCode,
              id: keys[0] + bizTemp[index].id + 'B',
              bizName: bizTemp[index].businessObjectName,
              fieldIdnum: fieldIdnum.value,
              children: (() => {})(),
            });
          }
          return childrenstr.sort((a, b) => a.id - b.id);
        })();
        // _this.$forceUpdate();
        treeData.value = [];
        // treeData.value = await fieldList;
        treeData.value = Object.assign(arr);
        // treeData.value.set(treeData.value, arr);
        // this.$set(treeData, arr);
        // console.log('getlistagain');
        // console.log(treeData.value);
        // console.log(BasicTree);
        isReloadData.value = true;
      });
      tableReload({
        api: getBizList,
        columns: BizColumns,
        searchInfo: {
          fieldId: fieldIdnum.value,
        },
      });
    }
    // console.log('outside func');
  }
  function handleEditChange(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }
  function handleDelete(record: Recordable) {
    console.log(record);
    if (isBiz.value) {
      bizDelete(record);
    } else if (isTable.value) {
      tableDelete(record);
    } else if (isCol.value) {
      columnDelete(record);
    } else {
      bizDelete(record.id);
      console.log('error');
    }
    // if(record.id)
  }

  let fieldList = (async () => {
    let tempTree = ref<TreeItem[]>([]);
    tempTree.value = (await FieldListApi(Params)).items as unknown as TreeItem[];
    const temp = toRaw(tempTree.value);
    const result: any[] = [];
    for (let index = 0; index < temp.length; index++) {
      fieldIdMap.set(temp[index].id + 'F', index);
      result.push({
        code: temp[index].fieldCode,
        id: temp[index].id + 'F',
        fieldName: temp[index].fieldName,
        children: (() => {})(),
      });
    }
    // console.log('fieldmap');
    // console.log(fieldIdMap);
    return result.sort((a, b) => a.id - b.id);
  })();

  const tableStore = useTableStore();
  async function tableDelete(record: Recordable) {
    try {
      const values = record;
      var params = values;
      const id = params.id;
      var ids: Array<number> = new Array<number>();
      ids.push(id);
      const result = await tableStore.deleteTable(ids);
      if (result) {
        notification.success({
          message: '提交成功',
          duration: 1,
        });
        setTimeout(async function () {
          document.location.reload();
        }, 500);
      } else {
        notification.error({
          message: '提交失败',
          duration: 3,
        });
      }
    } finally {
      // console.log('?');
    }
  }
  const colStore = useColumnStore();
  async function columnDelete(record: Recordable) {
    try {
      const values = record;
      var params = values;
      const id = params.id;
      var ids: Array<number> = new Array<number>();
      ids.push(id);
      const result = await colStore.deleteColumn(ids);
      if (result) {
        notification.success({
          message: '提交成功',
          duration: 1,
        });
        setTimeout(async function () {
          document.location.reload();
        }, 500);
      } else {
        notification.error({
          message: '提交失败',
          duration: 3,
        });
      }
    } finally {
      // console.log('?');
    }
  }
  const bizStore = useBizStore();
  async function bizDelete(record: Recordable) {
    try {
      const values = record;
      var params = values;
      const id = params.id;
      var ids: Array<number> = new Array<number>();
      ids.push(id);
      const result = await bizStore.deleteBiz(ids);
      if (result) {
        notification.success({
          message: '提交成功',
          duration: 1,
        });
        setTimeout(async function () {
          document.location.reload();
        }, 500);
      } else {
        notification.error({
          message: '提交失败',
          duration: 3,
        });
      }
    } finally {
      // console.log('?');
    }
  }

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
<style lang="scss" scoped>
  [v-cloak] {
    display: none !important;
  }
  .side {
    width: 35%;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 1px;
    float: left;
    text-align: center;
  }
  .atable {
    overflow: hidden;
    margin-right: 1%;
    margin-top: 10px;
  }
  .ant-dropdown-link {
    width: 10%;
    color: red;
  }
  .highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
  }
  .uploadbtn {
    background-color: blue($color: #000000);
  }
  .m-3 {
    width: 10%;
    margin-left: 90%;
  }
</style>
