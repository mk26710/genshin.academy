import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  base: "/trying-vue/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
