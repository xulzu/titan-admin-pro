import { createApp } from "vue";
import "./utils/axios";
import "./style/index.less";
import App from "./App.vue";
import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const app = createApp(App);
app.use(router);
app.mount("#app");
NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 400,
});
