/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require("./next-i18next.config");

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  i18n,
};

module.exports = nextConfig;
