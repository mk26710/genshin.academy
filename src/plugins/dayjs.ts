import type { App } from "vue";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { dayjsKey } from "@/plugins/symbols";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import deLocale from "dayjs/locale/de";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ruLocale from "dayjs/locale/ru";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jaLocale from "dayjs/locale/ja";

export default {
  install: (app: App) => {
    dayjs.locale(navigator.language);
    dayjs.extend(localizedFormat);

    app.config.globalProperties.$dayjs = dayjs;
    app.provide(dayjsKey, dayjs);
  },
};
