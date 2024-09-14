import { link } from '@/fields/link'
import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'
// import { superAdmin } from "../access/superAdmin";

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  label: 'Company Info',
  admin: {
    description: 'Update business information.',
    // hideAPIURL: !superAdmin,
  },
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')],
  },
  fields: [
    {
      name: 'contact',
      type: 'group',
      admin: {
        description: 'Company contact information.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'phone',
              label: 'Phone Number',
              type: 'text',
              defaultValue: '(231) 547-1144',
              admin: { width: '45%' },
            },
            {
              name: 'fax',
              label: 'Fax',
              type: 'text',
              defaultValue: '(231) 547-4970',
              admin: { width: '45%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'address',
              label: 'Address',
              type: 'text',
              defaultValue: '101 M-66 | Charlevoix, MI',
              admin: { width: '45%' },
            },
            {
              name: 'googleMapLink',
              type: 'text',
              label: 'Google Map Link',
              defaultValue: 'https://goo.gl/maps/X956fmf511Fef9Pr7',
              admin: { width: '45%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'email',
              label: 'Email',
              type: 'text',
              defaultValue: 'info@basesmi.org',
              admin: { width: '45%' },
            },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/globals/CompanyInfo/SocialRowLabel',
        },
      },
      fields: [
        {
          name: 'platform',
          type: 'text',
        },
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: 'hours',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/globals/CompanyInfo/HoursRowLabel',
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'radio',
              admin: {
                layout: 'horizontal',
                width: '50%',
              },
              defaultValue: 'default',
              options: [
                {
                  label: 'Day/Hours',
                  value: 'default',
                },
                {
                  label: 'Custom Note',
                  value: 'custom',
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'default',
          },
          fields: [
            {
              name: 'day',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'hours',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'note',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
      ],
    },
  ],
}
