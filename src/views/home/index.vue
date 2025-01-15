<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-1/2 flex justify-center items-center mt-6 flex-col">
      <img height="180" :src="vite" alt="" />
      <div class="mt-2 text-[60px] font-bold text-[#2c3e50]">
        <h1>BLOCK</h1>
      </div>
      <p class="text-gray-700 mt-4 text-[25px]">新一代前端静态资源维护工具</p>
      <Divider></Divider>

      <div class="w-full grid grid-cols-3 gap-8">
        <Card @click="addProject" hoverable>
          <template #cover>
            <div class="flex justify-center w-full" style="display: flex">
              <img alt="example" class="w-[240px] h-[140px]" :src="createImg" />
            </div>
          </template>
          <Card.Meta description="点击这里添加一个新项目吧">
            <template #title>
              <span class="text-blue-600">添加新项目</span>
            </template>
          </Card.Meta>
        </Card>
        <Card
          @click="build(item)"
          class="w-full"
          hoverable
          v-for="(item, index) in projectList"
          :key="index"
        >
          <template #cover>
            <img alt="example" height="140" class="w-full" :src="imgUrl(item.imageUrl)" />
          </template>
          <Card.Meta :title="item.name">
            <template #description>
              <div class="w-full truncate">{{ item.gitUrl }}</div>
            </template>
          </Card.Meta>
        </Card>
      </div>
    </div>

    <div class="w-2/3">
      <Divider></Divider>
      <Card class="mb-2">
        <div class="space-x-2">
          <FLabelWrapper class="w-[200px]" label="构建项目">
            <Select
              class="w-full"
              v-model:value="projectId"
              :options="
                projectList?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              "
            />
          </FLabelWrapper>
          <FRadio
            class="w-[200px]"
            label="构建环境"
            align="center"
            v-model:value="env"
            :options="['prod', 'test', 'dev'].map((item) => ({ label: item, value: item })) || []"
          />
          <Button type="primary" @click="queryLogList()">查询</Button>
        </div>
      </Card>

      <Table
        :columns="columns"
        :data-source="logList"
        :expand-column-width="60"
        rowKey="id"
        :expandedRowKeys="expandedRowKeys"
        @expandedRowsChange="expandedRowsChange"
        :pagination="{
          total: total,

          onChange: queryLogList,
          current: page,
          pageSize: pageSize,
        }"
      >
        <template #expandColumnTitle>
          <span style="color: red">日志</span>
        </template>
        <template #expandedRowRender="{ record }">
          <ShowLog
            v-if="expandedRowKeys.includes(record.id)"
            :key="record.id"
            :id="record.id"
          ></ShowLog>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'"> </template>
          <template v-if="column.key === 'progress'">
            <Progress
              size="small"
              v-if="record.status !== 'success:构建和打包' && record.progress === 100"
              status="exception"
              :percent="100"
            ></Progress>
            <Progress v-else size="small" :percent="record.progress"></Progress>
          </template>
          <template v-if="column.key === 'action'">
            <Button
              v-if="record.progress !== 100"
              type="text"
              class="text-red-600"
              @click="stop(record as any)"
              >停止</Button
            >
            <Button
              v-if="record.dist"
              type="text"
              class="text-blue-600"
              @click="download(record as any)"
              >下载</Button
            >
          </template>
        </template>
      </Table>
    </div>

    <AddProject ref="addProjectDialogRef" />
    <Build ref="buildDialogRef" />
  </div>
</template>

<script setup lang="ts">
import {
  Button,
  Card,
  CardGrid,
  Divider,
  Progress,
  Select,
  Table,
  Tag,
  message,
} from 'ant-design-vue'
import { Item } from 'ant-design-vue/es/menu'
import { type ColumnsType } from 'ant-design-vue/es/table'
import axios from 'axios'
import dayjs from 'dayjs'
import { ref, useTemplateRef } from 'vue'

import api from '@/api/api'
import zq from '@/assets/1736303304502.png'
import createImg from '@/assets/create.png'
import vite from '@/assets/vite.svg'
import FLabelWrapper from '@/components/FLabelWrapper.vue'
import Icon from '@/components/Icon/Icon.vue'

import AddProject from './components/addProject.vue'
import Build from './components/build.vue'
import ShowLog from './components/showLog.vue'

export interface Project {
  id: string
  name: string
  gitUrl: string
  imageUrl: any
  createdAt: string
  updatedAt: string
}
export interface Log {
  id: string
  progress: number
  status: string
  dist: string
  projectId: string
  branch: string
  env: string
  releaseType: string
  description: string
  version: string
  createdAt: string
  updatedAt: string
  project: Partial<Project>
}

const addProjectDialogRef = useTemplateRef('addProjectDialogRef')
const buildDialogRef = useTemplateRef('buildDialogRef')
const projectList = ref<Project[]>([])
const projectId = ref('')
const env = ref('')
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const logList = ref<any[]>([])
const columns: ColumnsType<Log> = [
  // { title: '日志', key: 'status', width: 100 },

  {
    title: '项目',
    dataIndex: 'project.name',
    key: 'name',
    width: 200,
    ellipsis: true,
    customRender({ record }) {
      return record.project?.name
    },
  },
  { title: '分支', dataIndex: 'branch', key: 'branch', width: 80 },
  { title: '环境', dataIndex: 'env', key: 'env', width: 80 },
  { title: '版本', dataIndex: 'version', key: 'version', width: 120 },
  { title: '进度', key: 'progress', width: 160 },
  { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180,
    customRender({ record }) {
      return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  { title: '操作', key: 'action', width: 160, align: 'center' },
]
function addProject() {
  addProjectDialogRef.value?.openDialog().then(() => {
    queryProjectList()
  })
}
function build(record: Project) {
  buildDialogRef.value
    ?.openDialog({
      id: record.id,
      name: record.name,
    })
    .finally(() => {
      queryProjectList()
      queryLogList()
    })
}
queryProjectList()
queryLogList()
async function queryProjectList() {
  try {
    const { data } = await axios.get(api.projects)
    projectList.value = data?.data || []
  } catch (error) {
    console.log(error)
  }
}

function imgUrl(url: string) {
  return url ? api.imgView + url : zq
}

async function queryLogList(page_: number = page.value, pageSize_: number = pageSize.value) {
  try {
    const { data } = await axios.get(api.logList, {
      params: {
        page: page_,
        pageSize: pageSize_,
        projectId: projectId.value,
        env: env.value,
      },
    })
    logList.value = data?.data?.list || []
    total.value = data?.data?.total || 0
    page.value = page_
    pageSize.value = pageSize_
  } catch (error) {
    console.log(error)
    message.error('查询日志失败')
  }
}
const expandedRowKeys = ref<any[]>([])
function expandedRowsChange(expandedRows: any) {
  expandedRowKeys.value = [expandedRows.at(-1)]
}
function download(record: Log) {
  // console.log(record)
  window.open(api.download + record.dist, '_blank')
}

async function stop(params: Log) {
  try {
    await axios.get(api.kill, { params: { buildLogId: params.id } })
    queryLogList()
    message.success('任务已停止')
  } catch (error) {
    message.error(error + '')
  }
}
</script>

<style></style>
