import { Block } from 'payload'
import { name, width } from './shared'
import { Text } from './Text'
import { Textarea } from './Textarea'
import { Email } from './Email'
import { Number } from './Number'
import { Checkbox } from './Checkbox'
import { Phone } from './Phone'

export const ArrayBlock: Block = {
  slug: 'array',
  interfaceName: 'ArrayFormField',
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
          name: 'label',
          type: 'text',
          label: 'Array Item Label',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Array Title',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Array Description',
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'minRows',
          type: 'number',
          label: 'Minimum Rows',
          required: true,
          defaultValue: 1,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'maxRows',
          type: 'number',
          label: 'Maximum Rows',
          required: true,
          defaultValue: 4,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      type: 'blocks',
      name: 'fields',
      label: 'Fields',
      required: true,
      blocks: [Text, Textarea, Email, Number, Checkbox, Phone],
    },
  ],
}
