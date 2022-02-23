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
  import { repositoryListApi } from '/@/api/menu/repositories/model';
  import { getAuthCache } from '/@/utils/auth';
  import { USER_INFO_KEY } from '/@/enums/cacheEnum';
  import { onMounted, ref, toRaw } from 'vue';
  import { UserInfo } from '/#/store';
  import { TreeItem } from '/@/components/Tree';
  import { MappingListColumns } from '../mapping.data';

  let abc = ref<TreeItem[]>([]);
  async function fetch() {
    abc.value = await RepoList;
    console.log('repo inside');
    // console.log(document.getElementsByName())
  }
  onMounted(() => {
    fetch();
  });

  let userIdnum = ref<number>(1);
  userIdnum.value = getAuthCache<UserInfo>(USER_INFO_KEY).userId;
  if (userIdnum.value == 1) {
    //@ts-ignore
    userIdnum.value = null;
  }
  // const route = useRoute();
  const requestParam: MappingItem = {
    mappingType: ModelType.TABLE,
  };
  let params = {
    userId: userIdnum.value,
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

  let RepoList = (async () => {
    let tempTree = ref<TreeItem[]>([]);
    tempTree.value = (await repositoryListApi(params)).items as unknown as TreeItem[];
    const temp = toRaw(tempTree.value);
    const result: any[] = [];
    for (let index = 0; index < temp.length; index++) {
      // repoIdMap.set(temp[index].id + 'R', inde/x);
      // repoTitleMap.set(temp[index].id + 'R', temp[index].repositoryName);
      result.push({
        code: temp[index].repositoryName,
        id: temp[index].id + 'R',
        type: temp[index].repositoryType,
        userId: userIdnum.value,
        children: (() => {})(),
      });
    }
    return result.sort((a, b) => a.id - b.id);
  })();
</script>
