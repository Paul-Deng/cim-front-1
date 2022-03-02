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
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { notification } from 'ant-design-vue';
  import { useMapStore } from '/@/store/modules/mapping';
  import { MappingItem } from '/@/api/menu/model/mapping';
  import { GetTableColumnApi } from '/@/api/menu/repositories/model';

  const isUpdate = ref(true);

  const MultiMapSchemas: FormSchema[] = [
    {
      label: '源字段',
      field: 'KCIMTableId',
      component: 'ApiSelect',
      required: true,
      colProps: {
        span: 20,
      },
      componentProps: () => {
        return {
          api: GetTableColumnApi,
          resultField: 'items',
          labelField: 'columnName',
          valueField: 'id',
          placeholder: '',
          numberToString: true,
          params: {
            repositoryId: kcimRepoId.value,
            fieldId: kcimFieldId.value,
            businessObjectId: kcimBizId.value,
            tableId: kcimTableId.value,
          },
          onChange: (e: ChangeEvent) => {
            kcimTableId.value = +e;
          },
        };
      },
    },
    {
      label: '目标字段',
      field: 'targetTableId',
      component: 'ApiSelect',
      required: true,
      colProps: {
        span: 20,
      },
      componentProps: ({}) => {
        return {
          api: GetTableColumnApi,
          resultField: 'items',
          labelField: 'columnCode',
          valueField: 'id',
          placeholder: '',
          numberToString: true,
          params: {
            repositoryId: targetRepoId.value,
            fieldId: targetFieldId.value,
            businessObjectId: targetBizId.value,
            tableId: targetTableId.value,
          },
          onChange: (e: ChangeEvent) => {
            kcimTableId.value = +e;
          },
        };
      },
    },
  ];
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: MultiMapSchemas,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  let kcimRepoId = ref<number>(1);
  let kcimFieldId = ref<number>(1);
  let kcimBizId = ref<number>(1);
  let kcimTableId = ref<number>(1);
  let targetRepoId = ref<number>(1);
  let targetFieldId = ref<number>(1);
  let targetBizId = ref<number>(1);
  let targetTableId = ref<number>(1);

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    } else {
      kcimRepoId.value = 1;
      kcimFieldId.value = data.record.kcimFieldId;
      kcimBizId.value = data.record.kcimBizId;
      kcimTableId.value = data.record.kcimTableId;
      targetRepoId.value = data.record.targetRepoId;
      targetFieldId.value = data.record.targetFieldId;
      targetBizId.value = data.record.targetBizId;
      targetTableId.value = data.record.targetTableId;
      //   setFieldsValue({
      // repositoryId: data.record.repositoryId,
      // fieldId: data.record.fieldId,
      //   });
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
        toRaw<MappingItem[]>([
          {
            customId: params.customId,
            id: params.id,
            mappingType: params.mappingType,
            parentId: params.parentId,
            repositoryId: params.repositoryId,
            standardId: params.standardId,
          },
        ]),
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
