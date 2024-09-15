import type { Metadata } from 'next'

import type { Page, Team } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: { doc: Page | Team }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.metadata?.image === 'object' &&
    doc.meta.metadata.image !== null &&
    'url' in doc.meta.metadata.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.metadata.image.url}`

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
