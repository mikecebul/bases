import type { User } from '@/payload-types'

export const checkRole = (role: string, user: User | null): boolean => {
  if (!user) return false
  return user.role === role
}
