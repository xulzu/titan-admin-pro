<template>
  <li class="titan-submenu" :title="label">
    <div
      class="titan-submenu-title"
      @click="toggle"
      :class="{
        collapsed,
        active: childActive && (collapsed || !open),
      }"
    >
      <Render :nodeFn="icon" v-if="icon"></Render>
      <Transition name="collapsed">
        <div class="titan-submenu-item-wrapper" v-show="!collapsed">
          <span
            class="titan-submenu-item-text"
            :class="{ 't-ml-10': !!icon }"
            >{{ label }}</span
          >
          <div
            class="titan-menu-arrow"
            :class="{
              open: open,
            }"
          ></div>
        </div>
      </Transition>
    </div>
    <Transition v-if="!collapsed">
      <ul
        class="titan-menu-sub"
        :style="{
          height: (children?.length || 0) * 44 + 'px',
        }"
        v-show="open"
      >
        <MenuItem
          ref="menuItemRefs"
          :label="item.label"
          :icon="item.icon"
          :key="item.key"
          v-for="(item, index) in children"
        ></MenuItem>
      </ul>
    </Transition>
  </li>
</template>
<script lang="ts" setup>
import { computed, inject, ref, getCurrentInstance, type VNode } from "vue";
import { TitanMenuItemType } from "./type";
import MenuItem from "./MenuItem.vue";

const props = defineProps<{
  label: string;
  icon?: () => VNode;
  children?: TitanMenuItemType[];
}>();
function Render(props: { nodeFn: () => VNode }) {
  return props.nodeFn();
}
const instance = getCurrentInstance();
const openKeys = inject("Titan-menu-openKeys") as any;
const collapsed = inject("Titan-menu-collapsed") as any;
const activedKey = inject("Titan-menu-activedKey") as any;
const menuItemRefs = ref<InstanceType<typeof MenuItem>[]>();
const open = computed(() => {
  return openKeys.value?.includes(instance?.vnode.key);
});
const childActive = computed(() => {
  return props.children?.map((item) => item.key).includes(activedKey.value);
});
function toggle() {
  if (collapsed.value) return;
  if (open.value) {
    openKeys.value = openKeys.value?.filter(
      (item: string) => item !== instance?.vnode.key
    );
  } else {
    if (!openKeys.value?.length) {
      openKeys.value = [];
    }
    openKeys.value.push(instance?.vnode.key);
  }
}
</script>
<style lang="less" scoped>
.t-ml-10 {
  margin-left: 10px;
}
.titan-submenu {
  transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    padding 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 8px;
}

.titan-submenu-title {
  border-radius: 8px;
  position: relative;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
  padding-inline: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-inline: 4px;
  margin-block: 4px;
  width: calc(100% - 8px);
  padding-inline-end: 24px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  transition: border-color 0.3s, background 0.3s,
    padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  padding-left: 20px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
}
.titan-submenu-title.collapsed {
  padding-inline: calc(50% - 14px);
}
.titan-submenu-title.active {
  color: #1677ff;
  background-color: #e6f4ff;
}
.titan-submenu-item-wrapper {
  display: flex;
  flex: 1;
  position: relative;
  align-items: center;
}
.titan-submenu-title:active {
  background-color: #00000052;
}
.titan-submenu-item-text {
  flex: auto;
}
.titan-submenu-item-icon {
  line-height: 40px;
}
.titan-menu-sub {
  background: rgba(0, 0, 0, 0.02);
  list-style: none;
  margin: 0;
  cursor: initial;
  padding: 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  opacity: 1;
  overflow: hidden;
  :deep(.titan-menu-item) {
    padding-left: 50px;
  }
}
.titan-menu-arrow {
  position: relative;
  width: 6px;
  height: 0px;
  &::before {
    position: absolute;
    width: 6px;
    height: 1.5px;
    background-color: currentcolor;
    border-radius: 6px;
    transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    content: "";
    transform: rotate(-45deg) translateX(2.5px);
  }
  &::after {
    transform: rotate(45deg) translateX(-2.5px);
    position: absolute;
    width: 6px;
    height: 1.5px;
    background-color: currentcolor;
    border-radius: 6px;
    transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    content: "";
  }
  &.open::before {
    transform: rotate(45deg) translateX(1.5px) translateY(-2px);
  }
  &.open::after {
    transform: rotate(-45deg) translateX(-1.5px) translateY(-2px);
  }
}

.v-enter-active,
.v-leave-active {
  transition: height 0.25s ease, opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  height: 0 !important;
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
