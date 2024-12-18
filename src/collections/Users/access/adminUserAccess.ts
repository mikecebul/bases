import type { Access } from 'payload'
import { checkRole } from '@/access/checkRole'

// Specific access control for the Users collection
export const adminUserAccess: Access = ({ req: { user }, data }) => {
  if (!user) return false
  if (!checkRole('admin', user)) return false

  // Admins can only manage non-superAdmin users
  const roleCheck = {
    role: {
      not_equals: 'superAdmin',
    },
  }

  // If creating or updating, ensure the new data isn't trying to set role to superAdmin
  if (data?.role) {
    return {
      and: [
        roleCheck,
        {
          role: {
            in: ['admin', 'editor'],
          },
        },
      ],
    }
  }

  return roleCheck
}