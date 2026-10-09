import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { Media } from '@/payload-types'

// Media can be embedded in any page, team profile, or cached global.
export const revalidateMedia: CollectionAfterChangeHook<Media> &
  CollectionAfterDeleteHook<Media> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('media', { expire: 0 })
    revalidatePath('/(frontend)', 'layout')
  }
  return doc
}
