import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Team } from '@/payload-types'

export const revalidateTeam: CollectionAfterChangeHook<Team> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published') {
    const path = `/team/${doc.slug}`

    payload.logger.info(`Revalidating team member at path: ${path}`)

    revalidatePath(path)
    revalidatePath('/team')
    revalidatePath('/(frontend)', 'layout')
    revalidateTag('sitemap', { expire: 0 })
  }

  // If the post was previously published, we need to revalidate the old path
  if (
    previousDoc?._status === 'published' &&
    (doc._status !== 'published' || previousDoc.slug !== doc.slug)
  ) {
    const oldPath = `/team/${previousDoc.slug}`

    payload.logger.info(`Revalidating old team member at path: ${oldPath}`)

    revalidatePath(oldPath)
    revalidatePath('/team')
    revalidatePath('/(frontend)', 'layout')
    revalidateTag('sitemap', { expire: 0 })
  }
  return doc
}
