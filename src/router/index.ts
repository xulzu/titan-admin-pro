import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './baseRoutes'
import asyncRoutesGuard from './guard/asyncRoutesGuard'
import loaginGard from './guard/loginGuard'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
// loaginGard(router);
asyncRoutesGuard(router)
export default router
