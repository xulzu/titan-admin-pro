import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [IconsResolver()],
    }),
    Icons({
      scale: 1,
      defaultStyle: 'vertical-align: -0.125em;',
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') + '/',
    },
  },

  server: {
    port: 8000,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '^/api/ws': {
        target: 'ws://172.31.61.168:9999',
        ws: true,
      },
      '^/api': {
        target: 'http://172.31.61.130:8000',
        // target: 'https://siem.eastmoney.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
