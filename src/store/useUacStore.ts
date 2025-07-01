import { h, ref } from "vue";
import menuRoutes from "../router/menuRoutes/index";
import Icon from "@/components/Icon/Icon.vue";
import { Router } from "vue-router";

const inited = ref(false);

export interface MenuNode {
  label: string;
  path: string;
  icon: any;
  key: string;
  children?: MenuNode[];
}

const sysMenus = ref<MenuNode[]>([]);
const sysRoutes = ref<any>();

export function useUacStore() {
  return {
    inited,
    sysMenus,
    sysRoutes,
    initUacStore,
    removeAsyncRoutes,
  };
}

async function initUacStore() {
  // 这里暂时使用router目录下的文件生成菜单，如有需要可自行对接各类uac权限系统
  sysMenus.value = buildMenu(menuRoutes);
  sysRoutes.value = menuRoutes?.map((item) => {
    item.name = item.name || item.path;
    return item;
  });
  inited.value = true;
  return menuRoutes;
}

function buildMenu(routes: any, level = 0) {
  const arr: MenuNode[] = [];
  for (const item of routes) {
    arr.push({
      path: item.path,
      label: item.meta?.title || item?.path,
      key: item.path,
      icon:
        level === 0
          ? IconRender(item.meta?.icon || "solar:hamburger-menu-linear", 20)
          : void 0,
      children: item.children?.length
        ? buildMenu(item.children, level + 1)
        : void 0,
    });
  }
  return arr;
}

function IconRender(iconName: string, size?: number) {
  if (!iconName) {
    return void 0;
  }
  return () => h(Icon, { icon: iconName, size });
}
function removeAsyncRoutes(router: Router) {
  sysRoutes.value?.forEach((route: any) => router.removeRoute(route.name));
}
