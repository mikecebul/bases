import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Team } from '@/payload-types'

export const revalidateTeam: CollectionAfterChangeHook<Team> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/team/${doc.slug}`

    payload.logger.info(`Revalidating team member at path: ${path}`)

    revalidatePath(path)
    revalidatePath('/team')
    revalidateTag('sitemap')
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/team/${previousDoc.slug}`

    payload.logger.info(`Revalidating old team member at path: ${oldPath}`)

    revalidatePath(oldPath)
    revalidatePath('/team')
    revalidateTag('sitemap')
  }
  return doc
}
