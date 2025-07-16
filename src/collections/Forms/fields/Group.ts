import type { Block } from 'payload'
import { ArrayBlock } from './Array'
import { Checkbox } from './Checkbox'
import { Country } from './Country'
import { Email } from './Email'
import { Number } from './Number'
import { Phone } from './Phone'
import { Select } from './Select'
import { name } from './shared'
import { State } from './State'
import { Text } from './Text'
import { Textarea } from './Textarea'

export const Group: Block = {
  slug: 'group',
  interfaceName: 'GroupFormField',
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
          name: 'title',
          type: 'text',
          label: 'Title',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'blocks',
      name: 'fields',
      label: 'Fields',
      required: true,
      blocks: [Text, Textarea, Email, Number, Checkbox, Phone, ArrayBlock, Select, State, Country],
    },
  ],
}
