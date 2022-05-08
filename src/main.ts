import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import "@/index.css";
import MainContainer from "@/components/base/MainContainer.vue";
import dayjs from "@/plugins/dayjs";

createApp(App)
  .component("MainContainer", MainContainer)
  .use(createPinia())
  .use(router)
  .use(dayjs)
  .mount("#app");
