const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    dynamicStartUrlRedirect: "/auth/sign-up",
  },
});

module.exports = nextConfig;
