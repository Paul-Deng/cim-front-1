<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, toRaw } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getMenuList } from '/@/api/demo/system';
  import { useMenuStore } from '/@/store/modules/menu';
  import { MenuInfo } from '/@/api/sys/model/menuModel';
  import { notification } from 'ant-design-vue';
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      console.log(data.record);
      console.log(data.record.meta);
      setFieldsValue({
        ...data.record,
        ...data.record.meta,
      });
    }
    const treeData = await getMenuList();
    updateSchema({
      field: 'parentId',
      // field: 'menuName',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
  const menuStore = useMenuStore();
  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      var params = values;
      console.log(params);
      const result = await menuStore.saveOrUpdateRoute(
        toRaw<MenuInfo>({
          parentId: params.parentId,
          meta: {
            orderNo: params.orderNo,
            title: params.name,
            icon: params.icon,
            hideChildrenInMenu: params.hideChildren,
          },
          type: params.type,
          name: params.name,
          path: params.path,
          component: params.component,
          redirect: params.redirect,
        }),
      );
      if (result) {
        notification.success({
          message: '提交成功',
          duration: 1,
        });
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
      closeDrawer();
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
