import { Block } from 'payload'

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  fields: [
    {
      name: 'type',
      type: 'radio',
      defaultValue: 'staff',
      options: [
        {
          label: 'Staff Member',
          value: 'staff',
        },
        {
          label: 'Board Member',
          value: 'board',
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'reverse',
      type: 'checkbox',
      label: 'Block on opposite side',
    },
  ],
}
