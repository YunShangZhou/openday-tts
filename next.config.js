/* @type {import('next').NextConfig} */

const ttsServer = {
  avatarlib: "https://avatarlib-dev.apps-cae.danlu.netease.com",
};

const testServer = {
  test1: "http://jsonplaceholder.typicode.com/posts",
};

const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/tts/:path*",
        destination: `${ttsServer.avatarlib}/:path*`,
      },
      {
        source: "/test1/:path*",
        destination: `${testServer.test1}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
