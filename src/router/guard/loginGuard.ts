import { useLoginStore } from "@/store/useLoginStore";
import type { Router } from "vue-router";
// 如果没登录回到登录页
export default function loaginGard(router: Router) {
  router.beforeEach((route, redirect, next) => {
    if (!useLoginStore().getToken() && !["/login"].includes(route.path)) {
      next({
        path: "/login",
        query: { from: route.fullPath },
      });
    } else {
      next();
    }
  });
}
