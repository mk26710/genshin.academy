import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/color-mode", "@vueuse/nuxt"],
  colorMode: {
    classSuffix: "",
    storageKey: "theme",
  },
  css: ["@/assets/styles/main.scss"],
  // ssr: false,
  // target: "static",
});
