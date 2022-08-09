/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

/**
 * @type {import('next-i18next').UserConfig}
 **/
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru"],
  },
  fallbackLng: "en",
  localePath: path.resolve("./locales"),
};
