/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        pathname: "/img/component-images/*",
      },
    ],
  },
};

module.exports = nextConfig;
