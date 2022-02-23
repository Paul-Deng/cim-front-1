<template>
  <div>
    <div class="cardList">
      <div class="RepoListCard" :key="item.code" :data-index="id" v-for="(item, id) in abc">
        <a-card hoverable style="width: 300px">
          <template #cover>
            <div class="add-btn" style="width: 100%; flex-wrap: wrap">
              <router-link to="/mapping/add">
                <a-button type="primary" style="width: 50%"> 添加映射关系 </a-button>
              </router-link>
              <router-link to="/mapping/list">
                <a-button
                  type="primary"
                  style="background-color: cornflowerblue; width: 49%; float: right"
                >
                  查看已有映射关系
                </a-button>
              </router-link>
            </div>
            <!-- <el-avatar :style="`background:${extractColorByName(item.code)}`">
              {{ item.code }}
            </el-avatar> -->
            <!-- <img alt="example" :src="item.avatar" /> -->
          </template>
          <template #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
          </template>
          <a-card-meta :title="item.code" :description="item.type" />
        </a-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
  import { repositoryListApi } from '/@/api/menu/repositories/model';
  import { getAuthCache } from '/@/utils/auth';
  import { USER_INFO_KEY } from '/@/enums/cacheEnum';
  import { onMounted, ref, toRaw } from 'vue';
  import { UserInfo } from '/#/store';
  import { TreeItem } from '/@/components/Tree';

  let abc = ref<TreeItem[]>([]);
  async function fetch() {
    abc.value = await RepoList;
    console.log('repo inside');
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
  let params = {
    userId: userIdnum.value,
  };

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
<style lang="less" scoped>
  .cardList {
    // width: 300px;
    display: flex;
    flex-wrap: wrap;
  }
  .RepoListCard {
    margin-top: 20px;
    // margin-right: 10px;
    margin-left: 15px;
    // width: 300px no-repeat;
    // float: left;
  }
</style>
