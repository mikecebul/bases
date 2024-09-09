import type { FieldHook } from 'payload'

import { encrypt } from '@/utilities/encrypt'

export const encryptField: FieldHook = ({ value }) => {
  if (typeof value === 'string') {
    return encrypt(value as string)
  }

  return undefined
}
