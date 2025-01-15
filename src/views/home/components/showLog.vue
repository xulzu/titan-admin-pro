<template>
  <div class="w-full p-2 rounded min-h-[300px] bg-[#252529]">
    <div class="w-full h-full" ref="terminalRef"></div>
  </div>
</template>

<script setup lang="ts">
import { FitAddon } from '@xterm/addon-fit'
import { Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  id?: string
}>()
const terminalRef = ref<HTMLDivElement | null>(null)
let terminal: Terminal | null = null
onMounted(() => {
  terminal = new Terminal({
    theme: {
      background: '#252529',
    },
  })

  terminal.open(terminalRef.value as HTMLElement)
  const fitAddon = new FitAddon()
  terminal.loadAddon(fitAddon)
  fitAddon.fit()
  sse()
})

function sse() {
  const eventSource = new EventSource('/api/sseLog?buildLogId=' + props.id)
  eventSource.onmessage = (event) => {
    terminal.write(event.data + '\r\n')
  }
  eventSource.onerror = (event) => {
    eventSource.close()
    console.error('连接错误:', event)
  }
  eventSource.addEventListener('close', () => {
    eventSource.close()
  })
}
</script>

<style></style>
