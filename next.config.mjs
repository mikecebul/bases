import { withSentryConfig } from '@sentry/nextjs/config'
import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const uploadSourcemaps = Boolean(process.env.SENTRY_AUTH_TOKEN)

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [`require-in-the-middle`],
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
  images: {
    // Payload's local image URLs include a version query for cache invalidation.
    localPatterns: [{ pathname: '/**' }],
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
  project: 'bases',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  sourcemaps: {
    disable: !uploadSourcemaps,
    deleteSourcemapsAfterUpload: true,
  },
  release: {
    name: process.env.SENTRY_RELEASE,
    create: uploadSourcemaps,
    finalize: uploadSourcemaps,
  },
  useRunAfterProductionCompileHook: true,
}

export default withSentryConfig(
  withPayload(nextConfig, { devBundleServerPackages: false }),
  sentryConfig,
)
