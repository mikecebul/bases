import type { FieldAccess } from 'payload'

export const roleSelectMutate: FieldAccess = async ({ req, data }) => {
  const { payload, user } = req

  const users = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 0,
  })

  // first user
  if (users.totalDocs === 0) return true

  // not logged in
  if (!user) return false

  // Admins can't create Super Admins
  if (user.role === 'superAdmin') return true
  if (user.role === 'admin') {
    if (data?.role !== 'superAdmin') return true
  }
  return false
}
