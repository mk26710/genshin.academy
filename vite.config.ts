import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [vue(), eslintPlugin(), vueI18n()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
