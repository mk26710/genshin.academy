/* eslint-disable @typescript-eslint/no-var-requires */
const nextTranslate = require("next-translate");

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextTranslate(nextConfig);
