import i18nConfig from "./next-i18next.config.js";

/**
 * This was taken from create.t3.gg template :)
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  i18n: i18nConfig.i18n,
});
