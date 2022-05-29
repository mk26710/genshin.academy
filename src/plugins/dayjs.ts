import dayjs from "dayjs";
import type { App } from "vue";

import { dayjsKey } from "@/plugins/symbols";

export default {
  install: (app: App) => {
    app.config.globalProperties.$dayjs = dayjs;
    app.provide(dayjsKey, dayjs);
  },
};
