<template>
  <div class="upload">
    <a-button-group>
      <a-button
        class="uploadbtn"
        @click="openUploadModal"
        preIcon="carbon:cloud-upload"
        size="medium"
      >
        {{ bindValue.name }}
      </a-button>
      <Tooltip placement="bottom" v-if="showPreview">
        <template #title>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileListRef.length">
            {{ fileListRef.length }}
          </template>
        </template>
      </Tooltip>
    </a-button-group>

    <CustomUploadModal
      v-bind="bindValue"
      :previewFileList="fileListRef"
      @register="registerUploadModal"
      @change="handleChange"
    />

    <UploadPreviewModal
      :value="fileListRef"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref, computed } from 'vue';
  import UploadPreviewModal from './UploadPreviewModal.vue';
  import { Tooltip } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { uploadContainerProps } from './props';
  import { omit } from 'lodash-es';
  import { useI18n } from '/@/hooks/web/useI18n';
  import CustomUploadModal from './CustomUploadModal.vue';
  export default defineComponent({
    name: 'CustomBasicUpload',
    components: { CustomUploadModal, UploadPreviewModal, Tooltip },
    props: uploadContainerProps,
    emits: ['change'],
    setup(props, { emit, attrs }) {
      const { t } = useI18n();
      // 上传modal
      const [registerUploadModal, { openModal: openUploadModal }] = useModal();
      //   预览modal
      const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
      const fileListRef = ref<string[]>([]);
      const showPreview = computed(() => {
        const { emptyHidePreview } = props;
        if (!emptyHidePreview) return true;
        return emptyHidePreview ? fileListRef.value.length > 0 : true;
      });
      const bindValue = computed(() => {
        const value = { ...attrs, ...props };
        return omit(value, 'onChange');
      });
      watch(
        () => props.value,
        (value = []) => {
          fileListRef.value = value;
        },
        { immediate: true },
      );
      // 上传modal保存操作
      function handleChange(urls: string[]) {
        fileListRef.value = [...unref(fileListRef), ...(urls || [])];
        emit('change', fileListRef.value);
      }
      // 预览modal保存操作
      function handlePreviewChange(urls: string[]) {
        fileListRef.value = [...(urls || [])];
        emit('change', fileListRef.value);
      }
      return {
        registerUploadModal,
        openUploadModal,
        handleChange,
        handlePreviewChange,
        registerPreviewModal,
        openPreviewModal,
        fileListRef,
        showPreview,
        bindValue,
        t,
      };
    },
  });
</script>
<style>
  .upload {
    /* width: 100px; */
    margin-right: 15px;
  }
  .uploadbtn {
    color: white;
    background-color: #0960bd;
    /* width: 200px; */
  }
</style>
