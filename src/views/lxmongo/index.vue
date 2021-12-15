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
        <a-sub-menu key="level1-2" @titleClick="titleClick">
          <template #title>KCIM模型</template>
          <a-sub-menu key="level2-4" title="领域 财务">
            <a-menu-item key="10">业务对象 1</a-menu-item>
            <a-menu-item key="11">业务对象 2</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="level2-5" title="领域 客户">
            <a-menu-item key="12">业务对象 3</a-menu-item>
            <a-menu-item key="13">业务对象 4</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="level1-3" @titleClick="titleClick">
          <template #title>我的模型</template>
          <a-sub-menu key="level2-6" title="领域 财务">
            <a-menu-item key="14">业务对象 1</a-menu-item>
            <a-menu-item key="15">业务对象 2</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="level2-7" title="领域 客户">
            <a-menu-item key="15">业务对象 3</a-menu-item>
            <a-menu-item key="16">业务对象 4</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="abc">
      <a-table :columns="columns1" :data-source="data1" style="margin-right: 1%">
        <template #name="{ text }">
          <a>{{ text }}</a>
        </template>
        <template #customTitle>
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
        <template #tags="{ text: tags }">
          <span>
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template #action="{ record }">
          <span>
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions
              <down-outlined />
            </a>
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
  const columns1 = [
    {
      dataIndex: 'name',
      key: 'name',
      slots: { title: 'customTitle', customRender: 'name' },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      slots: { customRender: 'tags' },
    },
    {
      title: 'Action',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ];

  const data1 = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
</script>

<style lang="scss" scoped>
  #dddddd {
    margin-right: 10px;
  }
  .side {
    width: 20%;
    height: 100%;
    margin-top: 20px;
    float: left;
  }
  .abc {
    width: 80%;
    margin-top: 20px;
    float: right;
  }
</style>
