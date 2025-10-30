import type { Service } from '@/payload-types'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { CollectionAfterDeleteHook } from 'payload'

export const revalidateDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    // Revalidate root layout to future-proof and update any page using Services
    revalidatePath('/', 'layout')

    // Revalidate homepage
    revalidatePath('/')

    // Revalidate services page
    revalidatePath('/services')

    revalidateTag('sitemap')
  }

  return doc
}
