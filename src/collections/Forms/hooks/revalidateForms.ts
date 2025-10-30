import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Form } from '@/payload-types'

export const revalidateForms: CollectionAfterChangeHook<Form> = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating forms data`)

  // Revalidate root layout to update all pages using this form
  revalidatePath('/', 'layout')

  revalidateTag('sitemap')

  return doc
}
