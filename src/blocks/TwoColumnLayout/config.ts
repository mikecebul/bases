import { Block } from 'payload'
import { contentFields } from '@/fields/contentFields'
import { Form } from '../Form/config'

export const TwoColumnLayout: Block = {
  slug: 'twoColumnLayout',
  interfaceName: 'TwoColumnLayoutBlock',
  labels: {
    singular: 'Two Column Layout',
    plural: 'Two Column Layouts',
  },
  fields: [
    {
      name: 'direction',
      type: 'radio',
      defaultValue: 'ltr',
      options: [
        { label: 'Left to Right', value: 'ltr' },
        { label: 'Right to Left', value: 'rtl' },
      ],
      admin: {
        description: 'The direction of the layout',
      },
    },
    {
      name: 'breakpoint',
      type: 'radio',
      defaultValue: 'md',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      admin: {
        description: 'The breakpoint at which the layout switches to a two column layout',
      },
    },
    {
      name: 'columnOne',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'contentType',
              type: 'radio',
              options: [
                { label: 'Call to Action', value: 'cta' },
                { label: 'Rich Text', value: 'richText' },
              ],
              defaultValue: 'cta',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'verticalAlignment',
              type: 'select',
              options: ['top', 'center', 'bottom'],
              defaultValue: 'center',
              admin: {
                width: '25%',
              },
            },
          ],
        },
        {
          name: 'richText',
          type: 'richText',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'richText'),
          },
        },
        {
          name: 'cta',
          label: 'Call to Action',
          type: 'group',
          fields: contentFields,
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'cta'),
          },
        },
      ],
    },
    {
      name: 'columnTwo',
      type: 'group',
      fields: [
        {
          name: 'contentType',
          type: 'radio',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Form', value: 'form' },
          ],
          defaultValue: 'image',
        },
        {
          name: 'priority',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '25%',
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'image'),
          },
        },
        {
          name: 'sticky',
          type: 'checkbox',
          defaultValue: false,
          label: 'Make images sticky on scroll',
          admin: {
            description: 'Images will follow as user scrolls',
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'image'),
          },
        },
        {
          name: 'svg',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show SVG',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'image'),
          },
        },
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'image'),
          },
        },
        {
          name: 'form',
          type: 'blocks',
          blocks: [Form],
          maxRows: 1,
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'form'),
          },
        },
      ],
    },
  ],
}
