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
          <template #title>我的模型</template>
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
      <a-table :columns="columns" :data-source="data" style="margin-right: 1%">
        <template #entityGroup="{ text }">
          <a>{{ text }}</a>
        </template>
        <template #customTitle>
          <span>
            <smile-outlined />
            业务对象
          </span>
        </template>
        <template #colName="{ text }">
          <span>
            <a>{{ text }}</a>
          </span>
        </template>
      </a-table>
    </div>
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

  var first_time = '09:00:00';
  var today = new Date();
  var now_time = (
    today.getHours() +
    ':' +
    today.getMinutes() +
    ':' +
    today.getSeconds()
  ).toString();

  if (now_time === first_time) {
    console.log('true');
  } else {
    console.log('false');
  }

  const columns = [
    {
      dataIndex: 'entityGroup',
      key: 'entityGroup',
      slots: { title: 'customTitle', customRender: 'entityGroup' },
    },
    {
      title: '业务对象ID',
      dataIndex: 'entityGroupId',
      key: 'entityGroupId',
    },
    {
      title: '表名称',
      dataIndex: 'tableName',
      key: 'tableName',
    },
    {
      title: '字段名',
      key: 'colName',
      dataIndex: 'colName',
      slots: { customRender: 'colName' },
    },
    {
      title: '字段类型',
      key: 'type',
      dataIndex: 'type',
      slots: { customRender: 'type' },
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      slots: { customRender: 'updateTime' },
    },
  ];

  const data = [
    {
      key: '1',
      entityGroup: '凭证',
      entityGroupId: 32,
      tableName: 'ENTITY_GROUP_TABLE_NAME',
      colName: 'FID',
      type: 'varchar',
      updateTime: now_time,
    },
    {
      key: '2',
      entityGroup: '固定资产',
      entityGroupId: 42,
      tableName: 'ENTITY_GROUP_TABLE_NAME',
      colName: 'FDATE',
      type: 'varchar',
      updateTime: now_time,
    },
    {
      key: '3',
      entityGroup: '基础资料',
      entityGroupId: 32,
      tableName: 'ENTITY_GROUP_TABLE_NAME',
      colName: 'FNAME',
      type: 'varchar',
      updateTime: now_time,
    },
  ];
</script>
<style lang="scss" scoped>
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
  .ant-dropdown-link {
    width: 10%;
    color: red;
  }
</style>
