import type { Block } from 'payload'
import { label, name, required, width } from './shared'

export const Number: Block = {
  slug: 'number',
  interfaceName: 'NumberFormField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'number',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'min',
          label: 'Minumum Number',
          type: 'number',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'minError',
          label: 'Minumum Error Message',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'max',
          label: 'Maximum Number',
          type: 'number',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'maxError',
          label: 'Maximum Error Message',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Number Fields',
    singular: 'Number',
  },
}
