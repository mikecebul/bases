import { withSentryConfig } from '@sentry/nextjs'
import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [`require-in-the-middle`],
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
  images: {
    remotePatterns: [
      ...[
        baseUrl,
        'https://images.unsplash.com',
        'https://maps.googleapis.com',
        'https://basesmi.org',
        'https://www.basesmi.org',
        'https://media-bases.mikecebul.com',
      ].map((item) => {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
  async rewrites() {
    return [
      {
        source: '/RDFK',
        destination: '/rdfk',
      },
    ]
  },
}

// Sentry Configuration
const sentryConfig = {
  org: 'mikecebul',
  project: 'cvx-jr-golf',
  sentryUrl: 'https://monitor.mikecebul.dev/',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
}

export default withSentryConfig(
  withPayload(nextConfig, { devBundleServerPackages: false }),
  sentryConfig,
)
