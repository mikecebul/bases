import type { Team } from '@/payload-types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CollectionAfterDeleteHook } from 'payload'

export const revalidateDelete: CollectionAfterDeleteHook<Team> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/team/${doc?.slug}`
    revalidatePath(path)
    revalidatePath('/team')
    revalidatePath('/(frontend)', 'layout')
    revalidateTag('sitemap', { expire: 0 })
  }

  return doc
}
