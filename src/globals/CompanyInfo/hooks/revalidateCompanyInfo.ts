import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateCompanyInfo: GlobalAfterChangeHook = ({ doc, req: { payload, headers } }) => {
  payload.logger.info(`Revalidating company info`)

  if (headers['X-Payload-Migration'] !== 'true') {
    revalidatePath('/(frontend)', 'layout')
  }

  return doc
}
