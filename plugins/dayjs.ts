import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import deLocale from "dayjs/locale/de";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ruLocale from "dayjs/locale/ru";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jaLocale from "dayjs/locale/ja";

export default defineNuxtPlugin(() => {
  dayjs.locale(navigator.language);
  dayjs.extend(localizedFormat);

  return {
    provide: {
      dayjs: dayjs,
    },
  };
});
