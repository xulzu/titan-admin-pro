<template>
  <div class="titan_opt">
    <div class="opt_but" @click="logout">
      <Icon icon="humbleicons:logout" size="22"></Icon>
    </div>
    <div class="user_opt">
      <div class="user">
        {{ userFirstName }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import axios from "axios";
import { computed, h } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useLoginStore } from "@/store/useLoginStore";
import Icon from "@/components/Icon/Icon.vue";
import { useUacStore } from "@/store/useUacStore";

const router = useRouter();
const route = useRoute();
const userFirstName = computed(() => {
  return useLoginStore().getName()?.slice(0, 1);
});

function logout() {
  useUacStore().removeAsyncRoutes(router);
  router.push("/login");
}
</script>
<style lang="less" scoped>
.titan_opt {
  display: flex;
  align-items: center;
}
.user_opt {
  width: 40px;
  height: 40px;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #8787871a;
  }

  .user {
    font-size: 16px;
    font-weight: bold;
    color: white;
    padding: 8px;
    width: 32px;
    height: 32px;
    line-height: 100%;
    border-radius: 50%;
    background-color: #c2185b;
  }
}

.opt_but {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #8787871a;
  }
}
</style>
