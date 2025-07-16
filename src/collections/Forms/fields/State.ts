import type { Block } from 'payload'
import { label, name, required, width } from './shared'

export const State: Block = {
  slug: 'state',
  interfaceName: 'StateFormField',
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
    plural: 'State Fields',
    singular: 'State',
  },
}
