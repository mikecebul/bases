import type { Metadata } from 'next'

import type { Page, Team } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { baseUrl } from './baseUrl'

export const generateMeta = async (args: { doc: Page | Team }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.metadata?.image === 'object' &&
      !!doc.meta.metadata.image &&
      'url' in doc.meta.metadata.image
      ? process.env.S3_ENABLED === 'true'
        ? doc.meta.metadata.image.url
        : `${baseUrl}${doc.meta.metadata.image.url}`
      : `${baseUrl}/flowers-sign-meta.webp`

  const title = doc?.meta?.metadata?.title ? doc.meta.metadata.title + ' | BASES' : 'BASES'

  return {
    description: doc?.meta?.metadata?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.metadata?.description || '',
      images: ogImage
        ? [
          {
            url: ogImage,
          },
        ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
