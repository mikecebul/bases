import type { AccessArgs } from 'payload'
import { User } from '@/payload-types'

export const authenticatedOrPublished = ({ req: { user } }: AccessArgs<User>) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}