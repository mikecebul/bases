import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const HeroBlock: Block = {
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
          defaultValue: 'Substance Use and Mental Health Counseling',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          defaultValue:
            'We bridge the gap to recovery, offering flexible and personalized services both in-person and via telehealth.',
        },
        linkGroup({
          overrides: {
            maxRows: 2,
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
      ],
    },
  ],
}
