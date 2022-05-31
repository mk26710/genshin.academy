/* eslint-env node */

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
  "dove-gray": {
    DEFAULT: "#6E6E6E",
    50: "#D1D1D1",
    100: "#C0C0C0",
    200: "#ABABAB",
    300: "#979797",
    400: "#828282",
    500: "#6E6E6E",
    600: "#525252",
    700: "#363636",
    800: "#1C1C1C",
    900: "#000000",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    150: "#ededed",

    200: "#e5e5e5",
    250: "#dddddd",

    300: "#d4d4d4",
    350: "#bcbcbc",

    400: "#a3a3a3",
    450: "#8b8b8b",

    500: "#737373",
    550: "#636363",

    600: "#525252",
    650: "#494949",

    700: "#404040",
    750: "#333333",

    800: "#262626",
    850: "#1f1f1f",

    900: "#171717",
    950: "#121212",

    1000: "#0d0d0d",
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
        primary: { ...myColors["medium-purple"] },
        dark: { ...myColors["neutral"] },
      },
      screens: {
        ...myScreens,
      },
    },
  },
  plugins: [],
};
