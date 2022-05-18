import dayjs from "dayjs";
import type { App, InjectionKey } from "vue";

export const dayjsKey: InjectionKey<typeof dayjs> = Symbol("dayjs");

export default {
  install: (app: App) => {
    app.config.globalProperties.$dayjs = dayjs;
    app.provide(dayjsKey, dayjs);
  },
};
