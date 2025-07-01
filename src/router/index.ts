import { createWebHashHistory, createRouter } from "vue-router";
import routes from "./baseRoutes";
import loaginGard from "./guard/loginGuard";
import asyncRoutesGuard from "./guard/asyncRoutesGuard";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
loaginGard(router);
asyncRoutesGuard(router);
export default router;
