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
  import { tableFormSchema } from './cim.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { notification } from 'ant-design-vue';
  import { useTableStore } from '/@/store/modules/tableList';
  import { TableItem } from '/@/api/menu/model/model';
  import { TableListApi } from '/@/api/menu/repositories/model';

  const isUpdate = ref(true);
  const props = defineProps(['bizId']);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: tableFormSchema,
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
    }
    const treeData = await TableListApi();
    updateSchema({
      field: 'id',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增表' : '编辑表'));
  const tableStore = useTableStore();
  async function handleSubmit() {
    try {
      const values = await validate();
      // TODO custom api
      var params = values;
      console.log(params);
      const result = await tableStore.saveOrUpdateTable(
        toRaw<TableItem>({
          id: params.id,
          bizId: props.bizId,
          description: params.description,
          fieldId: params.fieldId,
          tableCode: params.tableCode,
          userId: params.userId,
        }),
      );
      if (result) {
        notification.success({
          message: '提交成功，请刷新页面',
          duration: 1,
        });
        // setTimeout(async function () {
        //   document.location.reload();
        // }, 500);
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
