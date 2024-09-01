import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
          defaultValue: '(231) 547-1144',
          admin: { width: '50%' },
        },
        {
          name: 'address',
          label: 'Address',
          type: 'text',
          defaultValue: '101 M-66 | Charlevoix, MI',
          admin: { width: '50%' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
