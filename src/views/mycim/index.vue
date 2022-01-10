<template>
  <div>
    <div class="side">
      <BasicTree
        title="部门列表"
        toolbar
        search
        :clickRowToExpand="false"
        :treeData="treeData"
        :replaceFields="{ key: 'id', title: 'deptName' }"
      />
      <!-- <a-menu
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
      </a-menu> -->
    </div>
    <div class="abc">
      <BasicTable @register="registerTable" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { columns } from './mycim.data';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  import { TableListApi } from '/@/api/menu/repositories/model';
  import { GlobalEnum } from '/@/enums/globalEnums';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getDeptList } from '/@/api/demo/system';

  // const selectedKeys = ref<string[]>(['1']);
  const openKeys = ref<string[]>(['sub1']);
  // const handleClick = (e: Event) => {
  //   console.log('click', e);
  // };
  // const titleClick = (e: Event) => {
  //   console.log('titleClick', e);
  // };
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

  const treeData = ref<TreeItem[]>([]);

  async function fetch() {
    treeData.value = (await getDeptList()) as unknown as TreeItem[];
  }

  // function handleSelect(keys) {
  //   emit('select', keys[0]);
  // }

  onMounted(() => {
    fetch();
  });

  const [registerTable, {}] = useTable({
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
