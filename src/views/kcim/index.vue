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
        <a-sub-menu key="level1" @titleClick="titleClick">
          <template #title>KCIM模型</template>
          <a-sub-menu key="level2-1" title="领域 财务">
            <a-menu-item key="1">业务对象 1</a-menu-item>
            <a-menu-item key="2">业务对象 2</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="level2-2" title="领域 客户">
            <a-menu-item key="3">业务对象 3</a-menu-item>
            <a-menu-item key="4">业务对象 4</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="abc">
      <BasicTable @register="registerTable" @fetch-success="onFetchSuccess" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { nextTick, ref, watch } from 'vue';
  import { columns } from './kcim.data';
  import { TableListApi } from '/@/api/menu/repositories/model';
  import { useTable, BasicTable } from '/@/components/Table';

  const selectedKeys = ref<string[]>(['1']);
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
  const [registerTable, { expandAll }] = useTable({
    title: '模型列表',
    api: TableListApi,
    columns,
    formConfig: {
      labelWidth: 120,
      // schemas: searchFormSchema,
    },
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
<style>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }

  .side {
    width: 20%;
    height: 100%;
    margin-top: 25px;
    float: left;
    text-align: center;
  }

  .abc {
    width: 80%;
    margin-top: 25px;
    float: right;
  }
</style>
