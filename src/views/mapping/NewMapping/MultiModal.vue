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
  import { mappingFormSchema } from '../mapping.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { notification } from 'ant-design-vue';
  import { useMapStore } from '/@/store/modules/mapping';
  import { MappingItem } from '/@/api/menu/model/mapping';

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: mappingFormSchema,
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
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '批量增加映射关系' : '批量编辑映射关系'));
  const mapStore = useMapStore();
  async function handleSubmit(this: any) {
    try {
      const values = await validate();
      // TODO custom api
      var params = values;
      console.log('????');
      console.log(params);
      const result = await mapStore.saveOrUpdateMap(
        toRaw<MappingItem>({
          customId: params.customId,
          id: params.id,
          mappingType: params.mappingType,
          parentId: params.parentId,
          repositoryId: params.repositoryId,
          standardId: params.standardId,
        }),
      );
      if (result) {
        notification.success({
          message: '提交成功，请刷新页面',
          duration: 1,
        });
      } else {
        notification.error({
          message: '提交失败',
          duration: 3,
        });
      }
      closeModal();
    } finally {
    }
  }
</script>
