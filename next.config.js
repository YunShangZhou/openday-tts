const path = require("path");

const ttsServer = {
  avatarlib: "https://avatarlib-dev.apps-cae.danlu.netease.com",
};

const testServer = {
  test1: "http://jsonplaceholder.typicode.com/posts",
};

const nextConfig = {
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
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
