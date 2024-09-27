<template>
  <div class="flex justify-center mt-[300px]" v-if="query.code">
    <Spin size="large"></Spin>
  </div>
  <div class="login" v-else>
    <div class="container">
      <div class="content">
        <div class="logo">
          <img class="icoImg" :src="icon" width="46" />
          <div class="logo__title">
            <img :src="titanImg" height="28" style="transform: translateY(2px)" />
            防护引擎
          </div>
        </div>
        <div class="info">
          <img alt="bk" :src="bkimg" class="bkimg" />
          <div class="info-large">海德薇（Hedwig）：新一代羊毛党手机号识别引擎</div>
          <div class="mt-[16px]">海德薇是哈利波特的猫头鹰宠物，其象征智慧、警觉与守护</div>
        </div>
      </div>
      <div class="right-box">
        <div class="login-form">
          <div class="form_container">
            <div class="flex items-center">
              <div>
                <img :src="dongdongIcon" alt="" width="60" srcset="" />
              </div>
              <div class="mx-[33px]">
                <img :src="to_right" alt="" width="20" srcset="" />
              </div>
              <div class="">
                <img :src="icon" alt="" width="50" srcset="" />
              </div>
            </div>
            <button title="Sign In" @click="toSSOPAG" class="sign-in_btn">
              <span>咚咚扫码登录</span>
            </button>
            <div class="text-red-600">{{ errorMsg }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { Spin } from 'ant-design-vue'
import axios from 'axios'
import queryString from 'query-string'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import api from '@/api/api'
import bkimg from '@/assets/big-logo.png'
import titanImg from '@/assets/hedwig.png'
import dongdongIcon from '@/assets/image.png'
import to_right from '@/assets/to_right.svg'
import { useLoginStore } from '@/store/useLoginStore'
import { useUacStore } from '@/store/useUacStore'

import icon from '/owl.png'

const query = queryString.parse(location.search)
const router = useRouter()
const errorMsg = ref('')

const oldPath = useStorage('oldPath', '')

const loginStore = useLoginStore()
login()
async function login() {
  try {
    if (query.code) {
      clearQuery('code')
      clearQuery('nonce')
      clearQuery('state')
      const { data } = await axios.get(api.login, {
        params: query,
      })
      loginStore.value = data
      //登录成功
      toHome()
    }
  } catch (error) {
    errorMsg.value = error + ''
  }
}

function toHome() {
  router.push(oldPath.value || useUacStore().sysRoutes.value?.[0].path || '/404')
}

function clearQuery(key: string) {
  const obj = new URL(location.href)
  obj.searchParams.delete(key)
  history.replaceState({}, '', obj.href)
}
function toSSOPAG() {
  window.open(import.meta.env.VITE_SSO_URL, '_self')
}
</script>

<style lang="less" scoped>
.form_container {
  width: 300px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 50px 40px 20px 40px;
  font-family: 'Inter', sans-serif;
  margin-bottom: 60px;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #212121;
}

.input_container {
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.icon {
  width: 20px;
  position: absolute;
  z-index: 99;
  left: 12px;
  bottom: 9px;
}

.input_label {
  font-size: 0.75rem;
  color: #8b8e98;
  font-weight: 600;
}

.input_field {
  width: auto;
  height: 40px;
  padding: 0 0 0 40px;
  border-radius: 7px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

.sign-in_btn {
  width: 100%;
  height: 40px;
  border: 0;
  background: #05206c;
  background: #0094b4;
  border-radius: 7px;
  outline: none;
  color: #ffffff;
  cursor: pointer;
  margin-top: 20px;
}

.sign-in_ggl {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #ffffff;
  border-radius: 7px;
  outline: none;
  color: #242424;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  cursor: pointer;
}

.sign-in_apl {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #212121;
  border-radius: 7px;
  outline: none;
  color: #ffffff;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  cursor: pointer;
}

.separator {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  color: #8b8e98;
}

.separator .line {
  display: block;
  width: 100%;
  height: 1px;
  border: 0;
  background-color: #e8e8e8;
}

.note {
  font-size: 0.75rem;
  color: #8b8e98;
  text-decoration: underline;
}

.login {
  overflow: hidden;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('@/assets/login-bg.svg');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;
    z-index: 0;
  }

  .logo {
    position: absolute;
    top: 120px;

    font-size: 28px;
    font-weight: 700;
    display: flex;
    align-items: center;
    // transform translateY(-150px);
  }
  .icoImg {
    margin-right: 6px;
  }
  .container {
    z-index: 1;
    display: flex;
    width: 80%;
    margin: 0 auto;
    height: 100%;
    position: relative;
  }
  .content {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    .bkimg {
      width: 50%;
      margin: 40px 0;
    }
    .info-large {
      font-size: 24px;
    }
    .info-small {
      margin-top: 16px;
      span + span {
        margin-left: 10px;
      }
    }
  }
  .login-form {
    margin: 0 auto;

    .input_field {
      margin-top: 6px;
    }
  }
}
.title {
  font-size: 16px;
  padding-left: 5px;
  font-weight: bold;
  border-left: 4px solid var(--themeColor);
  margin-bottom: 20px;
}

.right-box {
  display: flex;
  justify-content: center;
  width: 50%;
  height: 100%;
  align-items: center;
  // padding-left: 70px;
}
</style>
