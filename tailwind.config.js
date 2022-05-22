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
      screens: {
        xmd: "896px",
      },
    },
  },
  plugins: [],
};
