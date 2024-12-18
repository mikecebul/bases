import { User } from '@/payload-types'
import type { AccessArgs } from 'payload'

export const self = ({ req: { user }, id }: AccessArgs<User>) => {
  if (!user || !id) return false
  return String(id) === String(user.id)
}
