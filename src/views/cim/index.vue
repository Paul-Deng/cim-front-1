<template>
  <div>
    <div class="uploadbtn" width="100%">
      <ImpExcel class="m-3" @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
        <a-button> 导入Excel </a-button>
      </ImpExcel>
    </div>
    <div>
      <div class="side">
        <!-- <a-tree :load-data="fieldList" :tree-data="treeData" /> -->
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
      <div class="atable">
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
  import { ImpExcel, ExcelData } from '/@/components/Excel';
  import { BasicTable, BasicColumn, useTable, TableAction } from '/@/components/Table';
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
  const openKeys = ref<string[]>(['sub1']);

  watch(
    () => openKeys,
    (val) => {
      console.log('openKeys', val);
    },
  );

  let treeData = ref<TreeItem[]>([]);
  let bizListTree = ref<TreeItem[]>([]);
  // let tableListTree = ref<TreeItem[]>([]);
  let Params = {
    pageSize: 100,
    repositoryId: 1,
  };

  let isBiz = ref(true);
  let isTable = ref(false);
  let isCol = ref(false);

  async function fetch() {
    treeData.value = await fieldList;
    console.log(treeData.value);
  }
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

  let [registerTable, { tableReload, colReload, bizReload, expandAll }] = useTable({
    title: '模型',
    columns: BizColumns,
    api: input,
    formConfig: {
      labelWidth: 120,
    },
    isTreeTable: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
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

  async function handleSelect(keys) {
    if (keys[0] > 10000 && keys[0] <= 20000) {
      tableReload({
        api: TableListApi,
        columns: TableColumns,
        searchInfo: {
          tableId: null,
          bizId: bizIdnum.value,
        },
      });
      nextTick(async () => {
        isTable.value = true;
        isBiz.value = isCol.value = false;
        // });
        let params = {
          pageSize: 100,
          repositoryId: 1,
          bizId: keys[0] - 10000,
        };
        let arr: any[] = [];
        arr = await fieldList;
        let arr2: TreeItem[] = [];
        arr2 = arr[0].children;
        let num = keys[0] - 10001;
        bizListTree.value = (await TableListApi(params)).items as unknown as TreeItem[];
        const temp = toRaw(bizListTree.value);
        arr2[num].children = (() => {
          const childrenstr: any[] = [];
          const length = temp.length;
          for (let j = 0; j < length; j++) {
            childrenstr.push({
              code: temp[j].tableCode,
              id: temp[j].id + 20000,
            });
          }
          return childrenstr;
        })();
        // nextTick(() => {
        treeData.value = arr;
        setImmediate(nextTick);
      });
    } else if (keys[0] > 20000) {
      // console.log('registerModal');
      // console.log(keys[0]);
      // console.log(registerModal);
      tableIdnum.value = keys[0] - 20000;
      colReload({
        api: GetTableColumnApi,
        columns: ColColumns,
        searchInfo: {
          bizId: null,
          tableId: tableIdnum.value,
        },
      });
      nextTick(() => {
        isCol.value = true;
        isBiz.value = isTable.value = false;
        // setImmediate(nextTick);
      });
    } else {
      // console.log(keys[0]);
      // console.log('debug');
      fieldIdnum.value = keys[0];
      // bizReload({
      //   api: getBizList,
      //   columns: BizColumns,
      //   searchInfo: {
      //     bizId: null,
      //     tableId: null,
      //     fieldId: fieldIdnum.value,
      //   },
      // });
      nextTick(async () => {
        console.log('tick');
        isBiz.value = true;
        isTable.value = isCol.value = false;
        // setImmediate(nextTick);
        console.log(treeData);
        console.log('arr');
        let arr: any[] = [];
        console.log(testList);
        arr = await testList;
        let arr2 = arr[0];
        console.log(arr2);
        // treeData.value = arr;

        // bizListTree.value = (await TableListApi(params)).items as unknown as TreeItem[];
        // const temp = toRaw(bizListTree.value);
        arr2.children = (() => {
          const childrenstr: any[] = [];
          childrenstr.push({
            code: 888,
            id: 888,
          });
          return childrenstr;
        })();
        treeData.value = arr;
        // return await fetch();
      });
    }
  }

  function handleEditChange(record: Recordable) {
    console.log(record);
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

  let testList = (async () => {
    let testparams = {
      pageSize: 100,
      repositoryId: 55,
      // fieldId: 55,
    };
    let tempTree = ref<TreeItem[]>([]);
    tempTree.value = (await FieldListApi(testparams)).items as unknown as TreeItem[];
    const temp = toRaw(tempTree.value);
    const result: any[] = [];
    for (let index = 0; index < temp.length; index++) {
      result.push({
        code: temp[index].fieldCode,
        id: temp[index].id,
        fieldName: temp[index].fieldName,
        children: (() => {})(),
      });
    }
    return result.sort((a, b) => a.id - b.id);
  })();

  let fieldList = (async () => {
    treeData.value = (await FieldListApi(Params)).items as unknown as TreeItem[];
    let fieldnum = 1;
    let bizParams = {
      pageSize: 100,
      repositoryId: 1,
      fieldId: fieldnum,
    };
    const fieldResult: any[] = [];
    const fieldstr = toRaw(treeData.value);
    const fieldlen = fieldstr.length;
    for (let index = 0; index < fieldlen; index++) {
      fieldnum = fieldstr[index].id;
      bizParams = {
        pageSize: 100,
        repositoryId: 1,
        fieldId: fieldnum,
      };
      // bizListTree.value = (await getBizList(bizParams)).items as unknown as TreeItem[];
      // const bizTemp = toRaw(bizListTree.value);
      fieldResult.push({
        code: fieldstr[index].fieldCode,
        id: fieldstr[index].id,
        fieldName: fieldstr[index].fieldName,
        children: (() => {
          // const childrenstr: any[] = [];
          // const bizLength = bizTemp.length;
          // for (let j = 0; j < bizLength; j++) {
          // childrenstr.push({
          // code: bizTemp[j].businessObjectCode,
          // id: bizTemp[j].id + 10000,
          // fieldId: fieldstr[index].id,
          // bizName: bizTemp[index].businessObjectName,
          // children: (() => {})(),
          // });
          // }
          // return childrenstr.sort((a, b) => a.id - b.id);
        })(),
      });
    }
    return fieldResult.sort((a, b) => a.id - b.id);
  })();

  const tableListRef = ref<
    {
      title: string;
      columns?: any[];
      dataSource?: any[];
    }[]
  >([]);

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

  function loadDataSuccess(excelDataList: ExcelData[]) {
    tableListRef.value = [];
    console.log(excelDataList);
    for (const excelData of excelDataList) {
      const {
        header,
        results,
        meta: { sheetName },
      } = excelData;
      const columns: BasicColumn[] = [];
      for (const title of header) {
        columns.push({ title, dataIndex: title });
      }
      tableListRef.value.push({ title: sheetName, dataSource: results, columns });
    }
  }

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
<style lang="scss" scoped>
  .side {
    width: 35%;
    margin-left: 1%;
    float: left;
    text-align: center;
  }
  .atable {
    overflow: hidden;
    margin-right: 1%;
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
