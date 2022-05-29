import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "@/App.vue";

import dayjs from "@/plugins/dayjs";
import router from "@/router";

import "./assets/styles/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(dayjs);

app.mount("#app");
