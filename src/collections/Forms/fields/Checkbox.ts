import type { Block } from "payload";
import { label, name, required, width } from "./shared";

export const Checkbox: Block = {
  slug: 'checkbox',
  interfaceName: 'CheckboxFormField',
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
          name: 'errorMsg',
          type: 'text',
          label: 'Error Message',
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
          name: 'defaultValue',
          type: 'checkbox',
          label: 'Default Value',
          admin: {
            width: '33%',
          },
        },
        {
          ...required,
          admin: {
            width: '33%',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Checkbox Fields',
    singular: 'Checkbox',
  },
}