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
  "medium-purple": {
    DEFAULT: "#9C4BE7",
    50: "#F5EDFD",
    100: "#EBDBFA",
    200: "#D7B7F5",
    300: "#C493F1",
    400: "#B06FEC",
    500: "#9C4BE7",
    600: "#811DDD",
    700: "#6417AB",
    800: "#47107A",
    900: "#2A0A48",
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
        primary: myColors["medium-purple"],
      },
      screens: {
        ...myScreens,
      },
    },
  },
  plugins: [],
};
