<template>
  <div>
    <div class="uploadbtn" width="100%">
      <ImpExcel class="m-3" @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
        <a-button> 导入Excel </a-button>
      </ImpExcel>
    </div>
    <div>
      <div class="side">
        <!-- <BasicTree></BasicTree> -->
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
        <TableModal @register="registerModal" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref, toRaw } from 'vue';
  import { watch } from 'vue';
  import { columns } from './cim.data';
  import { GetTableColumnApi, TableListApi } from '/@/api/menu/repositories/model';
  import { ImpExcel, ExcelData } from '/@/components/Excel';
  import { BasicTable, BasicColumn, useTable, TableAction } from '/@/components/Table';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getBizList } from '/@/api/demo/system';
  import { notification } from 'ant-design-vue';
  import { useTableStore } from '/@/store/modules/tableList';
  import { useModal } from '/@/components/Modal';
  import TableModal from './TableModal.vue';

  const openKeys = ref<string[]>(['sub1']);

  watch(
    () => openKeys,
    (val) => {
      console.log('openKeys', val);
    },
  );

  let treeData = ref<TreeItem[]>([]);
  let tableListTree = ref<TreeItem[]>([]);
  const reParam = {
    pageSize: 100,
    repositoryId: 1,
  };

  async function fetch() {
    treeData.value = await bizList;
    console.log(treeData.value);
  }
  onMounted(() => {
    fetch();
  });

  let bizIdnum = ref<number>(1);
  let tableIdnum = ref<number>(1);

  let requestParam = {
    bizId: bizIdnum,
    tableId: tableIdnum,
  };

  let requestApi = ref<any>(TableListApi);
  let input = requestApi;

  const [registerModal, { openModal }] = useModal();

  let [registerTable, { reload, expandAll }] = useTable({
    title: '模型表',
    columns,
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

  // let reTable = registerTable;

  // let [registerTableColumn, {}] = useTable({
  //   title: '模型',
  //   columns,
  //   formConfig: {
  //     labelWidth: 120,
  //   },
  //   isTreeTable: true,
  //   striped: false,
  //   useSearchForm: true,
  //   showTableSetting: true,
  //   bordered: true,
  //   showIndexColumn: false,
  //   canResize: false,
  //   searchInfo: requestParam,
  //   actionColumn: {
  //     width: 80,
  //     title: '操作',
  //     dataIndex: 'action',
  //     slots: { customRender: 'action' },
  //     fixed: undefined,
  //   },
  // });

  function handleSelect(keys) {
    console.log(keys[0]);
    if (keys[0] > 100) {
      tableIdnum.value = keys[0] - 100;
      console.log('debug');
      requestApi = GetTableColumnApi;
      input = requestApi;
      // requestParam = {
      //   tableId: tableIdnum.value,
      // };
      reload({
        api: GetTableColumnApi,
        pageSize: 5,
        searchInfo: {
          tableId: tableIdnum.value,
        },
      });
    } else {
      bizIdnum.value = keys[0];
      requestParam = {
        bizId: bizIdnum.value,
      };
      // reTable = registerTableColumn;
      reload();
    }
    // console.log(input);
  }

  function handleEditChange(record: Recordable) {
    console.log(record);
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  let bizList = (async () => {
    treeData.value = (await getBizList(reParam)).items as unknown as TreeItem[];
    let paramsNum = 1;
    let params = {
      pageSize: 100,
      repositoryId: 1,
      bizId: paramsNum,
    };
    tableListTree.value = (await TableListApi(params)).items as unknown as TreeItem[];
    const temp = toRaw(tableListTree.value);
    const result: any[] = [];
    const str = toRaw(treeData.value);
    const treeLen = str.length;
    for (let index = 0; index < treeLen; index++) {
      result.push({
        code: str[index].businessObjectCode,
        id: str[index].id,
        bizName: str[index].bizName,
        children: (() => {
          const childrenstr: any[] = [];
          const length = temp.length;
          for (let j = 0; j < length; j++) {
            childrenstr.push({
              code: temp[j].tableCode,
              id: temp[j].id + 100,
            });
          }
          return childrenstr;
        })(),
      });
    }
    return result;
  })();

  const tableListRef = ref<
    {
      title: string;
      columns?: any[];
      dataSource?: any[];
    }[]
  >([]);

  const tableStore = useTableStore();
  async function handleDelete(record: Recordable) {
    console.log('record');
    try {
      const values = record;
      var params = values;
      const id = params.id;
      var ids: Array<number> = new Array<number>();
      ids.push(id);
      const result = await tableStore.deleteTable(ids);
      console.log(result);
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
      console.log('?');
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
    width: 19%;
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
