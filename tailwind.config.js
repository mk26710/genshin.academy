/* eslint-env node */
// const colors = require("tailwindcss/colors");

// https://www.tailwindshades.com/

const myColors = {
  "purple-heart": {
    DEFAULT: "#8A2BE2",
    50: "#E3CDF8",
    100: "#D9BBF6",
    200: "#C597F1",
    300: "#B273EC",
    400: "#9E4FE7",
    500: "#8A2BE2",
    600: "#6E1ABB",
    700: "#51138A",
    800: "#340C59",
    900: "#170527",
  },
};

const myScreens = {
  xmd: "896px",
};

module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...myColors,
        primary: myColors["purple-heart"],
      },
      screens: {
        ...myScreens,
      },
    },
  },
  plugins: [],
};
