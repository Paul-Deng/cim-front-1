import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { FieldItem } from '/@/api/menu/model/model';
import { deleteFieldApi, saveOrUpdateFieldApi } from '/@/api/sys/model/fieldModel';
interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useFieldStore = defineStore({
  id: 'field',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {},
  actions: {
    async saveOrUpdateField(
      params: FieldItem & {
        mode?: ErrorMessageMode;
      },
    ): Promise<FieldItem | null> {
      try {
        const { ...fieldParams } = params;
        const data = await saveOrUpdateFieldApi(fieldParams);
        return data;
      } catch (error) {
        return null;
      }
    },
    async deleteField(
      params: number[] & {
        mode?: ErrorMessageMode;
      },
    ): Promise<Boolean> {
      try {
        const data = await deleteFieldApi(params);
        return data;
      } catch (error) {
        return false;
      }
    },
  },
});
