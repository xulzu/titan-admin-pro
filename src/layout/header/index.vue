<template>
  <div class="header">
    <div>
      <div @click="collpase = !collpase" class="cursor-pointer">
        <Icon
          icon="ri:menu-unfold-2-fill"
          size="18"
          v-if="!collpase"
          color="#c2185b"
        ></Icon>
        <Icon
          icon="ri:menu-fold-2-fill"
          size="18"
          v-else
          color="#c2185b"
        ></Icon>
      </div>
      <div style="margin-top: 6px; font-size: 16px; font-weight: 600">
        {{ route.meta?.title }}
      </div>
    </div>
    <HeaderRightOpt></HeaderRightOpt>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import HeaderRightOpt from "./headerRightOpt.vue";
import Icon from "@/components/Icon/Icon.vue";
import { useAppStore } from "@/store/useAppStore";
const collpase = useAppStore().collpased;
const route = useRoute();
</script>
<style lang="less" scoped>
.header {
  display: flex;
  padding: 10px;
  height: 70px;

  background-color: #fff;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  margin-bottom: 0;
  margin-left: 0;
  border: 0px solid rgba(0, 0, 0, 0.062);
  border-bottom-width: thin;
}
</style>
