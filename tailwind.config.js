/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const myColors = {
  azure: {
    100: "#a5f6ff",
    200: "#88ddff",
    300: "#69c4ff",
    400: "#45acff",
    500: "#0694fa",
    600: "#007de0",
    700: "#0067c6",
    800: "#0052ad",
    900: "#003e95",
  },
  info: {
    100: "#b5ffff",
    200: "#98ffff",
    300: "#7affff",
    400: "#5ae8ff",
    500: "#32cefe",
    600: "#00b5e4",
    700: "#009dcb",
    800: "#0085b2",
    900: "#006e9a",
  },
  warning: {
    100: "#ffffbe",
    200: "#ffffa5",
    300: "#ffff8c",
    400: "#ffe674",
    500: "#e9cd5c",
    600: "#cfb444",
    700: "#b49c2b",
    800: "#9a850c",
    900: "#816e00",
  },
  success: {
    100: "#bfffd5",
    200: "#a4ffbb",
    300: "#89ffa2",
    400: "#6df68a",
    500: "#51dc72",
    600: "#2fc25b",
    700: "#00a945",
    800: "#00902e",
    900: "#007816",
  },
  danger: {
    100: "#ffb9c5",
    200: "#ff9fad",
    300: "#ff8595",
    400: "#ff6c7e",
    500: "#ec5267",
    600: "#d03752",
    700: "#b4163d",
    800: "#98002a",
    900: "#7d0018",
  },
  black: {
    50: "#ADADAD",
    100: "#A3A3A3",
    150: "#999999",
    200: "#8F8F8F",
    250: "#858585",
    300: "#7A7A7A",
    350: "#707070",
    400: "#666666",
    450: "#5c5c5c",
    500: "#525252",
    550: "#474747",
    600: "#3D3D3D",
    650: "#333333",
    700: "#292929",
    750: "#1f1f1f",
    800: "#141414",
    850: "#0a0a0a",
    900: "#000000",
  },
  neutral: {
    ...colors.neutral,
    950: "#0c0c0c",
  },
};

const myScreens = {
  xmd: "896px",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      colors: {
        ...defaultTheme.colors,
        primary: colors.blue,
        dark: myColors.neutral,
      },
      screens: {
        ...myScreens,
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    plugin(({ addVariant, addUtilities }) => {
      // Add a `active` variant, ie. `active:pb-0`
      addVariant("active", "&[data-active=true]");
      addUtilities({
        ".hyphens-auto": {
          "-webkit-hyphens": "auto",
          "-ms-hyphens": "auto",
          hyphens: "auto",
        },
      });
    }),
  ],
};
