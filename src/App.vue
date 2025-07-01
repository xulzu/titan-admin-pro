<template>
  <ConfigProvider :locale="zhCN">
    <layout></layout>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

import layout from './layout/index.vue'
</script>
