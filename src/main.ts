import { createPinia } from "pinia";
import { createApp } from "vue";

import MainContainer from "@/components/MainContainer.vue";

import App from "@/App.vue";
import dayjs from "@/plugins/dayjs";
// import i18n from "@/plugins/i18n";
import router from "@/router";

import "./styles/main.scss";

const app = createApp(App);

app.component("MainContainer", MainContainer);

app.use(createPinia());
app.use(router);
app.use(dayjs);
// .use(i18n)

app.mount("#app");
