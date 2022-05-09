import { createPinia } from "pinia";
import { createApp } from "vue";

import MainContainer from "@/components/base/MainContainer.vue";

import App from "@/App.vue";
import dayjs from "@/plugins/dayjs";
import router from "@/router";

import "./styles/main.scss";

createApp(App)
  .component("MainContainer", MainContainer)
  .use(createPinia())
  .use(router)
  .use(dayjs)
  .mount("#app");
