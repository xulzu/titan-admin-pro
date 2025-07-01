import 'ant-design-vue/dist/reset.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './style/index.less'
import './style/tailwind.css'
import './utils/axios'

const app = createApp(App)
app.use(router)
app.mount('#app')
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 400,
})
