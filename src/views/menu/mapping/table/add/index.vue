<template>
  <PageWrapper :title="route.params.tableCode" contentBackground contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm, FormSchema } from '/@/components/Form';
  import { defineComponent } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { notification } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import {
    TableListApi,
    BizObjListApi,
    FieldListApi,
    repositoryListApi,
    GetTableColumnApi,
  } from '/@/api/menu/repositories/model';
  // import { getMappingBizKVApi, getMappingFieldKVApi } from '/@/api/menu/mapping/mapping';
  import { MappingItem } from '/@/api/menu/model/mapping';
  import { GlobalEnum } from '/@/enums/globalEnums';
  import { useMapStore } from '/@/store/modules/mapping';
  import { router } from '/@/router';
  import { useUserStore } from '/@/store/modules/user';

  const mapStore = useMapStore();
  const userStore = useUserStore();

  export default defineComponent({
    components: { BasicForm, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const route = useRoute();
      const schemas: FormSchema[] = [
        {
          label: '模型',
          field: 'KCIMRepositoryId',
          component: 'ApiSelect',
          defaultValue: 'KCIM模型',
          disabledLabelWidth: false,
          required: true,
          componentProps: {
            disabled: true,
          },
          colProps: {
            span: 12,
          },
        },
        {
          label: '目标模型',
          field: 'repositoryId',
          component: 'ApiSelect',
          required: true,
          ifShow: () => {
            return route.query.bizId === undefined;
          },
          componentProps: ({ formModel }) => {
            return {
              placeholder: '请选择模型',
              api: repositoryListApi,
              resultField: 'items',
              labelField: 'repositoryName',
              valueField: 'id',
              numberToString: true,
              params: {
                userId: userStore.getUserIdState,
              },
              onChange: async (e: ChangeEvent) => {
                formModel.fieldId = null;
              },
            };
          },
          colProps: {
            offset: 0,
            span: 12,
          },
        },
        {
          label: '领域',
          field: 'KCIMFieldId',
          component: 'ApiSelect',
          required: true,
          colProps: {
            span: 12,
          },
          componentProps: ({ formModel }) => {
            return {
              placeholder: '请选择领域',
              api: FieldListApi,
              default: null,
              resultField: 'items',
              labelField: 'fieldName',
              valueField: 'id',
              numberToString: true,
              params: {
                repositoryId: GlobalEnum.KCIM_REPOSITORY_ID,
              },
              onChange: (e: ChangeEvent) => {
                formModel.KCIMBizId = undefined;
              },
            };
          },
        },
        {
          label: '目标领域',
          field: 'fieldId',
          component: 'ApiSelect',
          required: true,
          colProps: {
            span: 12,
          },
          componentProps: ({ formModel }) => {
            return {
              placeholder: '请选择领域',
              api: FieldListApi,
              resultField: 'items',
              labelField: 'fieldName',
              valueField: 'id',
              numberToString: true,
              params: {
                repositoryId: formModel.repositoryId,
              },
              onChange: (e: ChangeEvent) => {
                formModel.bizId = null;
              },
            };
          },
        },
        {
          field: 'KCIMBizId',
          component: 'ApiSelect',
          label: '业务对象',
          required: true,
          colProps: {
            span: 12,
          },
          componentProps: ({ formModel }) => {
            return {
              api: BizObjListApi,
              resultField: 'items',
              labelField: 'businessObjectName',
              valueField: 'id',
              numberToString: true,
              params: {
                fieldId: formModel.KCIMFieldId,
              },
              onChange: (e: ChangeEvent) => {
                formModel.KCIMTableId = null;
              },
            };
          },
        },
        {
          field: 'bizId',
          component: 'ApiSelect',
          label: '目标业务对象',
          required: true,
          colProps: {
            span: 12,
          },
          componentProps: ({ formModel }) => {
            return {
              api: BizObjListApi,
              resultField: 'items',
              labelField: 'businessObjectName',
              valueField: 'id',
              placeholder: '表所属的领域名称',
              numberToString: true,
              params: {
                fieldId: formModel.fieldId,
              },
              onChange: (e: ChangeEvent) => {
                formModel.tableId = null;
              },
            };
          },
        },
        {
          label: '表',
          field: 'KCIMTableId',
          component: 'ApiSelect',
          required: true,
          colProps: {
            span: 12,
          },
          componentProps: ({ formModel }) => {
            return {
              api: TableListApi,
              resultField: 'items',
              labelField: 'tableCode',
              valueField: 'id',
              placeholder: '表名称',
              numberToString: true,
              params: {
                bizId: formModel.KCIMBizId,
              },
              onChange: () => {
                formModel.KCIMColumnId = null;
              },
            };
          },
        },
        {
          label: '目标表',
          field: 'tableId',
          component: 'ApiSelect',
          required: true,
          colProps: {
            span: 12,
          },
          componentProps: ({ formModel }) => {
            return {
              api: TableListApi,
              labelField: 'tableCode',
              valueField: 'id',
              resultField: 'items',
              placeholder: '表名称',
              numberToString: true,
              params: {
                bizId: formModel.bizId,
              },
              onChange: () => {
                formModel.columnId = null;
              },
            };
          },
        },
        {
          label: '字段',
          field: 'KCIMColumnId',
          component: 'ApiSelect',
          required: true,
          colProps: {
            span: 12,
          },
          componentProps: ({ formModel }) => {
            return {
              api: GetTableColumnApi,
              resultField: 'items',
              labelField: 'columnName',
              valueField: 'id',
              placeholder: '表名称',
              numberToString: true,
              params: {
                tableId: formModel.KCIMTableId,
              },
              onChange: () => {
                console.log(formModel.standardFieldId);
              },
            };
          },
        },
        {
          label: '目标字段',
          field: 'columnId',
          component: 'ApiSelect',
          required: true,
          colProps: {
            span: 12,
          },
          componentProps: ({ formModel }) => {
            return {
              api: GetTableColumnApi,
              resultField: 'items',
              labelField: 'columnName',
              valueField: 'id',
              placeholder: '字段名称',
              numberToString: true,
              params: {
                tableId: formModel.tableId,
              },
              onChange: () => {
                console.log(formModel.standardFieldId);
              },
            };
          },
        },
      ];

      const [register, { validate, getFieldsValue }] = useForm({
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 10,
        },
        schemas: schemas,
        actionColOptions: {
          offset: 10,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
      });

      async function customSubmitFunc() {
        try {
          await validate();
          const params = getFieldsValue();
          console.log('params');
          console.log(params);
          const mapping: MappingItem = {
            sourceColumnId: params.KCIMColumnId,
            targetColumnId: params.columnId,
          };
          const mappingList: MappingItem[] = [mapping];
          console.log(mappingList);
          const modelResult = await mapStore.saveOrUpdateMap(mappingList);
          if (modelResult) {
            notification.success({
              message: '提交成功！',
              duration: 1,
              onClose: () => {
                router.go(-1);
              },
            });
          } else {
            notification.error({
              message: '提交失败',
              duration: 1,
            });
          }
        } catch (error) {
          createMessage.error('提交失败！');
        }
      }

      return {
        register,
        route,
      };
    },
  });
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 24px;
    background: #fff;
  }
</style>
