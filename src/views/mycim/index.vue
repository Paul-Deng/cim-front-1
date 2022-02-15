<template>
  <div>
    <div class="uploadbtn" width="100%">
      <!-- <ImpExcel class="m-3" @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
        <a-button> 导入Excel </a-button>
      </ImpExcel> -->
      <!-- <CustomBasicUpload
        :maxSize="20"
        :maxNumber="10"
        title="模型"
        :api="uploadModelApi"
        :exampleApi="exportDefaultModel"
      /> -->
    </div>
    <div>
      <div class="side">
        <BasicTree
          title="模型"
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
          <!-- <template #toolbar>
            <a-button type="primary" @click="handleCreate"> 新增 </a-button>
          </template> -->
          <template #toolbar>
            <CustomBasicUpload
              :width="200"
              :maxSize="20"
              :maxNumber="10"
              title="模型"
              :api="uploadModelApi"
              :exampleApi="exportDefaultModel"
            />
            <a-button v-if="isRepo" type="primary" @click="handleCreate"> 新增模型 </a-button>
            <a-button v-if="isField" type="primary" @click="handleCreate"> 新增领域 </a-button>
            <a-button v-if="isBiz" type="primary" @click="handleCreate"> 新增业务对象 </a-button>
            <a-button v-if="isTable" type="primary" @click="handleCreate"> 新增表 </a-button>
            <a-button v-if="isCol" type="primary" @click="handleCreate"> 新增字段 </a-button>
          </template>
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
        <template v-if="isRepo">
          <RepoModal @register="registerModal" />
        </template>
        <template v-if="isField">
          <FieldModal @register="registerModal" />
        </template>
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
  import { TableColumns, ColColumns, BizColumns, FieldColumns, RepoColumns } from './mycim.data';
  import {
    FieldListApi,
    GetTableColumnApi,
    repositoryListApi,
    TableListApi,
  } from '/@/api/menu/repositories/model';
  import { uploadModelApi } from '/@/api/sys/file/upload';
  import { CustomBasicUpload } from '/@/components/Upload';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getBizList } from '/@/api/demo/system';
  import { notification } from 'ant-design-vue';
  import { useTableStore } from '/@/store/modules/tableList';
  import { useModal } from '/@/components/Modal';
  import TableModal from '/@/views/mycim/TableModal.vue';
  import BizModal from '/@/views/mycim/BizModal.vue';
  import ColModal from '/@/views/mycim/ColModal.vue';
  import RepoModal from '/@/views/mycim/RepoModal.vue';
  import FieldModal from '/@/views/mycim/FieldModal.vue';
  import { useColumnStore } from '/@/store/modules/columnList';
  import { useBizStore } from '/@/store/modules/bizList';
  import { UserInfo } from '/#/store';
  import { getAuthCache } from '/@/utils/auth';
  import { USER_INFO_KEY } from '/@/enums/cacheEnum';
  import { useFieldStore } from '/@/store/modules/fieldList';
  import { useRepoStore } from '/@/store/modules/repoList';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadDefaultModelApi } from '/@/api/sys/file/file';

  const openKeys = ref<string[]>(['sub1']);
  const { createMessage } = useMessage();

  watch(
    () => openKeys,
    (val) => {
      console.log('openKeys', val);
    },
  );

  let treeData = ref<TreeItem[]>([]);
  let fieldListTree = ref<TreeItem[]>([]);
  let bizListTree = ref<TreeItem[]>([]);

  let isField = ref(false);
  let isBiz = ref(false);
  let isTable = ref(false);
  let isCol = ref(false);
  let isRepo = ref(true);
  let userIdnum = ref<number>(1);
  userIdnum.value = getAuthCache<UserInfo>(USER_INFO_KEY).userId;
  if (userIdnum.value == 1) {
    //@ts-ignore
    userIdnum.value = null;
  }
  async function fetch() {
    treeData.value = await RepoList;
    // console.log('user id');
    // console.log(userIdnum.value);
  }
  onMounted(() => {
    fetch();
  });

  //@ts-ignore
  let repoIdnum = ref<number>(1);
  //@ts-ignore
  let fieldIdnum = ref<number>(1);
  //@ts-ignore
  let bizIdnum = ref<number>(1);
  //@ts-ignore
  let tableIdnum = ref<number>(1);
  let repoIdMap = new Map();
  let fieldIdMap = new Map();
  let bizIdMap = new Map();

  let requestParam = {
    userId: userIdnum,
    fieldId: fieldIdnum,
    bizId: bizIdnum,
    tableId: tableIdnum,
    repositoryId: repoIdnum,
  };
  let param = {
    userId: userIdnum.value,
  };

  let requestApi = ref<any>(repositoryListApi);
  let input = requestApi;

  const [registerModal, { openModal }] = useModal();

  let [registerTable, { tableReload, expandAll }] = useTable({
    title: '模型',
    columns: RepoColumns,
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

  function handleSelect(keys) {
    console.log(keys[0]);
    let indexR = keys[0].indexOf('R');
    let indexF = keys[0].indexOf('F');
    let indexB = keys[0].indexOf('B');
    let indexT = keys[0].indexOf('T');
    repoIdnum.value = keys[0].substring(0, indexR);
    fieldIdnum.value = keys[0].substring(indexR + 1, indexF);
    bizIdnum.value = keys[0].substring(indexF + 1, indexB);
    tableIdnum.value = keys[0].substring(indexB + 1, indexT);
    if (indexB > 1 && indexT < 1) {
      console.log('B - T');
      nextTick(async () => {
        isTable.value = true;
        isRepo.value = isField.value = isBiz.value = isCol.value = false;
        let params = {
          pageSize: 1000,
          repositoryId: repoIdnum.value,
          bizId: bizIdnum.value,
          fieldIdnum: fieldIdnum.value,
        };
        let arr: any[] = [];
        arr = await RepoList;
        let arr2: TreeItem[] = [];
        let arr3: TreeItem[] = [];
        arr2 = arr[0].children;
        //@ts-ignore
        arr3 = arr2[0].children;
        let num = bizIdMap.get(bizIdnum.value + 'B');
        bizListTree.value = (await TableListApi(params)).items as unknown as TreeItem[];
        const temp = toRaw(bizListTree.value);
        arr3[num].children = (() => {
          const childrenstr: any[] = [];
          const length = temp.length;
          for (let j = 0; j < length; j++) {
            childrenstr.push({
              code: temp[j].tableCode,
              id: keys[0] + temp[j].id + 'T',
              children: (() => {})(),
            });
          }
          return childrenstr;
        })();
        treeData.value = arr;
      });
      tableReload({
        api: TableListApi,
        columns: TableColumns,
        searchInfo: {
          fieldId: fieldIdnum.value,
          bizId: bizIdnum.value,
          repositoryId: repoIdnum.value,
        },
      });
    } else if (indexT > 1) {
      console.log('T - ');
      tableReload({
        api: GetTableColumnApi,
        columns: ColColumns,
        searchInfo: {
          bizId: bizIdnum.value,
          fieldId: fieldIdnum.value,
          tableId: tableIdnum.value,
          repositoryId: repoIdnum.value,
        },
      });
      nextTick(() => {
        isCol.value = true;
        isBiz.value = isTable.value = false;
      });
    } else if (indexF > 1 && indexB < 1) {
      console.log('F - B');
      nextTick(async () => {
        isBiz.value = true;
        isRepo.value = isField.value = isTable.value = isCol.value = false;
        let arr: any[] = [];
        arr = await RepoList;
        let arr2: TreeItem[] = [];
        arr2 = arr[0].children;
        let num = fieldIdMap.get(fieldIdnum.value + 'F');
        let bizParams = {
          pageSize: 1000,
          repositoryId: repoIdnum.value,
          fieldIdnum: fieldIdnum.value,
        };
        bizListTree.value = (await getBizList(bizParams)).items as unknown as TreeItem[];
        const bizTemp = toRaw(bizListTree.value);
        arr2[num].children = (() => {
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
        treeData.value = [];
        treeData.value = Object.assign(arr);
      });
      tableReload({
        api: getBizList,
        columns: BizColumns,
        searchInfo: {
          fieldId: fieldIdnum.value,
          repositoryId: repoIdnum.value,
        },
      });
    } else {
      console.log('fieldclick');
      nextTick(async () => {
        isField.value = true;
        isRepo.value = isTable.value = isBiz.value = isCol.value = false;
        let arr: any[] = [];
        arr = await RepoList;
        let num = repoIdMap.get(repoIdnum.value + 'R');
        let fieldParams = {
          pageSize: 1000,
          repositoryId: repoIdnum.value,
        };
        // console.log('repo num');
        // console.log(repoIdnum.value);
        fieldListTree.value = (await FieldListApi(fieldParams)).items as unknown as TreeItem[];
        const fieldTemp = toRaw(fieldListTree.value);
        arr[num].children = (() => {
          const result: any[] = [];
          const fieldLength = fieldTemp.length;
          for (let index = 0; index < fieldLength; index++) {
            fieldIdMap.set(fieldTemp[index].id + 'F', index);
            result.push({
              code: fieldTemp[index].fieldCode,
              id: keys[0] + fieldTemp[index].id + 'F',
              fieldName: fieldTemp[index].fieldName,
              repositoryId: repoIdnum.value,
              children: (() => {})(),
            });
          }
          return result.sort((a, b) => a.id - b.id);
        })();
        treeData.value = [];
        treeData.value = Object.assign(arr);
      });
      tableReload({
        api: FieldListApi,
        columns: FieldColumns,
        searchInfo: {
          repositoryId: repoIdnum.value,
        },
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
    if (isRepo.value) {
      repoDelete(record);
    } else if (isField.value) {
      fieldDelete(record);
    } else if (isBiz.value) {
      bizDelete(record);
    } else if (isTable.value) {
      tableDelete(record);
    } else if (isCol.value) {
      columnDelete(record);
    } else {
      bizDelete(record.id);
      console.log('error');
    }
  }

  let RepoList = (async () => {
    let tempTree = ref<TreeItem[]>([]);
    tempTree.value = (await repositoryListApi(param)).items as unknown as TreeItem[];
    const temp = toRaw(tempTree.value);
    const result: any[] = [];
    for (let index = 0; index < temp.length; index++) {
      repoIdMap.set(temp[index].id + 'R', index);
      result.push({
        code: temp[index].repositoryName,
        id: temp[index].id + 'R',
        type: temp[index].repositoryType,
        userId: userIdnum.value,
        children: (() => {})(),
      });
    }
    return result.sort((a, b) => a.id - b.id);
  })();

  // const tableListRef = ref<
  //   {
  //     title: string;
  //     columns?: any[];
  //     dataSource?: any[];
  //   }[]
  // >([]);

  const repoStore = useRepoStore();
  async function repoDelete(record: Recordable) {
    try {
      const values = record;
      var params = values;
      const id = params.id;
      var ids: Array<number> = new Array<number>();
      ids.push(id);
      const result = await repoStore.deleteRepo(ids);
      if (result) {
        notification.success({
          message: '提交成功',
          duration: 1,
        });
        tableReload();
      } else {
        notification.error({
          message: '提交失败',
          duration: 3,
        });
      }
    } finally {
    }
  }
  const fieldStore = useFieldStore();
  async function fieldDelete(record: Recordable) {
    try {
      const values = record;
      var params = values;
      const id = params.id;
      var ids: Array<number> = new Array<number>();
      ids.push(id);
      const result = await fieldStore.deleteField(ids);
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
    }
  }
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
    }
  }

  async function handleCreate(record: Recordable) {
    if (isRepo.value) {
      record.userId = userIdnum.value;
    } else if (isField.value) {
      record.repositoryId = repoIdnum.value;
    } else if (isBiz.value) {
      record.fieldId = fieldIdnum.value;
      record.repositoryId = repoIdnum.value;
    } else if (isTable.value) {
      record.bizId = bizIdnum.value;
      record.fieldId = fieldIdnum.value;
      record.repositoryId = repoIdnum.value;
    } else if (isCol.value) {
      record.tableId = tableIdnum.value;
      record.bizId = bizIdnum.value;
      record.fieldId = fieldIdnum.value;
      record.repositoryId = repoIdnum.value;
    }

    openModal(true, {
      record,
      isUpdate: false,
    });
    try {
      const values = record;
      var params = values;
      const id = params.id;
      console.log('openmodal');
      console.log(values);
      console.log(id);
    } catch (error) {
      createMessage.error('失败');
    }
  }

  function exportDefaultModel() {
    downloadDefaultModelApi();
  }

  function onFetchSuccess() {
    nextTick(expandAll);
  }
</script>
<style lang="scss" scoped>
  .side {
    width: 28%;
    margin-left: 1%;
    margin-right: 1%;
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
