import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import type { App } from "vue";

import { dayjsKey } from "@/plugins/symbols";

export default {
  install: (app: App) => {
    dayjs.extend(localizedFormat);

    app.config.globalProperties.$dayjs = dayjs;
    app.provide(dayjsKey, dayjs);
  },
};
