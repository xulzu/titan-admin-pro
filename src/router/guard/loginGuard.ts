import type { Router } from 'vue-router'

import { useLoginStore } from '@/store/useLoginStore'

// 如果没登录回到登录页
export default function loaginGard(router: Router) {
  router.beforeEach((route, redirect, next) => {
    if (route.path !== '/login') {
      localStorage.setItem('oldPath', route?.redirectedFrom?.fullPath || route.fullPath)
    }
    if (!useLoginStore().value?.etoken && !['/login'].includes(route.path)) {
      next({
        path: '/login',
        query: { from: route.fullPath },
      })
    } else {
      next()
    }
  })
}
