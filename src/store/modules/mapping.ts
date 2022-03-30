import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { MappingColumnVO, MappingColumnVOResult, MappingItem } from '/@/api/menu/model/mapping';
import { deleteMapApi, saveOrUpdateMapApi } from '/@/api/sys/model/mapModel';
import { BasicPageParams } from '/@/api/model/baseModel';
import { getMappingColumnApi, saveOrUpdateMappingColumnApi } from '/@/api/menu/mapping/mapping';
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

    async getMappingColumn(params: MappingItem & BasicPageParams): Promise<MappingColumnVOResult> {
      try {
        const data = await getMappingColumnApi(params);
        return data;
      } catch (error) {
        const res: MappingColumnVOResult = {
          items: [{} as MappingColumnVO] as MappingColumnVO[],
          total: 0,
        };
        return res;
      }
    },

    async saveOrUpdateMappingColumn(params: MappingItem[]): Promise<MappingItem | null> {
      try {
        const data = await saveOrUpdateMappingColumnApi(params);
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
