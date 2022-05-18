/* eslint-env node */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.pink,
      },
    },
  },
  plugins: [],
};
