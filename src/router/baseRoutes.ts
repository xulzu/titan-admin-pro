import type { RouteRecordRaw } from "vue-router";

//一些基础静态路由，不参与菜单和权限的解析
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/dashboard",
    meta: {
      title: "首页",
    },
  },
  {
    path: "/login",
    component: () => import("@/views/system/login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/:path(.*)*",
    component: () => import("@/views/system/page404.vue"),
    meta: {
      title: "404",
    },
  },
];
export default routes;
