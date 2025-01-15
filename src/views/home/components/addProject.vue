<template>
  <Modal
    v-model:open="dialogVisible"
    title="添加项目"
    width="500px"
    @ok="confirm"
    @cancel="closeHandler"
  >
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
      <FormItem label="项目名称" name="projectName" :rules="rulesRequired">
        <Input v-model:value="form.projectName" />
      </FormItem>
      <FormItem label="git地址" name="gitUrl" :rules="rulesRequired">
        <Input v-model:value="form.gitUrl" />
      </FormItem>
      <FormItem label="初始化" name="bootstrap">
        <Input placeholder="默认是 npm install " v-model:value="form.bootstrap" />
      </FormItem>
      <FormItem label="项目图片" name="projectImg">
        <Button type="primary" @click="selectImg">选择图片</Button>
        <div class="mt-2">
          <img
            class="max-w-[100px] max-h-[100px]"
            v-if="form.projectImgUrl"
            :src="form.projectImgUrl"
            alt=""
          />
        </div>
      </FormItem>
    </Form>
  </Modal>
</template>
<script lang="ts" setup>
import { useFileDialog } from '@vueuse/core'
import { Button, Drawer, Form, FormItem, Input, Modal, message } from 'ant-design-vue'
import axios from 'axios'
import { onUnmounted, ref } from 'vue'

import api from '@/api/api'
import useDialogHook, { rulesRequired } from '@/hooks/useDialogHook'

const { open, files, onChange } = useFileDialog({
  accept: 'image/*',
  multiple: false,
})

class ProjectForm {
  projectName = ''
  gitUrl = ''
  projectImg: File | null = null
  projectImgUrl = ''
  bootstrap = ''
}
const { form, formRef, dialogVisible, loading, openDialog, closeHandler, confirmHook } =
  useDialogHook(ProjectForm)
const confirm = confirmHook(async () => {
  const formData = new FormData()
  formData.append('projectName', form.value.projectName)
  formData.append('gitUrl', form.value.gitUrl)
  formData.append('bootstrap', form.value.bootstrap)
  if (files.value.length) {
    formData.append('projectImg', files.value[0])
  }
  await axios.post(api.project, formData)
  message.success('添加成功')
})

onChange((files) => {
  if (files?.length) {
    buildImageUrl(files[0])
  }
})
function selectImg() {
  open()
}
function buildImageUrl(file: File) {
  if (file) {
    if (form.value.projectImgUrl) {
      URL.revokeObjectURL(form.value.projectImgUrl)
    }
    const url = URL.createObjectURL(file)
    form.value.projectImgUrl = url
  }
}
// 组件卸载时清理 URL
onUnmounted(() => {
  if (form.value.projectImgUrl) {
    URL.revokeObjectURL(form.value.projectImgUrl)
  }
})
defineExpose({
  openDialog,
})
</script>
<style lang="less" scoped></style>
