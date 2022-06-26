/* eslint-env node */
require(`@rushstack/eslint-patch/modern-module-resolution`);

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: `module`,
    parser: `@typescript-eslint/parser`,
  },
  extends: [
    `plugin:@typescript-eslint/recommended`,
    `plugin:nuxt/recommended`,
    `plugin:vue/vue3-recommended`,
    `plugin:prettier/recommended`,
  ],
  plugins: [`@typescript-eslint`],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {
    "vue/multi-word-component-names": `off`,
    "@typescript-eslint/no-unused-vars": [`warn`],
    quotes: [`warn`, `backtick`],
  },
};
