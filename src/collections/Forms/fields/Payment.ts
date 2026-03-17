import type { Block } from 'payload'
import { label, name, required, width } from './shared'

export const Payment: Block = {
  slug: 'payment',
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
          name: 'basePrice',
          type: 'number',
          admin: {
            width: '50%',
          },
          label: 'Base Price',
        },
      ],
    },
    {
      name: 'paymentProcessor',
      type: 'select',
      label: 'Payment Processor',
      options: [{ label: 'Stripe', value: 'stripe' }],
      defaultValue: 'stripe',
    },
    {
      name: 'priceConditions',
      type: 'array',
      fields: [
        {
          name: 'fieldToUse',
          type: 'text',
          admin: {
            components: {
              Field: '@/collections/Forms/fields/DynamicFieldSelector',
            },
          },
        },
        {
          name: 'condition',
          type: 'select',
          defaultValue: 'hasValue',
          label: 'Condition',
          options: [
            {
              label: 'Has Any Value',
              value: 'hasValue',
            },
            {
              label: 'Equals',
              value: 'equals',
            },
            {
              label: 'Does Not Equal',
              value: 'notEquals',
            },
          ],
        },
        {
          name: 'valueForCondition',
          type: 'text',
          admin: {
            condition: (_: any, { condition }: any) =>
              condition === 'equals' || condition === 'notEquals',
          },
          label: 'Value',
        },
        {
          name: 'operator',
          type: 'select',
          defaultValue: 'add',
          options: [
            {
              label: 'Add',
              value: 'add',
            },
            {
              label: 'Subtract',
              value: 'subtract',
            },
            {
              label: 'Multiply',
              value: 'multiply',
            },
            {
              label: 'Divide',
              value: 'divide',
            },
          ],
        },
        {
          name: 'valueType',
          type: 'radio',
          admin: {
            width: '100%',
          },
          defaultValue: 'static',
          label: 'Value Type',
          options: [
            {
              label: 'Static Value',
              value: 'static',
            },
            {
              label: 'Value Of Field',
              value: 'valueOfField',
            },
          ],
        },
        {
          name: 'valueForOperator',
          type: 'text',
          admin: {
            components: {
              Field: '@/collections/Forms/fields/DynamicPriceSelector',
            },
          },
          label: 'Value',
        },
      ],
      label: 'Price Conditions',
      labels: {
        plural: 'Price Conditions',
        singular: 'Price Condition',
      },
    },
    required,
  ],
  labels: {
    plural: 'Payment Fields',
    singular: 'Payment',
  },
}
