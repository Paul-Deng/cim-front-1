import { Action, Module, VuexModule, getModule } from 'vuex-module-decorators';
import {
  FieldItem,
  BusinessObjectListResultVO,
  TableItem,
  BusinessObjectItem,
} from '/@/api/menu/model/model';
// import { ErrorMessageMode } from '/@/utils/http/axios/types';
import { ErrorMessageMode } from '/#/axios';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import store from '/@/store/index';
import {
  saveOrUpdateFieldApi,
  saveOrUpdateBizObjApi,
  saveBatchBizObjApi,
  deleteTableColumnApi,
  saveOrUpdateTableColumnApi,
  GetTableColumnApi,
  getExportDefaultBizApi,
  saveOrUpdateTableApi,
  saveOrUpdateRepositoryApi,
  deleteRepositoryApi,
  deleteFieldApi,
  deleteBizApi,
  deleteTableApi,
} from '/@/api/menu/repositories/model';
import { TableListResultVO, TableColumnItem } from '/@/api/menu/model/model';
import {
  saveOrUpdateMappingBizApi,
  saveOrUpdateMappingFieldApi,
  saveOrUpdateMappingTableApi,
  saveOrUpdateMappingColumnApi,
  getMappingColumnApi,
  deleteMappingColumnApi,
} from '/@/api/menu/mapping/mapping';
import {
  MappingColumnVO,
  MappingBizVO,
  MappingBizVOResult,
  MappingField,
  MappingFieldResultVO,
  MappingColumnVOResult,
  MappingTableVOResult,
  MappingTableVO,
} from '/@/api/menu/model/mapping';
import { BasicPageParams } from '/@/api/model/baseModel';
import { RepositoryItem, RepositoryVOPageResult } from '../../api/menu/model/model';

const NAME = 'model';
hotModuleUnregisterModule(NAME);

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Model extends VuexModule {
  @Action
  async saveOrUpdateRepository(
    params: RepositoryItem & {
      mode?: ErrorMessageMode;
    },
  ): Promise<RepositoryVOPageResult | null> {
    try {
      const { mode, ...repositoryParams } = params;
      const data = await saveOrUpdateRepositoryApi(repositoryParams, mode);
      const response = data;
      return response;
    } catch (error) {
      return null;
    }
  }

  @Action
  async deleteRepository(params: number[], mode?: ErrorMessageMode): Promise<Boolean> {
    try {
      const data = await deleteRepositoryApi(params, mode);
      const response = data;
      return response;
    } catch (error) {
      return false;
    }
  }

  @Action
  async saveOrUpdateField(
    params: FieldItem & {
      mode?: ErrorMessageMode;
    },
  ): Promise<FieldItem | null> {
    try {
      const { mode, ...fieldParams } = params;
      const data = await saveOrUpdateFieldApi(fieldParams, mode);
      const response = data;
      return response;
    } catch (error) {
      return null;
    }
  }

  @Action
  async deleteField(params: number[], mode?: ErrorMessageMode): Promise<Boolean> {
    try {
      const data = await deleteFieldApi(params, mode);
      const response = data;
      return response;
    } catch (error) {
      return false;
    }
  }

  @Action
  async saveOrUpdateBizObj(
    params: BusinessObjectItem & {
      mode?: ErrorMessageMode;
    },
  ): Promise<BusinessObjectListResultVO | null> {
    try {
      const { mode, ...businessObjectParams } = params;
      const data = await saveOrUpdateBizObjApi(businessObjectParams, mode);
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async saveBatchBizObj(params: BusinessObjectItem[]): Promise<BusinessObjectListResultVO | null> {
    try {
      const data = await saveBatchBizObjApi(params, 'message');
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async getExportDefaultBiz(): Promise<BusinessObjectListResultVO | null> {
    try {
      const data = await getExportDefaultBizApi();
      console.log(data);
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async deleteBiz(params: number[], mode?: ErrorMessageMode): Promise<Boolean> {
    try {
      const data = await deleteBizApi(params, mode);
      const response = data;
      return response;
    } catch (error) {
      return false;
    }
  }

  @Action
  async saveOrUpdateTable(
    params: TableItem & {
      mode?: ErrorMessageMode;
    },
  ): Promise<TableListResultVO | null> {
    try {
      const { mode, ...businessObjectParams } = params;
      const data = await saveOrUpdateTableApi(businessObjectParams, mode);
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async deleteTable(params: number[], mode?: ErrorMessageMode): Promise<Boolean> {
    try {
      const data = await deleteTableApi(params, mode);
      const response = data;
      return response;
    } catch (error) {
      return false;
    }
  }

  @Action
  async saveOrUpdateTableColumn(
    params: TableColumnItem & {
      mode?: ErrorMessageMode;
    },
  ): Promise<TableColumnItem | null> {
    try {
      const { mode, ...modelColumnParams } = params;
      const data = await saveOrUpdateTableColumnApi(modelColumnParams, mode);
      const response = data;
      return response;
    } catch (error) {
      return null;
    }
  }

  @Action
  async deleteTableColumn(params: number[], mode?: ErrorMessageMode): Promise<Boolean> {
    try {
      const data = await deleteTableColumnApi(params, mode);
      const response = data;
      return response;
    } catch (error) {
      return false;
    }
  }

  @Action
  async getTableColumn(
    params: TableColumnItem & {
      mode?: ErrorMessageMode;
    },
  ): Promise<TableColumnItem | null> {
    try {
      const { mode, ...modelColumnParams } = params;
      const data = await GetTableColumnApi(modelColumnParams, mode);
      const response = data;
      return response;
    } catch (error) {
      return null;
    }
  }

  @Action
  async saveOrUpdateMappingField(params: MappingField): Promise<MappingFieldResultVO | null> {
    try {
      const { ...mappingFieldParams } = params;
      const data = await saveOrUpdateMappingFieldApi(mappingFieldParams);
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async saveOrUpdateMappingBiz(params: MappingBizVO): Promise<MappingBizVOResult | null> {
    try {
      const { ...MappingBizVOParams } = params;
      const data = await saveOrUpdateMappingBizApi(MappingBizVOParams);
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async saveOrUpdateMappingTable(params: MappingTableVO): Promise<MappingTableVOResult | null> {
    try {
      const { ...MappingBizVOParams } = params;
      const data = await saveOrUpdateMappingTableApi(MappingBizVOParams);
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async saveOrUpdateMappingColumn(
    params: MappingColumnVO[],
  ): Promise<MappingColumnVOResult | null> {
    try {
      const data = await saveOrUpdateMappingColumnApi(params);
      console.log(data);
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async getMappingColumn(
    params: MappingColumnVO & BasicPageParams,
  ): Promise<MappingColumnVOResult | null> {
    try {
      const data = await getMappingColumnApi(params);
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async deleteMappingColumn(params: number[], mode?: ErrorMessageMode): Promise<Boolean> {
    try {
      const data = await deleteMappingColumnApi(params, mode);
      const response = data;
      return response;
    } catch (error) {
      return false;
    }
  }
}

export const modelStore = getModule<Model>(Model);
