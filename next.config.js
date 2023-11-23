/** @type {import('next').NextConfig} */

const ttsServer = {
  avatarlib: "https://avatarlib-dev.apps-cae.danlu.netease.com",
};

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/tts/:path*",
        destination: `${ttsServer.avatarlib}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
