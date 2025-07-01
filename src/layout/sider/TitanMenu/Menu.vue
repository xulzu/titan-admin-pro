<template>
  <ul class="titan-menu">
    <template v-for="(item, index) in items" :key="index">
      <MenuItem
        v-if="!item.children?.length"
        :label="item.label"
        :icon="item.icon"
        :key="item.key"
      ></MenuItem>
      <Submenu
        v-else
        :label="item.label"
        :icon="item.icon"
        :children="item.children"
      />
    </template>
  </ul>
</template>
<script lang="ts" setup>
import { TitanMenuItemType } from "./type";
import MenuItem from "./MenuItem.vue";
import Submenu from "./Submenu.vue";
import { provide } from "vue";
import { EventBus } from "@/utils/mitter";
const props = withDefaults(
  defineProps<{
    items: TitanMenuItemType[];
    selectable?: boolean;
  }>(),
  {
    selectable: true,
  }
);
const emits = defineEmits<{
  (e: "click", params: { key: string }): void;
}>();
const events = new EventBus();
const openKeys = defineModel<string[]>("openKeys");
const activedKey = defineModel<string>("activedKey");
const collapsed = defineModel<boolean>("collapsed");
events.on("click", (params: any) => {
  emits("click", params);
});
provide("Titan-menu-openKeys", openKeys);
provide("Titan-menu-activedKey", activedKey);
provide("Titan-menu-collapsed", collapsed);
provide("Titan-menu-selectable", props.selectable);
provide("Titan-menu-events", events);
</script>
<style lang="less" scoped>
.titan-menu {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 0;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  margin-bottom: 0;
  padding-inline-start: 0;
  outline: none;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  width: 100%;
  color: rgba(0, 0, 0, 0.88);
  background: #ffffff;
  border-inline-end: none;
}
</style>
