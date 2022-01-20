import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { deleteColumnApi, saveOrUpdateColumnApi } from '/@/api/sys/model/columnModel';
import { TableItem, TableListResultVO } from '/@/api/menu/model/model';
interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useColumnStore = defineStore({
  id: 'column',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {},
  actions: {
    async saveOrUpdateColumn(
      params: TableItem & {
        mode?: ErrorMessageMode;
      },
    ): Promise<TableListResultVO | null> {
      try {
        const { ...columnParams } = params;
        const data = await saveOrUpdateColumnApi(columnParams);
        return data;
      } catch (error) {
        return null;
      }
    },
    async deleteColumn(
      params: number[] & {
        mode?: ErrorMessageMode;
      },
    ): Promise<Boolean> {
      try {
        const data = await deleteColumnApi(params);
        return data;
      } catch (error) {
        return false;
      }
    },
  },
});
