/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://genshin.zenless.club",
  generateRobotsTxt: true, // (optional)
  exclude: ["/settings"],
};

module.exports = config;
