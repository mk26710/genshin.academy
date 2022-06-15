import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "@/App.vue";

import dayjs from "@/plugins/dayjs";
import nprogress from "@/plugins/nprogress";
import router from "@/router";

import "@/assets/styles/main.scss";
import "@/assets/styles/markdown.scss";
import "@/assets/styles/calculator.scss";
import "@/assets/styles/cards.scss";
import "@/assets/styles/nprogress.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(dayjs);
app.use(nprogress);

app.mount("#app");
