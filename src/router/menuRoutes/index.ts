import type { RouteRecordRaw } from "vue-router";

//菜单路由，在这里配置的路由会被解析到右侧菜单以供点击
const routes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/index.vue"),
    meta: {
      title: "数据汇总",
      icon: "hugeicons:dashboard-square-setting",
    },
  },
  {
    path: "/sys",
    meta: {
      title: "系统管理",
      icon: "material-symbols:admin-panel-settings-rounded",
    },
    redirect: "/sys-permission",
    children: [
      {
        path: "/sys-permission",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "权限设置",
        },
      },
      {
        path: "/sys-log",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "审计日志",
        },
      },
    ],
  },
  {
    path: "/log",
    component: () => import("@/views/dashboard/index.vue"),
    meta: {
      title: "系统日志",
      icon: "material-symbols:logo-dev",
    },
  },
];
export default routes;
