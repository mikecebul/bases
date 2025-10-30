import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '@/payload-types'

export const revalidateServices: CollectionAfterChangeHook<Service> = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating services data`)

  // Revalidate root layout to future-proof and update any page using Services
  revalidatePath('/', 'layout')

  // Revalidate homepage
  revalidatePath('/')

  // Revalidate services page
  revalidatePath('/services')

  revalidateTag('sitemap')

  return doc
}
