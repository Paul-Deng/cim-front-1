// import { Action, VuexModule, getModule } from 'vuex-module-decorators';

// import { ErrorMessageMode } from '/#/axios';
// import { getMenuListResultModel, RouteItem } from '/@/api/sys/model/menuModel';
// import { saveOrUpdateMenuListApi } from '/@/api/sys/menulist/model';

// // interface MenuState {
// //   darkMode?: ThemeEnum;
// //   // Page loading status
// //   pageLoading: boolean;
// //   // project config
// //   projectConfig: ProjectConfig | null;
// //   // When the window shrinks, remember some states, and restore these states when the window is restored
// //   beforeMiniInfo: BeforeMiniState;
// // }
// // let timeId: TimeoutHandle;

// class Model extends VuexModule {
//   @Action
//   async saveOrUpdateMenuList(
//     params: RouteItem & {
//       mode?: ErrorMessageMode;
//     },
//   ): Promise<getMenuListResultModel | null> {
//     try {
//       const { ...menuParams } = params;
//       const data = await saveOrUpdateMenuListApi(menuParams);
//       return data;
//     } catch (error) {
//       return null;
//     }
//   }
// }
// // export const menuStore = defineStore({
// //   id: 'menu',
// //   state: (): MenuState => ({
// //     darkMode: undefined,
// //     pageLoading: false,
// //     projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
// //     beforeMiniInfo: {},
// //   }),
// //   //   getters: {
// //   //     getPageLoading(): boolean {
// //   //       return this.pageLoading;
// //   //     },
// //   //     getDarkMode(): 'light' | 'dark' | string {
// //   //       return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
// //   //     },

// //   //     getBeforeMiniInfo(): BeforeMiniState {
// //   //       return this.beforeMiniInfo;
// //   //     },

// //   //     getProjectConfig(): ProjectConfig {
// //   //       return this.projectConfig || ({} as ProjectConfig);
// //   //     },

// //   //     getHeaderSetting(): HeaderSetting {
// //   //       return this.getProjectConfig.headerSetting;
// //   //     },
// //   //     getMenuSetting(): MenuSetting {
// //   //       return this.getProjectConfig.menuSetting;
// //   //     },
// //   //     getTransitionSetting(): TransitionSetting {
// //   //       return this.getProjectConfig.transitionSetting;
// //   //     },
// //   //     getMultiTabsSetting(): MultiTabsSetting {
// //   //       return this.getProjectConfig.multiTabsSetting;
// //   //     },
// //   //   },
// //   actions: {
// //     // setPageLoading(loading: boolean): void {
// //     //   this.pageLoading = loading;
// //     // },

// //     // setDarkMode(mode: ThemeEnum): void {
// //     //   this.darkMode = mode;
// //     //   localStorage.setItem(APP_DARK_MODE_KEY_, mode);
// //     // },

// //     // setBeforeMiniInfo(state: BeforeMiniState): void {
// //     //   this.beforeMiniInfo = state;
// //     // },

// //     // setProjectConfig(config: DeepPartial<ProjectConfig>): void {
// //     //   this.projectConfig = deepMerge(this.projectConfig || {}, config);
// //     //   Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
// //     // },

// //     // async resetAllState() {
// //     //   resetRouter();
// //     //   Persistent.clearAll();
// //     // },
// //     // async setPageLoadingAction(loading: boolean): Promise<void> {
// //     //   if (loading) {
// //     //     clearTimeout(timeId);
// //     //     // Prevent flicker
// //     //     timeId = setTimeout(() => {
// //     //       this.setPageLoading(loading);
// //     //     }, 50);
// //     //   } else {
// //     //     this.setPageLoading(loading);
// //     //     clearTimeout(timeId);
// //     //   }
// //     // },
// //     async saveOrUpdateMenuList(
// //       params: RouteItem & {
// //         mode?: ErrorMessageMode;
// //       },
// //     ): Promise<getMenuListResultModel | null> {
// //       try {
// //         const { ...menuParams } = params;
// //         const data = await saveOrUpdateMenuListApi(menuParams);
// //         return data;
// //       } catch (error) {
// //         return null;
// //       }
// //     },
// //   },
// // });

// // // Need to be used outside the setup
// // export function useMenuStoreWithOut() {
// //   return menuStore(store);
// // }
// export const modelStore = getModule<Model>(Model);

import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { ErrorMessageMode } from '/#/axios';
import { saveOrUpdateMenuListApi } from '/@/api/sys/menulist/model';
import { RouteItem, getMenuListResultModel } from '/@/api/sys/model/menuModel';
interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {},
  actions: {
    async saveOrUpdateMenu(
      params: RouteItem & {
        mode?: ErrorMessageMode;
      },
    ): Promise<getMenuListResultModel | null> {
      try {
        const { ...menuParams } = params;
        const data = await saveOrUpdateMenuListApi(menuParams);
        return data;
      } catch (error) {
        return null;
      }
    },
  },
});
