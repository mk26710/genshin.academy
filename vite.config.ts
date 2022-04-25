import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // uncomment before deploying to gh pages
  // base: "/trying-vue/",
  plugins: [vue()]
})
