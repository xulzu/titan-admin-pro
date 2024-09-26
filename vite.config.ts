import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') + '/',
    },
  },

  server: {
    port: 2000,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '^/api/ws': {
        target: 'ws://172.31.61.168:9999',
        ws: true,
      },
      '^/api': {
        target: 'http://172.31.61.168:9999',
        // target: 'https://siem.eastmoney.com',
        changeOrigin: true,
      },
    },
  },
})
