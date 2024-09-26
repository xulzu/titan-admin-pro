<template>
  <li
    class="titan-menu-item"
    @click="clickItem"
    :title="label"
    :class="{
      actived: actived,
      collapsed: collapsed,
    }"
  >
    <Render v-if="icon" :nodeFn="icon"></Render>
    <Transition name="collapsed">
      <span
        v-show="!collapsed"
        class="titan-menu-item-text"
        :class="{ 't-ml-10': !!icon }"
        >{{ label }}</span
      >
    </Transition>
  </li>
</template>
<script lang="ts" setup>
import { inject, getCurrentInstance, type VNode, computed } from "vue";
function Render(props: { nodeFn: () => VNode }) {
  return props.nodeFn();
}
const instance = getCurrentInstance();
const activedKey = inject("Titan-menu-activedKey") as any;
const collapsed = inject("Titan-menu-collapsed") as any;
const events = inject("Titan-menu-events") as any;
const selectable = inject("Titan-menu-selectable") as any;

const actived = computed(() => {
  return activedKey.value === instance?.vnode.key;
});
function clickItem() {
  if (selectable) {
    activedKey.value = instance?.vnode.key;
  }
  events.emit("click", { key: instance?.vnode.key });
}
defineProps<{
  label: string;
  icon?: () => VNode;
}>();
defineExpose({
  getKey() {
    return instance?.vnode.key;
  },
});
</script>
<style lang="less" scoped>
.titan-menu-item {
  padding-inline: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-inline: 4px;
  margin-block: 4px;
  width: calc(100% - 8px);
  height: 40px;
  line-height: 40px;
  list-style-position: inside;
  list-style-type: disc;
  padding-left: 20px;
  position: relative;
  display: flex;
  align-items: center;
  transition: border-color 0.3s, background 0.3s,
    padding 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  cursor: pointer;
  border-radius: 8px;
}
.titan-menu-item.collapsed {
  padding-inline: calc(50% - 14px);
}
.titan-menu-item-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.titan-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.06);
}
.titan-menu-item:active {
  background-color: #00000052;
}
.titan-menu-item.actived {
  color: #1677ff;
  background-color: #e6f4ff;
}
.t-ml-10 {
  margin-left: 10px;
}

.collapsed-enter-active,
.collapsed-leave-active {
  transition: width 0.25s ease, opacity 0.25s ease;
}

.collapsed-enter-from,
.collapsed-leave-to {
  opacity: 0;
  width: 0 !important;
}
</style>
