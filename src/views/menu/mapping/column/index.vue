<template>
  <div>
    <div class="editable-btn">
      <a-button class="editable-add-btn" @click="handleAdd">添加</a-button>
      <a-button class="editable-submit-btn" @click="handleSumbit">提交</a-button>
    </div>
    <a-table bordered :data-source="dataSource" :columns="columns" :pagination="false">
      <template #standardColumnName="{ record }">
        <div class="editable-cell">
          <a-select
            placeholder="请选择字段"
            v-model:value="selectedStandard[record.key]"
            style="width: 100%"
            @change="handleStandardChange"
          >
            <a-select-option v-for="item in filteredStandardOptions" :key="item.columnName">
              {{ item.columnName }}
            </a-select-option>
          </a-select>
        </div>
      </template>
      <template #standardColumnType="{ record }">
        {{ record.target.columnType }}
      </template>
      <template #standardColumnLength="{ record }">
        {{ record.target.columnLength }}
      </template>
      <template #customColumnName="{ record }">
        <div class="editable-cell">
          <a-select
            placeholder="请选择字段"
            v-model:value="selectedCustom[record.key]"
            style="width: 100%"
            @change="handleCustomChange"
          >
            <a-select-option v-for="item in filteredCustomOptions" :key="item.columnName">
              {{ item.columnName }}
            </a-select-option>
          </a-select>
        </div>
      </template>
      <template #customColumnType="{ record }">
        {{ record.source.columnType }}
      </template>
      <template #customColumnLength="{ record }">
        {{ record.source.columnLength }}
      </template>
      <template #operation="{ record }">
        <template v-if="record.id === '' || record.id === undefined">
          <a-popconfirm
            v-if="dataSource.length"
            title="确定从当前缓存页面删除吗?"
            @confirm="onDelete(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
        <templdate v-else>
          <a-popconfirm
            v-if="dataSource.length"
            title="确定从服务器中删除吗?"
            @confirm="onDeleteFromService(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </templdate>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, onBeforeMount, Ref, ref, toRaw, watchEffect } from 'vue';
  import { TableColumnItem } from '/@/api/menu/model/model';
  import { useRoute } from 'vue-router';
  import { useColumnStore } from '/@/store/modules/columnList';
  import { MappingItem } from '/@/api/menu/model/mapping';
  import { notification } from 'ant-design-vue';
  import { GlobalEnum, ModelType } from '/@/enums/globalEnums';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { useMapStore } from '/@/store/modules/mapping';
  import { router } from '/@/router';
  const mapStore = useMapStore();
  const columnStore = useColumnStore();

  interface MappingColumnTableVO {
    id?: number;
    key: number;
    source?: TableColumnItem;
    target?: TableColumnItem;
  }

  export default defineComponent({
    setup() {
      const dataSource: Ref<MappingColumnTableVO[]> = ref([]);

      let standardOptions: Ref<TableColumnItem[]> = ref([]);

      let cusotmOptions: Ref<TableColumnItem[]> = ref([]);

      const lengthSource: Ref<MappingColumnTableVO[]> = ref([]);

      const route = useRoute();

      const selectedStandard = ref<TableColumnItem[]>([]);

      const selectedCustom = ref<TableColumnItem[]>([]);

      onBeforeMount(async () => {
        const mappingQueryParams: MappingItem & BasicPageParams = {
          sourceTableId: Number(route.query.sourceTableId),
          targetTableId: Number(route.query.targetTableId),
          pageNo: 0,
          pageSize: Number(GlobalEnum.MAX_PAGE_SIZE),
        };

        const data = await mapStore.getMappingColumn(mappingQueryParams);
        for (let selected of data.items) {
          const rowKey = count.value;
          selectedStandard.value[rowKey] = selected.target.columnName;
          selectedCustom.value[rowKey] = selected.source.columnName;
          const newData = {
            id: selected.id,
            key: rowKey,
            target: selected.target,
            source: selected.source,
          };
          dataSource.value.push(newData);
          lengthSource.value.push(newData);
        }

        const standardQueryParams: TableColumnItem = {
          tableId: Number(route.query.targetTableId),
        };
        const standardRes = await columnStore.getTableColumn(standardQueryParams);
        standardOptions.value = standardRes.items;
        console.log('standard');
        console.log(standardOptions);

        const customQueryParams: TableColumnItem = {
          tableId: Number(route.query.sourceTableId),
        };
        const customRes = await columnStore.getTableColumn(customQueryParams);
        cusotmOptions.value = customRes.items;
        console.log('custom');
        console.log(cusotmOptions);
      });

      let filteredStandardOptions: Ref<TableColumnItem[]> = ref([]);
      let filteredCustomOptions: Ref<TableColumnItem[]> = ref([]);

      watchEffect(() => {
        console.log('watch');
        filteredStandardOptions.value = standardOptions.value.filter(
          (o: TableColumnItem) => !selectedStandard.value.includes(o.columnName)
        );
        filteredCustomOptions.value = cusotmOptions.value.filter(
          (o: TableColumnItem) => !selectedCustom.value.includes(o.columnName)
        );
        console.log(dataSource.value);
      });

      const count = computed(() => {
        return lengthSource.value.length + 1;
      });

      const onDelete = (key: number) => {
        (selectedStandard.value[key] = ''),
          (selectedCustom.value[key] = ''),
          (dataSource.value = dataSource.value.filter((item) => {
            return item.key !== key;
          }));
      };

      async function onDeleteFromService(key: number) {
        const dataSourceIndex = dataSource.value.findIndex((item) => {
          return item.key === key;
        });
        const mappingColumnId = dataSource.value[dataSourceIndex].id;
        onDelete(key);
        let ids: number[] = [];
        ids.push(mappingColumnId);
        const data = await mapStore.deleteMap(ids);
        console.log(data);
        if (data) {
          notification.success({
            message: '删除成功！',
            duration: 1,
          });
        }
      }

      const handleAdd = () => {
        const newData = {
          id: '',
          key: count.value,
          target: {
            columnName: '',
            columnType: '',
          },
          source: {
            columnName: '',
            columnType: '',
          },
        } as MappingColumnTableVO;
        lengthSource.value.push(newData);
        dataSource.value.push(newData);
      };

      const handleStandardChange = (value: string) => {
        const data = standardOptions.value.find((item) => item.columnName === value);
        const key = selectedStandard.value.findIndex((item) => {
          return item === value;
        });
        const dataSourceIndex = dataSource.value.findIndex((item) => {
          return item.key === key;
        });
        console.log(toRaw(dataSource.value[dataSourceIndex].source));
        dataSource.value[dataSourceIndex] = {
          id: toRaw(dataSource.value[dataSourceIndex].id),
          key: key,
          target: data,
          source: toRaw(dataSource.value[dataSourceIndex].source),
        };
      };

      const handleCustomChange = (value: string) => {
        const data = cusotmOptions.value.find((item) => item.columnName === value);
        const key = selectedCustom.value.findIndex((item) => {
          return item === value;
        });
        const dataSourceIndex = dataSource.value.findIndex((item) => {
          return item.key === key;
        });
        dataSource.value[dataSourceIndex] = toRaw({
          id: toRaw(dataSource.value[dataSourceIndex].id),
          key: key,
          source: data,
          target: toRaw(dataSource.value[dataSourceIndex].target),
        });
      };

      async function handleSumbit() {
        const filtedDataSource = dataSource.value.filter((item) => {
          return item.target.columnName !== '' && item.source.columnName !== '';
        });
        const batchData: MappingItem[] = [];
        for (let val of filtedDataSource) {
          const data = {
            parentId: Number(route.query.mappingTableId),
            mappingType: ModelType.COLUMN,
            sourceColumnId: val.source.id,
            targetColumnId: val.target.id,
          } as MappingItem;
          batchData.push(data);
        }
        console.log('batchData');
        console.log(batchData);
        const res = await mapStore.saveOrUpdateMappingColumn(batchData);
        if (res) {
          notification.success({
            message: '提交成功！',
            duration: 1,
            onClose: () => {
              router.go(-1);
            },
          });
        }
      }

      const columns = [
        {
          title: '源模型字段名',
          dataIndex: 'standardColumnName',
          required: true,
          slots: { customRender: 'standardColumnName' },
          width: '18%',
        },
        {
          title: '源模型字段类型',
          dataIndex: 'standardColumnType',
          slots: { customRender: 'standardColumnType' },
          width: '12%',
        },
        {
          title: '源模型字段长度',
          dataIndex: 'standardColumnLength',
          slots: { customRender: 'standardColumnLength' },
          width: '12%',
        },
        {
          title: '目标模型字段名',
          dataIndex: 'customColumnName',
          slots: { customRender: 'customColumnName' },
          width: '18%',
        },
        {
          title: '目标模型字段类型',
          dataIndex: 'customColumnType',
          slots: { customRender: 'customColumnType' },
          width: '12%',
        },
        {
          title: '目标模型字段长度',
          dataIndex: 'customColumnLength',
          slots: { customRender: 'customColumnLength' },
          width: '12%',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '10%',
          slots: { customRender: 'operation' },
        },
      ];

      return {
        columns,
        selectedStandard,
        standardOptions,
        cusotmOptions,
        selectedCustom,
        filteredStandardOptions,
        filteredCustomOptions,
        onDelete,
        onDeleteFromService,
        handleStandardChange,
        handleCustomChange,
        handleAdd,
        handleSumbit,
        dataSource,
        count,
      };
    },
  });
</script>
<style lang="less">
  .editable-cell {
    position: relative;
    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
    }

    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }

    .editable-cell-icon {
      margin-top: 4px;
      display: none;
    }

    .editable-cell-icon-check {
      line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }
  }
  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }
</style>
