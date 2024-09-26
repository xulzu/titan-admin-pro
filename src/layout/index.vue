<template>
  <router-view v-if="route.path === '/login'" />
  <div class="titan-layout" v-else>
    <TitanSider></TitanSider>
    <div class="layout_r">
      <TitanHeader></TitanHeader>
      <div class="router-box">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TitanSider from "./sider/index.vue";
import TitanHeader from "./header/index.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style lang="less" scoped>
.titan-layout {
  display: flex;
}
.layout_r {
  flex: 1;
}
.router-box {
  padding-top: 10px;
  padding-right: 10px;
  overflow: auto;
  position: relative;
  height: calc(100vh - 92px);
}
</style>
