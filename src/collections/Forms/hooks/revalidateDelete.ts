import type { Form } from '@/payload-types'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { CollectionAfterDeleteHook } from 'payload'

export const revalidateDelete: CollectionAfterDeleteHook<Form> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    // Revalidate root layout to update all pages using this form
    revalidatePath('/', 'layout')

    revalidateTag('sitemap')
  }

  return doc
}
