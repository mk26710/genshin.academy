/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const defaultColors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const myColors = {
  perfume: {
    DEFAULT: "#c8a5fa",
    50: "#f9f5ff",
    100: "#f1e9fe",
    200: "#e6d7fd",
    300: "#c8a5fa",
    400: "#b889f7",
    500: "#9d5cf0",
    600: "#863ae3",
    700: "#7229c7",
    800: "#6126a3",
    900: "#502083",
  },
};

const myScreens = {
  xs: "400px",
  xmd: "896px",
  desktop: "1000px",
};

/** Dark colors of Mantine - https://mantine.dev/guides/dark-theme/ */
const mantineDark = {
  50: "#C1C2C5",
  100: "#A6A7AB",
  200: "#909296",
  300: "#5C5F66",
  400: "#373A40",
  500: "#2C2E33",
  600: "#25262B",
  700: "#1A1B1E",
  800: "#141517",
  900: "#101113",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/root.tsx",
    "./app/routes/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: ["class", '[data-colour="dark"]'],
  darkMode: ["class"],
  theme: {
    extend: {
      height: {
        navbar: "var(--header-height)",
        "navbar-container": "var(--navbar-container-height)",
        "screen-available": "calc(100vh - var(--header-height))",
      },
      minHeight: {
        navbar: "var(--header-height)",
        "navbar-container": "var(--navbar-container-height)",
        "screen-available": "calc(100vh - var(--header-height))",
      },
      maxHeight: {
        navbar: "var(--header-height)",
        "navbar-container": "var(--navbar-container-height)",
        "screen-available": "calc(100vh - var(--header-height))",
      },
      width: {
        content: "var(--max-content-width)",
      },
      maxWidth: {
        content: "var(--max-content-width)",
      },
      borderRadius: {
        box: "0.375rem",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // ...openColor,
        // blau: myColors.blau,
        ...myColors,
        dark: mantineDark,
        gray: defaultColors.neutral,
        primary: myColors.perfume,
      },
      screens: {
        ...myScreens,
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("daisyui"),
    plugin(({ addVariant, addUtilities }) => {
      // Add a `active` variant, ie. `active:pb-0`
      addVariant("data-active", "&[data-active=true]");
      addUtilities({
        ".hyphens-auto": {
          "-webkit-hyphens": "auto",
          "-ms-hyphens": "auto",
          hyphens: "auto",
        },
        ".overflow-overlay": {
          overflow: "overlay",
        },
      });
    }),
  ],
  daisyui: {
    prefix: "daisy-",
    themes: [
      {
        academy: {
          "color-scheme": "dark",
          primary: "#C8A5FA",
          secondary: "#8161AD",
          accent: "#F7B1FA",
          neutral: "#1d1d1d",
          "neutral-focus": "#242424",
          "base-100": "#212121",
          "base-200": "#1d1d1d",
          "base-300": "#121212",
          info: "#2563EB",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#dc2626",
        },
      },
    ],
  },
};
