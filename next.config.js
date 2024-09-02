import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return (
          {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'maps.googleapis.com',
          },
          {
            protocol: 'https',
            hostname: 'bases.mikecebul.dev',
          }
        )
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
  async redirects() {
    return [
      {
        source: '/wp/:path*',
        destination: '/',
        permanent: true,
      },
      {
        // Redirect for 'rdfk' with an extension
        source: '/rdfk:extension(\\.[^.]+)',
        destination: '/rdfk',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/RDFK',
        destination: '/rdfk',
      },
    ]
  },
}

export default withPayload(nextConfig)
