<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="downloadBatchFile">下载</a-button>
      <a-popconfirm title="确定要删除吗?" ok-text="Yes" cancel-text="No" @confirm="handleConfirm">
        <a-button type="danger">删除</a-button>
      </a-popconfirm>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, FormProps, BasicColumn } from '/@/components/Table';
  import { notification } from 'ant-design-vue';
  import { useFileStore } from '/@/store/modules/file';
  import { downloadFileApi, FileListApi } from '/@/api/sys/file/file';

  const fileStore = useFileStore();

  function getFormConfig(): Partial<FormProps> {
    return {
      labelWidth: 100,
      schemas: [
        {
          field: `fileName`,
          label: `文件名`,
          component: 'InputSearch',
          colProps: {
            xl: 12,
            xxl: 8,
          },
        },
      ],
    };
  }

  export function getBasicColumns(): BasicColumn[] {
    return [
      {
        title: '文件ID',
        dataIndex: 'id',
        width: '10%',
      },
      {
        title: '文件名',
        dataIndex: 'fileName',
        width: '50%',
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: '20%',
        filters: [
          { text: '完成', value: '0' },
          { text: '未完成', value: '1' },
          { text: '失败数据', value: '2' },
        ],
      },
      {
        title: '上传时间',
        width: '20%',
        sorter: true,
        dataIndex: 'createdTime',
      },
    ];
  }

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const [registerTable, { getSelectRowKeys, reload, clearSelectedRowKeys }] = useTable({
        title: '文件列表',
        api: FileListApi,
        columns: getBasicColumns(),
        useSearchForm: true,
        rowKey: 'id',
        formConfig: getFormConfig(),
        showTableSetting: false,
        rowSelection: { type: 'checkbox' },
      });

      function downloadBatchFile() {
        for (var id of getSelectRowKeys()) {
          downloadFileApi(Number(id));
        }
      }

      async function handleConfirm() {
        let ids: number[] = [];
        for (var id of getSelectRowKeys()) {
          ids.push(Number(id));
        }
        const res = await fileStore.deleteFile(ids, 'message');
        if (res === true) {
          notification.success({
            message: `${ids}` + '删除成功!',
            duration: 1,
            onClose: () => {
              clearSelectedRowKeys();
              reload();
            },
          });
        } else {
          notification.error({
            message: `${ids}` + '删除失败!',
            duration: 1,
            onClose: () => {
              clearSelectedRowKeys();
              reload();
            },
          });
        }
      }

      return {
        handleConfirm,
        registerTable,
        downloadBatchFile,
      };
    },
  });
</script>
