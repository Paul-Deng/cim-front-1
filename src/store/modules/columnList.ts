import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { deleteColumnApi, saveOrUpdateColumnApi } from '/@/api/sys/model/columnModel';
import { TableColumnItem } from '/@/api/menu/model/model';
import { GetTableColumnApi } from '/@/api/menu/repositories/model';
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
      params: TableColumnItem & {
        mode?: ErrorMessageMode;
      },
    ): Promise<TableColumnItem | null> {
      try {
        const { mode, ...modelColumnParams } = params;
        const data = await saveOrUpdateColumnApi(modelColumnParams, mode);
        const response = data;
        return response;
      } catch (error) {
        return null;
      }
    },

    async getTableColumn(
      params: TableColumnItem & {
        mode?: ErrorMessageMode;
      },
    ): Promise<TableColumnItem | null> {
      try {
        const { ...modelColumnParams } = params;
        const data = await GetTableColumnApi(modelColumnParams);
        const response = data;
        return response;
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
