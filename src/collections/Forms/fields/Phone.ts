import type { Block } from 'payload'
import { label, name, required, width } from './shared'

export const Phone: Block = {
  slug: 'phone',
  interfaceName: 'PhoneFormField',
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
    plural: 'Phone Fields',
    singular: 'Phone',
  },
}
