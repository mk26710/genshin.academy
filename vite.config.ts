import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  base: "/trying-vue/",
  assetsInclude: ["./src/data/**/*.json"],
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
