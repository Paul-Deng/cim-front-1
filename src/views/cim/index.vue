<template>
  <div>
    <div class="uploadbtn" width="100%">
      <ImpExcel class="m-3" @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
        <a-button> 导入Excel </a-button>
      </ImpExcel>
    </div>
    <div>
      <div class="side">
        <a-menu
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
        </a-menu>
      </div>
      <div class="atable">
        <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
          <!-- <template
            #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          >
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`Search ${column.dataIndex}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                <template #icon><SearchOutlined /></template>
                Search
              </a-button>
              <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
                Reset
              </a-button>
            </div>
          </template>
          <template #filterIcon="filtered">
            <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
          </template>
          <template #customRender="{ text, column }">
            <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
              <template
                v-for="(fragment, i) in text
                  .toString()
                  .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))"
              >
                <mark
                  v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
                  class="highlight"
                  :key="i"
                >
                  {{ fragment }}
                </mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </span>
            <template v-else>
              {{ text }}
            </template>
          </template> -->
        </BasicTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  import { watch } from 'vue';
  import { columns } from './cim.data';
  // import { BusinessObjectItem } from '/@/api/menu/model/model';
  import { TableListApi } from '/@/api/menu/repositories/model';
  import { ImpExcel, ExcelData } from '/@/components/Excel';
  import { BasicTable, BasicColumn, useTable } from '/@/components/Table';
  // import { useColumns } from '/@/components/Table/src/hooks/useColumns';
  import { GlobalEnum } from '/@/enums/globalEnums';

  const selectedKeys = ref<string[]>(['']);
  const openKeys = ref<string[]>(['sub1']);
  const handleClick = (e: Event) => {
    console.log('click', e);
  };
  const titleClick = (e: Event) => {
    console.log('titleClick', e);
  };
  watch(
    () => openKeys,
    (val) => {
      console.log('openKeys', val);
    },
  );

  // const [registerBiz, { expandAll }] = useTable({
  //   title: '',
  //   api: BizObjListApi,
  //   columns,
  //   formConfig: {
  //     labelWidth: 120,
  //   },
  //   isTreeTable: true,
  //   // pagination: false,
  //   striped: false,
  //   useSearchForm: false,
  //   showTableSetting: false,
  //   bordered: true,
  //   showIndexColumn: false,
  //   canResize: false,
  //   pagination: {
  //     // pageNo: Number(GlobalEnum.PAGE_SIZE),
  //     pageSize: Number(GlobalEnum.PAGE_SIZE),
  //   },
  // });

  // let bizList = await BizObjListApi();

  const [registerTable, { expandAll }] = useTable({
    title: '模型表',
    api: TableListApi,
    columns,
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
    pagination: {
      // pageNo: Number(GlobalEnum.PAGE_SIZE),
      pageSize: Number(GlobalEnum.PAGE_SIZE),
    },
  });
  // const searchInput = ref();

  const tableListRef = ref<
    {
      title: string;
      columns?: any[];
      dataSource?: any[];
    }[]
  >([]);

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

  // const state = reactive({
  //   searchText: '',
  //   searchedColumn: '',
  // });

  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   state.searchText = selectedKeys[0];
  //   state.searchedColumn = dataIndex;
  // };

  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   state.searchText = '';
  // };
  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
<style lang="scss" scoped>
  .side {
    width: 19%;
    // height: 100%;
    // margin-top: 25px;
    margin-left: 1%;
    float: left;
    text-align: center;
  }
  // .abc {
  //   // margin-top: 55px;
  // }
  .atable {
    // float: right;
    // width: 79%;
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
