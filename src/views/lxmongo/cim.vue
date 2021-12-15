<template>
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
    <div class="abc">
      <a-table :data-source="data" :columns="columns">
        <template
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
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { reactive, ref } from 'vue';
  import { watch } from 'vue';
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

  const searchInput = ref();

  const columns = [
    {
      title: '表名称',
      dataIndex: 'tableName',
      key: 'tableName',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'customRender',
      },
      onFilter: (value, record) =>
        record.tableName.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            console.log(searchInput.value);
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '表标识',
      dataIndex: 'tableID',
      key: 'tableID',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'customRender',
      },
      onFilter: (value, record) =>
        record.tableID.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '字段名',
      dataIndex: 'colName',
      key: 'colName',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'customRender',
      },
      onFilter: (value, record) =>
        record.colName.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '表描述',
      dataIndex: 'description',
      key: 'description',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'customRender',
      },
      onFilter: (value, record) =>
        record.description.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
  ];
  const data = [
    {
      key: '1',
      tableName: 'PAYMENT_GROUP',
      tableID: 1,
      colName: 'ID',
      description: 'ID',
    },
    {
      key: '2',
      tableName: 'PAYMENT_GROUP',
      tableID: 1,
      colName: 'TOTAL_AUTHORIZATION',
      description: '',
    },
    {
      key: '3',
      tableName: 'PAYMENT_GROUP',
      tableID: 1,
      colName: 'PAYMENT_GROUP_NUMBER',
      description: '',
    },
    {
      key: '4',
      tableName: 'PAYMENT_GROUP',
      tableID: 1,
      colName: 'TOTAL_REVERSAL_AMOUNT',
      description: '',
    },
    {
      key: '5',
      tableName: 'PAYMENT_GROUP',
      tableID: 1,
      colName: 'TOTAL_PAYMENT_AMOUNT',
      description: '',
    },
  ];

  console.log(data);
  const state = reactive({
    searchText: '',
    searchedColumn: '',
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    state.searchText = selectedKeys[0];
    state.searchedColumn = dataIndex;
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    state.searchText = '';
  };
</script>
<style lang="scss" scoped>
  .side {
    width: 19%;
    height: 100%;
    margin-top: 25px;
    margin-left: 1%;
    float: left;
    text-align: center;
  }
  .abc {
    width: 79%;
    margin-top: 25px;
    margin-right: 1%;
    float: right;
  }
  .ant-dropdown-link {
    width: 10%;
    color: red;
  }
  .highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
  }
</style>
