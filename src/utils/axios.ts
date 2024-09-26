import { useLoginStore } from "@/store/useLoginStore";
import axios from "axios";
import NProgress from "nprogress";

// axios默认配置
axios.defaults.timeout = 2 * 60 * 1000; // 超时时间
axios.defaults.baseURL = import.meta.env.VITE_BaseAPI;

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    config.headers["Authorization"] = useLoginStore().getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);
export default axios;
