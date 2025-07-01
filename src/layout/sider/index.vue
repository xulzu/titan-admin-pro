<template>
  <aside class="titan-sider">
    <div
      class="titan-sider-chidren"
      :class="{
        collapsed: collapsed,
      }"
    >
      <div>
        <div
          class="flex items-center p-[2px] pt-[6px] mt-[4px] mb-[4px] transition-all"
          :class="{
            'ml-[8px]': collapsed,
            'ml-[16px]': !collapsed,
          }"
        >
          <img
            class="img-bgs"
            :class="{
              imgCollpase: collapsed,
            }"
            :src="icon"
          />
          <div
            class="desc"
            :class="{
              desCollapsed: collapsed,
            }"
          >
            <!-- <span class="logo-name truncate">SIEM </span> -->
            <div>
              <img :src="siderText" class="h-[26px]" alt="" />
            </div>
            <span style="line-height: 1em">
              <span class="titleInfo" style="line-height: 1em; margin-right: 5px">专业</span>
              <span class="titleInfo" style="line-height: 1em">高效</span>
            </span>
          </div>
        </div>
        <Menu
          @click="clickMenu"
          :items="sysMenus || []"
          v-model:activedKey="activedKey"
          v-model:collapsed="collapsed"
        />
      </div>
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
import { h, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import titanImg from '@/assets/hedwig.png'
import siderText from '@/assets/hidwig_0_1.png'
import Icon from '@/components/Icon/Icon.vue'
import { useAppStore } from '@/store/useAppStore'
import { useUacStore } from '@/store/useUacStore'

import Menu from './TitanMenu/Menu.vue'
import icon from '/owl.png'

const collapsed = useAppStore().collpased

const sysMenus = useUacStore().sysMenus
const route = useRoute()
const router = useRouter()
const activedKey = ref('')
function IconRender(iconName: string, size = 20) {
  return () => h(Icon, { icon: iconName, size })
}

function clickMenu({ key }: any) {
  router.push(key)
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
  transition:
    all 0.2s,
    background 0s;
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
.img-bgs {
  transition: width 0.2s ease;

  width: 34px;
}
.imgCollpase {
  transition: width 0.2s ease;

  width: 28px;
}
.titleInfo {
  font-size: 12px;
  color: #846e6e87;
}
.desc {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
  opacity: 1;
  transition:
    width 0.2s ease,
    opacity 0.2s ease;
  width: 100%;
  height: 44px;
  overflow: hidden;
  transform: translateY(-1px);
}
.desCollapsed {
  width: 0px;
  height: 0px;
  opacity: 0;
}
</style>
