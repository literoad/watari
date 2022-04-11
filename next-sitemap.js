/** @type {import('next-sitemap').IConfig} */

module.exports = {
  autoLastmod: false,
  siteUrl: "https://literoad.ru",
  generateRobotsTxt: true,
  changefreq: "weekly",
  exclude: ["/dashboard", "/monitors/*", "/auth/email-sent"],
};
