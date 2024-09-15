import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import contactInfo from './fields/contactInfo'
import { encryptField } from './hooks/encryptField'
import { decryptField } from './hooks/decryptField'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      admin: {
        components: {
          RowLabel: '@/globals/Footer/rowLabels/ColumnRowLabel',
        },
      },
      fields: [
        {
          name: 'columnType',
          label: 'Column Type',
          type: 'select',
          options: [
            { label: 'Page Links', value: 'pageLinks' },
            { label: 'Contact Info', value: 'contactInfo' },
            { label: 'Google Map', value: 'googleMap' },
          ],
          required: true,
        },
        {
          name: 'pageLinks',
          type: 'array',
          label: 'Page Links',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            condition: (_, siblingData) => siblingData.columnType === 'pageLinks',
            components: {
              RowLabel: '@/fields/link/LinkRowLabel',
            },
          },
        },
        {
          name: 'contact',
          type: 'group',
          fields: [
            {
              name: 'showContact',
              type: 'checkbox',
              defaultValue: 'true',
              label: 'Add column for business contact information.',
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.columnType === 'contactInfo',
          },
        },
        {
          name: 'googleMap',
          type: 'group',
          label: 'Google Map',
          fields: [
            {
              name: 'apiKey',
              type: 'text',
              label: 'Google Maps API Key',
              required: true,
              hooks: {
                beforeChange: [encryptField],
                afterRead: [decryptField],
              },
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.columnType === 'googleMap',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
