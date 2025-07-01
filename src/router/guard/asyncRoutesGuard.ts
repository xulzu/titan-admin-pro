import type { Router } from "vue-router";
import { useUacStore } from "@/store/useUacStore";

const whilteList = ["/login"];
//异步添加路由，方便配合接口进行权限控制
export default function asyncRoutesGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (whilteList.includes(to.path)) {
      return next();
    }

    const uacStore = useUacStore();

    if (uacStore.inited.value) {
      next();
    } else {
      const asyncRoutes = await uacStore.initUacStore();
      asyncRoutes.forEach((route) => {
        router.addRoute(route);
      });
      //在没添加动态路由前匹配到的是404页面,路由加载后需要重定向到正确路由上去
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
