<template>
  <div class="dashboard">
    <p># Titan admin 泰坦后台</p>
    <ul>
      <li>和泰坦一样简单粗暴，纯数值</li>
      <li>本项目为基于vue3 + vite + less的极简后台模板</li>
      <li>除了***axios***外并无其他初始依赖</li>
      <li>方便使用时自己添加eslint、ui库等等各种库</li>

      <li>route: {{ route.path }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<style lang="less" scoped>
.dashboard {
  width: 100%;
  min-height: 500px;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  // text-align: center;
  padding-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 20px;
    font-weight: bold;
  }
  ul {
    // font-size: 14px;
    margin-top: 30px;
    color: rgb(119, 119, 121);
    list-style: disc;
    li + li {
      margin-top: 10px;
    }
  }
}
</style>
