<!-- <template>
  <div class="translateArea">
    <div class="leftCol">
      <a-tabs class="leftTab" default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="KIS" />
        <a-tab-pane key="2" tab="JDY" force-render />
        <a-tab-pane key="3" tab="CIM" />
      </a-tabs>
      <a-cascader
        class="leftCas"
        :options="options"
        :show-search="{ filter }"
        placeholder="Please select"
        @change="onChange"
      />
    </div>
    <div class="rightCol">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="CIM" />
        <a-tab-pane key="2" tab="KIS" force-render />
        <a-tab-pane key="3" tab="JDY" />
      </a-tabs>
    </div>
  </div>
  <div class="textarea">
    <a-textarea placeholder="字段" :rows="10" class="colArea" />
    <a-textarea placeholder="目标字段" :rows="10" class="colTarget" />
  </div>

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

  function callback(key) {
    console.log(key);
  }
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

  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
            {
              value: 'xiasha',
              label: 'Xia Sha',
              disabled: true,
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua men',
            },
          ],
        },
      ],
    },
  ];

  function onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
  }
  function filter(inputValue, path) {
    return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }
</script>
<style>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
  .translateArea {
    background-color: white;
    border-color: cornsilk;
    width: 80%;
    margin-left: 10%;
  }
  .leftCol {
    width: 40%;
    float: left;
    margin-right: 10%;
  }
  .leftTab {
    width: 60%;
    float: left;
  }
  .leftCas {
    width: 30%;
    margin-left: 2%;
    margin-top: 3%;
    overflow: hidden;
  }
  .rightCol {
    width: 40%;
    overflow: hidden;
  }
  .colArea {
    width: 40%;
    margin-left: 10%;
  }
  .colTarget {
    width: 40%;
    overflow: hidden;
  }
</style> -->


<template>
  <div> hello </div>
</template>
