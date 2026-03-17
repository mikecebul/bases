import type { Block } from 'payload'
import { label, name, required, width } from './shared'

export const Email: Block = {
  slug: 'email',
  interfaceName: 'EmailFormField',
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
    width,
    required,
  ],
  labels: {
    plural: 'Email Fields',
    singular: 'Email',
  },
}
