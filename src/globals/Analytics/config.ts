import { authenticated } from '@/access/authenticated'
import { GlobalConfig } from 'payload'

export const Analytics: GlobalConfig = {
  slug: 'analytics',
  label: 'View Analytics',
  admin: {
    group: 'Admin',
    hideAPIURL: true,
  },
  access: {
    read: authenticated,
    update: () => false,
  },
  fields: [
    {
      name: 'umami',
      type: 'ui',
      admin: {
        components: {
          Field: '@/globals/Analytics/Component',
        },
      },
    },
  ],
}
