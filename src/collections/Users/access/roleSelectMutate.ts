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

  // Ensure user is of type User
  if ('role' in user) {
    // Super Admins can do anything
    if (user.role === 'superAdmin') return true
    // Admins can update roles except to superAdmin
    if (user.role === 'admin') {
      if (data?.role !== 'superAdmin') return true
    }
    // Editors cannot change roles at all
    if (user.role === 'editor') return false
  }
  return false
}