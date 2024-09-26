<template>
  <div class="p404">
    <img :src="img404" alt="" width="800" srcset="" />
    <button @click="toHome">页面不存在，回到首页</button>
  </div>
</template>
<script lang="ts" setup>
import img404 from "@/assets/404.svg";
import { toHome } from "@/utils/toHome";
</script>
<style lang="less" scoped>
.p404 {
  display: flex;
  justify-content: center;
  padding-top: 5vh;
  flex-direction: column;
  align-items: center;
}
button {
  padding: 12px 30px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: white;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.2s ease;
}

button:hover {
  letter-spacing: 3px;
  background-color: hsl(261deg 1.62% 16.74%);
  color: hsl(0, 0%, 100%);
  box-shadow: #565557 0px 7px 29px 0px;
}

button:active {
  letter-spacing: 3px;
  background-color: hsl(261deg 1.62% 16.74%);
  color: hsl(0, 0%, 100%);
  box-shadow: #565557 0px 7px 29px 0px;
  transform: translateY(5px);
  transition: 100ms;
}
</style>
