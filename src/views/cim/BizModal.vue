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
  // import App from '/@/App.vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { bizFormSchema } from './cim.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { notification } from 'ant-design-vue';
  import { TableItem } from '/@/api/menu/model/model';
  import { BizObjListApi } from '/@/api/menu/repositories/model';
  import { useBizStore } from '/@/store/modules/bizList';
  // import { store } from '/@/store';
  // import { router } from '/@/router';

  const isUpdate = ref(true);
  // const updateSuc = ref(false);
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: bizFormSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;
    // updateSuc.value = !!data?.updateSuc;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await BizObjListApi();
    updateSchema({
      field: 'id',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增业务对象' : '编辑业务对象'));
  const bizStore = useBizStore();
  async function handleSubmit(this: any) {
    try {
      const values = await validate();
      // TODO custom api
      var params = values;
      console.log(params);
      const result = await bizStore.saveOrUpdateBiz(
        toRaw<TableItem>({
          id: params.id,
          bizId: params.id,
          businessObjectCode: params.businessObjectCode,
          businessObjectName: params.businessObjectName,
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
      } else {
        notification.error({
          message: '提交失败',
          duration: 3,
        });
        // return false;
      }
      console.log(values);
      closeModal();
    } finally {
    }
  }
</script>
