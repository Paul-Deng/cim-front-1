<template>
  <a-table class="mapping-abc" :columns="columns" :data-source="data" bordered>
    <template #colName="{ text }">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
  var today = new Date();
  var now_time = (
    today.getHours() +
    ':' +
    today.getMinutes() +
    ':' +
    today.getSeconds()
  ).toString();

  const columns = [
    {
      title: '序号',
      dataIndex: 'noId',
    },
    {
      title: '表映射关系',
      dataIndex: 'rejRelation',
    },
    {
      title: '标准模型字段名',
      dataIndex: 'standardCol',
    },
    {
      title: '标准模型字段类型',
      dataIndex: 'standardColType',
    },
    {
      title: '自定义模型字段',
      dataIndex: 'customcol',
    },
    {
      title: '自定义模型字段类型',
      dataIndex: 'customcolType',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
  ];

  const data = [
    {
      key: '1',
      noId: '1',
      rejRelation: '映射示例',
      standardCol: 'FID',
      standardColType: 'VARCHAR',
      customcol: 'ID',
      customcolType: 'VARCHAR',
      updateTime: now_time,
    },
  ];
</script>
<style>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
</style>
