<template>
  <Modal v-model:open="dialogVisible" title="构建项目" width="600px">
    <Form
      ref="formRef"
      :model="form"
      autocapitalize="off"
      :labelCol="{
        style: {
          width: '80px',
        },
      }"
    >
      <FormItem label="项目名称" name="name" :rules="rulesRequired">
        <Input v-model:value="form.name" disabled />
      </FormItem>
      <FormItem label="分支" name="branch" :rules="rulesRequired">
        <Select
          v-model:value="form.branch"
          @change="loadCommitList"
          :options="branchList?.map((item) => ({ label: item, value: item })) || []"
        />
      </FormItem>
      <FormItem label="环境" name="env" :rules="rulesRequired">
        <FRadio
          :label="commandMap[form.env]"
          align="center"
          v-model:value="form.env"
          :options="['prod', 'test', 'dev'].map((item) => ({ label: item, value: item })) || []"
        />
      </FormItem>
      <!-- <FormItem label="命令">
        <Input v-model:value="form.command" />
      </FormItem> -->
      <FormItem label="描述" name="description">
        <Input v-model:value="form.description" />
      </FormItem>
    </Form>
    <div class="ml-[80px] overflow-auto max-h-[200px]">
      <div v-if="loadingCommit" class="w-full h-[100px] flex justify-center">
        <Spin />
      </div>
      <pre v-else>{{ commit }}</pre>
    </div>
    <template #footer>
      <Popconfirm title="确定删除项目吗？" @confirm="deleteProject">
        <Button type="primary" danger>删除项目</Button>
      </Popconfirm>
      <Button @click="closeHandler">取消</Button>
      <Button type="primary" @click="confirm">构建</Button>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { useFileDialog } from '@vueuse/core'
import {
  Button,
  Drawer,
  Form,
  FormItem,
  Input,
  Modal,
  Popconfirm,
  Select,
  Spin,
  message,
} from 'ant-design-vue'
import axios from 'axios'
import { onUnmounted, ref } from 'vue'

import api from '@/api/api'
import FRadio from '@/components/FRadio.vue'
import useDialogHook, { rulesRequired } from '@/hooks/useDialogHook'

class ProjectForm {
  id: string
  branch: string
  env: string
  description: string
  command: string
  __commits: string = ''
  name: string = ''
  constructor(init?: any) {
    this.id = init?.id
    this.branch = init?.branch || 'master'
    this.env = init?.env || 'prod'
    this.description = init?.description || ''
    this.command = init?.command || 'npm run build'
    this.name = init?.name
  }
}
const { form, formRef, dialogVisible, loading, openDialog, closeHandler, confirmHook } =
  useDialogHook(ProjectForm)

const commandMap = {
  prod: 'npm run build',
  dev: 'npm run build:dev',
  test: 'npm run build:test',
}
const confirm = confirmHook(async () => {
  await axios.get(api.build, {
    params: form.value,
  })
  message.success('构建任务创建成功')
})

const branchList = ref<string[]>([])
const commit = ref('')
function loadBranchList() {
  axios
    .get(api.queryBranch, {
      params: {
        id: form.value.id,
      },
    })
    .then((res) => {
      branchList.value = res.data?.data || []
      if (branchList.value.includes('master')) {
        form.value.branch = 'master'
      } else {
        form.value.branch = branchList.value?.[0] || ''
      }
      if (form.value.branch) {
        loadCommitList()
      }
    })
}
const loadingCommit = ref(false)
function loadCommitList() {
  loadingCommit.value = true
  axios
    .get(api.commitHistory, {
      params: {
        id: form.value.id,
        branch: form.value.branch,
      },
    })
    .then((res) => {
      commit.value = res.data?.data || ''
    })
    .finally(() => {
      loadingCommit.value = false
    })
}
async function deleteProject() {
  try {
    await axios.delete(api.project, {
      params: {
        id: form.value.id,
      },
    })
    message.success('删除成功')
    closeHandler()
  } catch (error) {
    message.error('删除失败')
  }
}
defineExpose({
  openDialog(data: any) {
    const promise = openDialog(data)
    loadBranchList()
    return promise
    // loadCommitList()
  },
})
</script>
<style lang="less" scoped></style>
