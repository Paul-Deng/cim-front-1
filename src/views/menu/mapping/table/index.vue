<template>
  <BasicTable class="repositories-list" @register="registerTable">
    <template #mappingTableCode="{ record }">
      <router-link
        :to="{
          name: 'MappingColumn',
          query: {
            sourceTableId: record.sourceTableId,
            targetTableId: record.targetTableId,
          },
        }"
      >
        {{ record.sourceTableCode }} {{ MAPPING_SEPARATOR }}
        {{ record.targetTableCode }}
      </router-link>
    </template>
    <template #sourceColumn="{ record }">
      {{ record.sourceColumnName }}
    </template>
    <template #ColumnType="{ record }">
      {{ record.sourceColumnType }}
    </template>
    <template #targetColumn="{ record }">
      {{ record.targetColumnName }}
    </template>
    <template #targetColumnType="{ record }">
      {{ record.targetColumnType }}
    </template>
    <template #toolbar>
      <router-link
        :to="{
          name: 'MappingTableAdd',
        }"
      >
        <a-button type="primary"> 添加表映射关系 </a-button>
      </router-link>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { useRoute } from 'vue-router';
  import { MappingTableWelcomeApi } from '/@/api/menu/mapping/mapping';
  import { GlobalEnum } from '/@/enums/globalEnums';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const route = useRoute();

      const columns: BasicColumn[] = [
        {
          title: '表映射关系',
          dataIndex: 'mappingTable',
          width: '40%',
          slots: {
            customRender: 'mappingTableCode',
          },
        },
        {
          title: '源模型字段名',
          dataIndex: 'sourceColumn',
          slots: {
            customRender: 'sourceColumn',
          },
          width: '20%',
        },
        {
          title: '源模型字段类型',
          dataIndex: 'sourceColumnType',
          slots: {
            customRender: 'sourceColumnType',
          },
          width: '5%',
        },
        {
          title: '目标模型字段',
          dataIndex: 'targetColumn',
          slots: {
            customRender: 'targetColumn',
          },
          width: '20%',
        },
        {
          title: '目标模型类型',
          dataIndex: 'targetColumnType',
          slots: {
            customRender: 'targetColumnType',
          },
          width: '5%',
        },
        {
          title: '更新时间',
          width: '10%',
          dataIndex: 'updatedTime',
        },
      ];

      const MAPPING_SEPARATOR = GlobalEnum.MAPPING_SEPARATOR;

      const [registerTable] = useTable({
        api: MappingTableWelcomeApi,
        columns: columns,
        useSearchForm: false,
        showTableSetting: false,
        striped: true,
        canResize: true,
        pagination: {
          pageSize: Number(GlobalEnum.PAGE_SIZE),
        },
      });
      return {
        registerTable,
        MAPPING_SEPARATOR,
        route,
      };
    },
  });
</script>

<style lang="less" scoped></style>
