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
  import { fieldFormSchema } from './mycim.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { notification } from 'ant-design-vue';
  import { TableItem } from '/@/api/menu/model/model';
  import { FieldListApi } from '/@/api/menu/repositories/model';
  import { useFieldStore } from '/@/store/modules/fieldList';

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: fieldFormSchema,
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
    const treeData = await FieldListApi();
    updateSchema({
      field: 'id',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增领域' : '编辑领域'));
  const fieldStore = useFieldStore();
  async function handleSubmit(this: any) {
    try {
      const values = await validate();
      // TODO custom api
      var params = values;
      console.log(params);
      const result = await fieldStore.saveOrUpdateField(
        toRaw<TableItem>({
          fieldCode: params.fieldCode,
          fieldName: params.fieldName,
          id: params.id,
          repositoryId: params.repositoryId,
        }),
      );
      if (result) {
        notification.success({
          message: '提交成功',
          duration: 1,
        });
        localStorage.setItem('state', JSON.stringify(this.$store.state));
        localStorage.getItem('state') &&
          this.$store.replaceState(JSON.parse(localStorage.getItem('state')));
        // reload();
        setTimeout(async () => {
          document.location.reload();
          if (sessionStorage.getItem('state')) {
            this.$store.replaceState(
              Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('state'))),
            );
          }
          window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('state', JSON.stringify(this.$store.state));
          });
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
