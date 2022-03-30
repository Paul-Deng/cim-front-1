import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { RepositoryVOPageResult } from '/@/api/menu/model/model';
import { deleteRepoApi, saveOrUpdateRepoApi } from '/@/api/sys/model/repoModel';
import { RepositoryItem } from '../../api/menu/model/model';
interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useRepoStore = defineStore({
  id: 'repo',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {},
  actions: {
    async saveOrUpdateRepo(
      params: RepositoryItem & {
        mode?: ErrorMessageMode;
      },
    ): Promise<RepositoryVOPageResult | null> {
      try {
        const { ...repoParams } = params;
        const data = await saveOrUpdateRepoApi(repoParams);
        return data;
      } catch (error) {
        return null;
      }
    },
    async deleteRepo(
      params: number[] & {
        mode?: ErrorMessageMode;
      },
    ): Promise<Boolean> {
      try {
        const data = await deleteRepoApi(params);
        return data;
      } catch (error) {
        return false;
      }
    },
  },
});
