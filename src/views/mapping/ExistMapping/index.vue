<template>
  <div class="basicTable" style="margin-top: 10px">
    <BasicTable class="repositories-list" @register="registerTable">
      <template #toolbar>
        <router-link to="/mapping/add">
          <a-button type="primary"> 添加表映射关系 </a-button>
        </router-link>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { MappingTableWelcomeApi } from '/@/api/menu/mapping/mapping';
  import { GlobalEnum, ModelType } from '/@/enums/globalEnums';
  import { MappingItem } from '/@/api/menu/model/mapping';
  import { getAuthCache } from '/@/utils/auth';
  import { USER_INFO_KEY } from '/@/enums/cacheEnum';
  import { ref } from 'vue';
  import { UserInfo } from '/#/store';
  import { MappingListColumns } from '../mapping.data';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  let repositoryIdnum = ref(1);
  let passParam = route.params.id;
  let tempid = 'MappingId';
  let checkStorage = localStorage.getItem(tempid);
  console.log(typeof passParam);
  if (checkStorage) {
    console.log('id exist');
    console.log(localStorage.getItem(tempid));
    repositoryIdnum.value = +checkStorage;
  } else {
    console.log('empty');
    localStorage.setItem(tempid, String(passParam));
    repositoryIdnum.value = +passParam;
    console.log(repositoryIdnum);
  }

  let userIdnum = ref<number>(1);
  userIdnum.value = getAuthCache<UserInfo>(USER_INFO_KEY).userId;
  if (userIdnum.value == 1) {
    //@ts-ignore
    userIdnum.value = null;
  }
  const requestParam: MappingItem = {
    repositoryId: repositoryIdnum.value,
    mappingType: ModelType.TABLE,
  };

  const [registerTable] = useTable({
    api: MappingTableWelcomeApi,
    searchInfo: requestParam,
    columns: MappingListColumns,
    useSearchForm: false,
    showTableSetting: false,
    striped: true,
    canResize: true,
    pagination: {
      pageSize: Number(GlobalEnum.PAGE_SIZE),
    },
  });
</script>
