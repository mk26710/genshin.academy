module.exports = {
  locales: ["en", "ru"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "footer", "meta", "404"],
    "/": ["home"],
    "/calc": ["calc"],
    "/settings": ["settings"],
  },
};
