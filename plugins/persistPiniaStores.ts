import { createNuxtPersistedState } from "pinia-plugin-persistedstate";
import { Pinia } from "pinia";
import { defineNuxtPlugin, useCookie } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia: Pinia = nuxtApp.$pinia;

  if (!pinia) {
    console.log("pinia is not existing on nuxtApp!");
    return;
  }

  pinia.use(createNuxtPersistedState(useCookie));
  console.log("Persisted Pinia store plugin has been applied");
});
