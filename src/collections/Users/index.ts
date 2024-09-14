import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { roleSelectMutate } from './access/roleSelectMutate'
import { ensureFirstUserIsSuperAdmin } from './hooks/ensureFirstUserIsSuperAdmin'
import { revalidatePath } from 'next/cache'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    hideAPIURL: true,
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'text',
      defaultValue: 'editor',
      required: true,
      access: {
        create: roleSelectMutate,
        read: () => true,
        update: roleSelectMutate,
      },
      admin: {
        components: {
          Field: '@/collections/Users/RoleSelect',
          Cell: '@/collections/Users/RoleCell',
        },
      },
      hooks: {
        beforeChange: [ensureFirstUserIsSuperAdmin],
        afterChange: [() => revalidatePath('/(payload)', 'layout')],
      },
    },
  ],
  timestamps: true,
}

export default Users
