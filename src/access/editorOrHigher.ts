import type { AccessArgs } from 'payload'
import { checkRole } from './checkRole'
import { User } from '@/payload-types'

export const editorOrHigher = ({ req: { user } }: AccessArgs<User>) => {
  if (!user) return false

  return checkRole(['editor', 'admin', 'superAdmin'], user)
}