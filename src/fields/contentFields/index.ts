import { linkGroup } from '@/fields/link/linkGroup'
import type { Field } from 'payload'

export const contentFields: Field[] = [
  {
    name: 'hasSubtitle',
    type: 'checkbox',
    label: 'Use Subtitle',
    defaultValue: false,
  },
  {
    name: 'subtitle',
    type: 'group',
    admin: {
      condition: (_, siblingData) => Boolean(siblingData.hasSubtitle),
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'icon',
            type: 'text',
            admin: {
              components: {
                Field: '@/fields/iconSelect/Component',
              },
              width: '33%',
            },
          },
          {
            name: 'text',
            type: 'text',
            // admin: {
            //   width: '50%',
            // },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        required: true,
        admin: {
          width: '50%',
        },
      },
      {
        name: 'heading',
        type: 'radio',
        defaultValue: 'h2',
        options: [
          { label: 'H1', value: 'h1' },
          { label: 'H2', value: 'h2' },
        ],
        admin: {
          width: '50%',
        },
      },
    ],
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: true,
  },
  {
    name: 'mobileHeroLinks',
    type: 'checkbox',
    label: 'Use default mobile hero links',
    defaultValue: false,
  },
  linkGroup({
    overrides: {
      maxRows: 2,
      admin: {
        components: {
          RowLabel: '@/fields/link/LinkRowLabel',
        },
      },
    },
  }),
]
