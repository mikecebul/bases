import { Block } from 'payload'

export const Donate: Block = {
  slug: 'donate',
  interfaceName: 'DonateBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'programs',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/blocks/Donate/RowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
      ],
    },
  ],
}
