import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import contactInfo from './fields/contactInfo'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      unique: true,
      minRows: 1,
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
          unique: true,
          options: [
            { label: 'Page Links', value: 'pageLinks' },
            { label: 'Contact Info', value: 'contactInfo' },
            { label: 'Social Links', value: 'socialLinks' },
            { label: 'Business Hours', value: 'businessHours' },
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
              RowLabel: '@/fields/LinkRowLabel',
            },
          },
        },
        contactInfo({
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData.columnType === 'contactInfo',
            },
          },
        }),
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Links',
          fields: [
            {
              name: 'platform',
              type: 'text',
              label: 'Platform',
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.columnType === 'socialLinks',
            components: {
              RowLabel: '@/globals/Footer/rowLabels/SocialRowLabel',
            },
          },
        },
        {
          name: 'businessHours',
          type: 'array',
          label: 'Business Hours',
          fields: [
            {
              name: 'day',
              type: 'text',
              label: 'Day',
            },
            {
              name: 'hours',
              type: 'text',
              label: 'Hours',
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.columnType === 'businessHours',
            components: {
              RowLabel: '@/globals/Footer/rowLabels/HoursRowLabel',
            },
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
            },
            {
              name: 'location',
              type: 'text',
              label: 'Location (Latitude, Longitude)',
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.columnType === 'googleMap',
          },
        },
      ],
      maxRows: 6, // Limit the number of columns (you can adjust this as needed)
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
