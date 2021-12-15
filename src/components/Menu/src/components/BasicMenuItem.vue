<template>
  <MenuItem :key="item.path">
    <MenuItemContent v-bind="$props" :item="item" />
  </MenuItem>
</template>
<script lang="ts">
  // import {  } from 'vue';
  import { Menu } from 'ant-design-vue';
  import { itemProps } from '../props';

  import MenuItemContent from './MenuItemContent.vue';
  export default {
    name: 'BasicMenuItem',
    components: { MenuItem: Menu.Item, MenuItemContent },
    props: itemProps,
    setup() {
      return {};
    },
  };
</script>
