import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, headers },
}) => {
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

    payload.logger.info(`Revalidating page at path: ${path}`)

    if (headers['X-Payload-Migration'] !== 'true') {
      revalidatePath(path)
      revalidateTag('sitemap')
    }
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

    payload.logger.info(`Revalidating old page at path: ${oldPath}`)

    if (headers['X-Payload-Migration'] !== 'true') {
      revalidatePath(oldPath)
      revalidateTag('sitemap')
    }
  }

  return doc
}
