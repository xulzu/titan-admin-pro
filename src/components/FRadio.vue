<template>
  <FLabelWrapper :label="label">
    <div
      class="cursor-pointer w-full pt-[4px] pb-[5px] px-[7px] border border-solid rounded-[7px] border-[#d9d9d9] attack-detail-tag"
      :class="{
        center: align === 'center',
      }"
    >
      <template v-for="item in options || []" :key="item">
        <Tag
          @click="
            () => {
              value = item.value
            }
          "
          v-bind="
            value === item.value
              ? {
                  color: '#1e7bf7',
                  bordered: false,
                }
              : { bordered: false, class: 'bg-transparent border-transparent font-normal' }
          "
          class="radiotag"
          :class="{
            active: value === item.value,
          }"
          >{{ item.label }}</Tag
        >
      </template>
    </div>
  </FLabelWrapper>
</template>
<script lang="ts" setup>
import { Tag } from 'ant-design-vue'

import FLabelWrapper from './FLabelWrapper.vue'

const props = defineProps<{
  options: { label?: string; value?: any }[]
  label?: string
  align?: string
}>()
const value = defineModel('value')
</script>
<style lang="less" scoped>
.attack-detail-tag.center {
  display: inline-grid;
  gap: 2;
  grid-template-columns: repeat(v-bind('props.options.length'), minmax(0, 1fr));
  :deep(.radiotag) {
    width: 100%;
    margin-right: 0;
    text-align: center;
  }
}
</style>
