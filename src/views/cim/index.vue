<template>
  <div>
    <div class="uploadbtn" width="100%">
      <ImpExcel class="m-3" @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
        <a-button> 导入Excel </a-button>
      </ImpExcel>
    </div>
    <div>
      <div class="side">
        <BasicTree
          title="CIM模型"
          toolbar
          search
          :clickRowToExpand="false"
          :treeData="treeData"
          :replaceFields="{ key: 'id', title: 'businessObjectName' }"
          @select="handleSelect"
        />
        <!-- <a-menu
          id="dddddd"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-sub-menu key="level1-1" @titleClick="titleClick">
            <template #title>CIM模型</template>
            <a-sub-menu key="level2-1" title="领域 财务">
              <a-menu-item @register="registerTable" />
              <a-menu-item key="1">凭证</a-menu-item>
              <a-menu-item key="2">科目</a-menu-item>
              <a-menu-item key="3">支付</a-menu-item>
              <a-menu-item key="4">支付方式</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="level2-2" title="领域 产品">
              <a-menu-item key="5">产品</a-menu-item>
              <a-menu-item key="6">产品分类</a-menu-item>
              <a-menu-item key="7">产品属性</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="level2-3" title="领域 用户">
              <a-menu-item key="8">用户角色</a-menu-item>
              <a-menu-item key="9">用户群体</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-menu> -->
      </div>
      <div class="atable">
        <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
          <template #action="{ record }">
            <TableAction
              :actions="[
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref } from 'vue';
  import { watch } from 'vue';
  import { columns } from './cim.data';
  import { TableListApi } from '/@/api/menu/repositories/model';
  import { ImpExcel, ExcelData } from '/@/components/Excel';
  import { BasicTable, BasicColumn, useTable, TableAction } from '/@/components/Table';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getBizList } from '/@/api/demo/system';
  import { notification } from 'ant-design-vue';
  import { useMenuStore } from '/@/store/modules/menu';

  const openKeys = ref<string[]>(['sub1']);

  watch(
    () => openKeys,
    (val) => {
      console.log('openKeys', val);
    },
  );
  
  let treeData = ref<TreeItem[]>([]);

  

  const children = ref<TreeItem[]>([]);
  children.value = (await getBizList()).items as unknown as TreeItem[];

  async function fetch() {
    console.log('ddeptList');
    console.log((await getBizList()).items);
    treeData.value = (await getBizList()).items as unknown as TreeItem[];

    const tempData = ref<TreeItem[]>([]);
    tempData.value = (await TableListApi()).items as unknown as TreeItem[];
    console.log('tablelist');
    console.log(tempData.value);
    treeData = {
      // children: tempData.value,
    };
  }

  onMounted(() => {
    fetch();
  });

  let bizIdnum = ref<number>(1);

  let requestParam = {
    bizId: bizIdnum,
  };

  let [registerTable, { reload, expandAll }] = useTable({
    title: '模型表',
    api: TableListApi,
    columns,
    formConfig: {
      labelWidth: 120,
    },
    isTreeTable: true,
    striped: false,
    useSearchForm: true,
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
    bizIdnum.value = keys[0];
    requestParam = {
      bizId: bizIdnum.value,
    };
    console.log('reload');
    console.log(requestParam);
    reload();
    // return repositoryIdnum;
  }

  const tableListRef = ref<
    {
      title: string;
      columns?: any[];
      dataSource?: any[];
    }[]
  >([]);

  const menuStore = useMenuStore();
  async function handleDelete(record: Recordable) {
    console.log('record');
    try {
      const values = record;
      var params = values;
      const id = params.id;
      var ids: Array<number> = new Array<number>();
      ids.push(id);
      const result = await menuStore.deleteRoute(ids);
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
