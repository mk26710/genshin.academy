import { createI18n } from "vue-i18n";

import genericDE from "@/assets/lang/de/generic.json";
import genericEN from "@/assets/lang/en/generic.json";
import genericRU from "@/assets/lang/ru/generic.json";

const messages = {
  en: {
    generic: genericEN,
  },
  ru: {
    generic: genericRU,
  },
  de: {
    generic: genericDE,
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
