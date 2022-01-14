import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { deleteTableApi, saveOrUpdateTableApi } from '/@/api/sys/model/tableModel';
import { TableItem, TableListResultVO } from '/@/api/menu/model/model';
interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useTableStore = defineStore({
  id: 'table',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {},
  actions: {
    async saveOrUpdateTable(
      params: TableItem & {
        mode?: ErrorMessageMode;
      },
    ): Promise<TableListResultVO | null> {
      try {
        const { ...tableParams } = params;
        const data = await saveOrUpdateTableApi(tableParams);
        return data;
      } catch (error) {
        return null;
      }
    },
    async deleteTable(
      params: number[] & {
        mode?: ErrorMessageMode;
      },
    ): Promise<Boolean> {
      try {
        const data = await deleteTableApi(params);
        return data;
      } catch (error) {
        return false;
      }
    },
  },
});
