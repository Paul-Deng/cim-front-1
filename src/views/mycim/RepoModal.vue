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
  import { repoFormSchema } from './mycim.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { notification } from 'ant-design-vue';
  import { TableItem } from '/@/api/menu/model/model';
  import { repositoryListApi } from '/@/api/menu/repositories/model';
  import { useRepoStore } from '/@/store/modules/repoList';

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: repoFormSchema,
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
    const treeData = await repositoryListApi();
    updateSchema({
      field: 'id',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增模型' : '编辑模型'));
  const repoStore = useRepoStore();
  async function handleSubmit() {
    try {
      const values = await validate();
      // TODO custom api
      var params = values;
      console.log(params);
      const result = await repoStore.saveOrUpdateRepo(
        toRaw<TableItem>({
          id: params.id,
          description: params.description,
          repositoryType: params.repositoryType,
          repositoryName: params.repositoryName,
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
