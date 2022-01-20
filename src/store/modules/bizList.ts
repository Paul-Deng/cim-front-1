import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { TableItem, TableListResultVO } from '/@/api/menu/model/model';
import { deleteBizApi, saveOrUpdateBizApi } from '/@/api/sys/model/bizModel';
interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useBizStore = defineStore({
  id: 'biz',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {},
  actions: {
    async saveOrUpdateBiz(
      params: TableItem & {
        mode?: ErrorMessageMode;
      },
    ): Promise<TableListResultVO | null> {
      try {
        const { ...bizParams } = params;
        const data = await saveOrUpdateBizApi(bizParams);
        return data;
      } catch (error) {
        return null;
      }
    },
    async deleteBiz(
      params: number[] & {
        mode?: ErrorMessageMode;
      },
    ): Promise<Boolean> {
      try {
        const data = await deleteBizApi(params);
        return data;
      } catch (error) {
        return false;
      }
    },
  },
});
