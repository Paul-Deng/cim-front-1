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
  import { bizFormSchema } from './mycim.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { notification } from 'ant-design-vue';
  import { BusinessObjectItem } from '/@/api/menu/model/model';
  import { BizObjListApi } from '/@/api/menu/repositories/model';
  import { useBizStore } from '/@/store/modules/bizList';

  const props = defineProps(['fieldId']);

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: bizFormSchema,
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
    const treeData = await BizObjListApi();
    updateSchema({
      field: 'id',
      componentProps: { treeData },
    });
  });

  // const app = createApp(App);
  const getTitle = computed(() => (!unref(isUpdate) ? '新增业务对象' : '编辑业务对象'));

  const bizStore = useBizStore();

  async function handleSubmit(this: any) {
    try {
      const values = await validate();
      // TODO custom api
      var params = values;
      console.log(params);
      const result = await bizStore.saveOrUpdateBiz(
        toRaw<BusinessObjectItem>({
          id: params.id,
          fieldId: props.fieldId,
          businessObjectCode: params.businessObjectCode,
          businessObjectName: params.businessObjectName,
          description: params.description,
          userId: params.userId,
        }),
      );
      if (result) {
        notification.success({
          message: '提交成功，请刷新页面',
          duration: 1,
        });
        // console.log(GlobalVars.c);
        // setTimeout(async () => {
        //   document.location.reload();
        // }, 500);
      } else {
        notification.error({
          message: '提交失败',
          duration: 3,
        });
      }
      // console.log(values);
      closeModal();
      // GlobalVars.c = true;
    } finally {
    }
  }
</script>
