import type { Block } from 'payload'
import { linkGroup } from '@/fields/link/linkGroup'

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
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Everything you need for a successful recovery journey',
          required: true,
        },
        {
          name: 'heading',
          type: 'select',
          defaultValue: 'h2',
          options: [
            {
              label: 'H1',
              value: 'h1',
            },
            {
              label: 'H2',
              value: 'h2',
            },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
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
      type: 'radio',
      defaultValue: 'topThreeServices',
      label: 'How Many?',
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
      name: 'topThreeServices',
      label: 'Services',
      type: 'relationship',
      admin: {
        condition: (_, { howMany } = {}) => ['topThreeServices'].includes(howMany),
        description: 'Select and sort the top 3 services',
        // width: '350px',
        style: {
          maxWidth: '350px',
        },
      },
      relationTo: 'services',
      hasMany: true,
      maxRows: 3,
      minRows: 3,
      required: true,
    },
    {
      name: 'allServices',
      label: 'Services',
      type: 'relationship',
      admin: {
        condition: (_, { howMany } = {}) => ['allServices'].includes(howMany),
        description: 'Select and sort all your available services',
        // width: '350px',
        style: {
          maxWidth: '350px',
        },
      },
      relationTo: 'services',
      hasMany: true,
      required: true,
    },
    linkGroup({
      overrides: {
        maxRows: 1,
        admin: {
          condition: (_, { howMany } = {}) => ['topThreeServices'].includes(howMany),
          components: {
            RowLabel: '@/fields/link/LinkRowLabel',
          },
        },
      },
    }),
  ],
}
