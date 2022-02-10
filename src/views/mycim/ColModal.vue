<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, toRaw } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { colFormSchema } from './mycim.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { notification } from 'ant-design-vue';
  import { TableItem } from '/@/api/menu/model/model';
  import { GetTableColumnApi } from '/@/api/menu/repositories/model';
  import { useColumnStore } from '/@/store/modules/columnList';

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: colFormSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    } else {
      setFieldsValue({
        repositoryId: data.record.repositoryId,
        fieldId: data.record.fieldId,
        bizId: data.record.bizId,
        tableId: data.record.tableId,
      });
    }
    const treeData = await GetTableColumnApi();
    updateSchema({
      field: 'id',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增字段' : '编辑字段'));
  const columnStore = useColumnStore();
  async function handleSubmit() {
    try {
      const values = await validate();
      // TODO custom api
      var params = values;
      console.log(params);
      const result = await columnStore.saveOrUpdateColumn(
        toRaw<TableItem>({
          columnDefaultValue: params.columnDefaultValue,
          columnDescription: params.columnDescription,
          columnForeignKey: params.columnForeignKey,
          columnLength: params.columnLength,
          columnName: params.columnName,
          columnNull: params.columnNull,
          columnPrimary: params.columnPrimary,
          columnStatus: params.columnStatus,
          columnType: params.columnType,
          columnUnique: params.columnUnique,
          id: params.id,
          tableId: params.tableId,
          bizCode: params.bizCode,
          bizId: params.bizId,
          bizName: params.bizName,
          description: params.description,
          fieldId: params.fieldId,
          repositoryId: params.repositoryId,
          userId: params.userId,
        }),
      );
      if (result) {
        notification.success({
          message: '提交成功',
          duration: 1,
        });
        // reload();
        setTimeout(async function () {
          document.location.reload();
        }, 500);
      } else {
        notification.error({
          message: '提交失败',
          duration: 3,
        });
      }
      console.log(values);
      closeModal();
    } finally {
    }
  }
</script>
