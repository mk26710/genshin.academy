import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Pinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia: Pinia = nuxtApp.$pinia;

  if (!pinia) {
    console.log("pinia is not existing on nuxtApp!");
    return;
  }

  pinia.use(piniaPluginPersistedstate);
  console.log("Persisted Pinia store plugin has been applied");
});
