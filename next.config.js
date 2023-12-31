/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/wp/:path*",
        destination: "/",
        permanent: true,
      },
      {
        // Redirect for 'rdfk' with an extension
        source: '/rdfk:extension(\\.[^.]+)',
        destination: '/RDFK',
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;
