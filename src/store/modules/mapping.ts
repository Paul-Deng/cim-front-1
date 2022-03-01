import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { MappingItem } from '/@/api/menu/model/mapping';
import { deleteMapApi, saveOrUpdateMapApi } from '/@/api/sys/model/mapModel';
interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useMapStore = defineStore({
  id: 'map',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {},
  actions: {
    async saveOrUpdateMap(
      params: MappingItem[] & {
        mode?: ErrorMessageMode;
      },
    ): Promise<MappingItem | null> {
      try {
        // const { ...mapParams } = params;
        const data = await saveOrUpdateMapApi(params);
        return data;
      } catch (error) {
        return null;
      }
    },
    async deleteMap(
      params: number[] & {
        mode?: ErrorMessageMode;
      },
    ): Promise<Boolean> {
      try {
        const data = await deleteMapApi(params);
        return data;
      } catch (error) {
        return false;
      }
    },
  },
});
