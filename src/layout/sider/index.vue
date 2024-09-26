<template>
  <aside class="titan-sider">
    <div
      class="titan-sider-chidren"
      :class="{
        collapsed: collapsed,
      }"
    >
      <Menu
        @click="clickMenu"
        :items="sysMenus || []"
        v-model:activedKey="activedKey"
        v-model:collapsed="collapsed"
      />
      <Menu
        @click="collapsed = !collapsed"
        :items="[
          {
            label: collapsed ? '展开' : '收起',
            key: 'collapsed',
            icon: IconRender('ant-design:menu-unfold-outlined'),
          },
        ]"
        :selectable="false"
        v-model:collapsed="collapsed"
      />
    </div>
  </aside>
</template>
<script lang="ts" setup>
import { h, ref } from "vue";
import Menu from "./TitanMenu/Menu.vue";
import { useUacStore } from "@/store/useUacStore";
import Icon from "@/components/Icon/Icon.vue";
import { useAppStore } from "@/store/useAppStore";
import { useRoute, useRouter } from "vue-router";
const collapsed = useAppStore().collpased;

const sysMenus = useUacStore().sysMenus;
const route = useRoute();
const router = useRouter();
const activedKey = ref("");
function IconRender(iconName: string, size = 20) {
  return () => h(Icon, { icon: iconName, size });
}

function clickMenu({ key }: any) {
  router.push(key);
}
</script>
<style lang="less" scoped>
.titan-sider {
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.titan-sider-chidren {
  background-color: rgb(255, 255, 255);
  width: 180px;
  position: relative;
  min-width: 0;
  transition: all 0.2s, background 0s;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  border: 0px solid rgb(0 0 0 / 13%);
  border-right-width: thin;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.titan-sider-chidren.collapsed {
  width: 50px;
}
</style>
