import { Page } from '@/payload-types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CollectionAfterDeleteHook } from 'payload'

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/team/${doc?.slug}`
    revalidatePath(path)
    revalidatePath('/team')
    revalidateTag('sitemap')
  }

  return doc
}
