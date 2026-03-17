import type { Block } from 'payload'
import { label, name, required, width } from './shared'

export const Textarea: Block = {
  slug: 'textarea',
  interfaceName: 'TextareaFormField',
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
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
          localized: true,
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Text Area Fields',
    singular: 'Text Area',
  },
}
