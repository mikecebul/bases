import type { Access, AccessArgs, User } from 'payload'
import { checkRole } from './checkRole'

type IsSuperAdmin = (args: AccessArgs<User>) => boolean

export const superAdmin: IsSuperAdmin = ({ req: { user } }) => {
  if (!user) return false
  return checkRole('superAdmin', user)
}
