import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key as InjectionKey } from "./store";

createApp(App)
    .use(store, InjectionKey)
    .use(router)
    .mount("#app");