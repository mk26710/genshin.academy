import { App } from "vue";
import dayjs from "dayjs";

export default {
  install: (app: App) => {
    app.config.globalProperties.$dayjs = dayjs;
  },
};
