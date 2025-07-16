import type { Block } from 'payload'
import { label, name, required, width } from './shared'

export const Country: Block = {
  slug: 'country',
  interfaceName: 'CountryFormField',
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
    plural: 'Country Fields',
    singular: 'Country',
  },
}
