<template>
  <div class="foria-label-wrapper">
    <slot></slot>
    <div class="foria-label-wrapper-txt">{{ label }}</div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  label?: string
}>()
</script>
<style lang="less">
:where(.foria-label-wrapper) {
  display: inline-block;
  position: relative;
  width: 100%;
  .foria-label-wrapper-txt {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    padding: 0px 3px;
    line-height: 1.2em;
    z-index: 10;
    border-radius: 3px;
    pointer-events: none;
    font-size: 11px;
    top: -2px;

    background-color: #fff;
    color: #878b8b;
  }
}
</style>
