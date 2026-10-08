import type { Metadata } from 'next'

import type { Page, Team } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { baseUrl } from './baseUrl'
import { getMediaUrl } from './getMediaUrl'

export const generateMeta = async (args: { doc: Page | Team }): Promise<Metadata> => {
  const { doc } = args || {}

  const image = doc?.meta?.metadata?.image
  const populatedImage = image && typeof image === 'object' ? image : null
  const imageUrl = populatedImage?.sizes?.meta?.url || populatedImage?.url
  const ogImage = imageUrl
    ? new URL(getMediaUrl(imageUrl, populatedImage?.updatedAt), baseUrl).toString()
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
