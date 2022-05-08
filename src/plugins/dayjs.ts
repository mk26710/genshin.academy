import { App, InjectionKey, readonly } from "vue";
import dayjs from "dayjs";

export const dayjsKey: InjectionKey<typeof dayjs> = Symbol("dayjs");

export default {
  install: (app: App) => {
    app.config.globalProperties.$dayjs = dayjs;
    // readonly here could cause some unexpected behaviour, so gotta keep that in mind
    app.provide(dayjsKey, readonly(dayjs));
  },
};
