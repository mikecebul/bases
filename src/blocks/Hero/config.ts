import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'Hero',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'mediumImpact',
      label: 'Type',
      options: [
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
      ],
      required: true,
    },
    {
      type: 'group',
      name: 'highImpact',
      admin: {
        hideGutter: true,
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'text',
          required: true,
          defaultValue: '(231) 547-1144',
          admin: {
            description: "Phone number for 'Call Now' cta on mobile.",
          },
        },
        linkGroup({
          overrides: {
            maxRows: 2,
            admin: {
              components: {
                RowLabel: '@/fields/LinkRowLabel',
              },
            },
          },
        }),
        {
          name: 'image',
          type: 'upload',
          relationTo: 'landscapes',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'mediumImpact',
      admin: {
        hideGutter: true,
        condition: (_, { type } = {}) => ['mediumImpact'].includes(type),
      },
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
