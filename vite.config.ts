import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    vueI18n({ include: path.resolve(__dirname, "./src/lang/**") }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
