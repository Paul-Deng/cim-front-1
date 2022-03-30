import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { deleteFileApi } from '/@/api/sys/file/file';
interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useFileStore = defineStore({
  id: 'file',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {},
  actions: {
    async deleteFile(params: number[], mode?: ErrorMessageMode): Promise<Boolean> {
      try {
        const data = await deleteFileApi(params, mode);
        const response = data;
        return response;
      } catch (error) {
        return false;
      }
    },
  },
});
