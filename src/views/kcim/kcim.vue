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
    <a-table class="abc" :columns="columns" :data-source="data" bordered>
      <template #colName="{ text }">
        <a>{{ text }}</a>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';

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

  const columns = [
    {
      title: '业务对象',
      dataIndex: 'entityGroup',
    },
    {
      title: '表ID',
      dataIndex: 'tableId',
    },
    {
      title: '表名称',
      dataIndex: 'tableName',
    },
    {
      title: '字段名',
      dataIndex: 'colName',
      slots: { customRender: 'colName' },
    },
    {
      title: '字段类型',
      className: 'columnType',
      dataIndex: 'columnType',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ];

  const data = [
    {
      key: '1',
      entityGroup: '凭证',
      tableId: '1',
      tableName: 'ENTITY_GROUP',
      colName: 'FID',
      columnType: 'INT',
      description: '字段ID',
    },
    {
      key: '2',
      entityGroup: '凭证',
      tableId: '2',
      tableName: 'ENTITY_GROUP',
      colName: 'FNAME',
      columnType: 'VARCHAR',
      description: '姓名',
    },
    {
      key: '3',
      entityGroup: '凭证',
      tableId: '3',
      tableName: 'ENTITY_GROUP',
      colName: 'FADDRESS',
      columnType: 'VARCHAR',
      description: '地址',
    },
  ];
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
