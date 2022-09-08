/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require("./next-i18next.config");

/**
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

module.exports = defineNextConfig({
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  i18n: i18n,
});
