import type { CheckboxField, SelectField, TextField } from 'payload'

export const name: TextField = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
}

export const label: TextField = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
}

export const required: CheckboxField = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

export const width: SelectField = {
  name: 'colSpan',
  type: 'select',
  label: 'Width: col-span-?',
  options: [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
  ],
  defaultValue: '2',
  required: true,
  admin: {
    description: 'form defaults to spanning the full two columns',
  },
}
