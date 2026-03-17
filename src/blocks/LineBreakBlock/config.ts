import type { Block } from 'payload'

export const LineBreakBlock: Block = {
  slug: 'lineBreakBlock',
  interfaceName: 'LineBreakBlock',
  fields: [
    {
      name: 'size',
      type: 'select',
      label: 'Spacing Size',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
  ],
}