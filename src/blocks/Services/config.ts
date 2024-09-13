import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const Services: Block = {
  slug: 'services',
  labels: {
    plural: 'Services',
    singular: 'Services',
  },
  interfaceName: 'ServicesBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Redefine your recovery path',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Everything you need for a successful recovery journey',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        "With decades of experience, we've developed services that truly serve our community's needs.",
      required: true,
    },
    {
      name: 'gridSVG',
      type: 'checkbox',
      label: 'Grid background image',
      required: true,
      defaultValue: true,
    },
    {
      name: 'howMany',
      type: 'select',
      defaultValue: 'topThreeServices',
      label: 'Type',
      options: [
        {
          label: 'Top 3 Services',
          value: 'topThreeServices',
        },
        {
          label: 'All Services',
          value: 'allServices',
        },
      ],
      required: true,
    },
    {
      type: 'group',
      name: 'services',
      admin: {
        hideGutter: true,
        condition: (_, { howMany } = {}) => ['topThreeServices'].includes(howMany),
      },

      fields: [
        {
          name: 'topThreeServices',
          label: 'Top 3 Services',
          type: 'relationship',
          admin: {
            width: '350px',
          },
          relationTo: 'services',
          hasMany: true,
          maxRows: 3,
          minRows: 3,
          required: true,
        },
        linkGroup({
          overrides: {
            maxRows: 1,
            admin: {
              components: {
                RowLabel: '@/fields/LinkRowLabel',
              },
            },
          },
        }),
      ],
    },
  ],
}
