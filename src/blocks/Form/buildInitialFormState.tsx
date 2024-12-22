import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export const buildInitialFormState = (fields: FormFieldBlock[]) => {
  return fields?.reduce((initialSchema, field) => {
    switch (field.blockType) {
      case 'checkbox':
        return {
          ...initialSchema,
          [field.name]: field.defaultValue,
        }
      case 'select':
        return {
          ...initialSchema,
          [field.name]: field.defaultValue || '',
        }
      case 'textarea':
        return {
          ...initialSchema,
          [field.name]: field.defaultValue || '',
        }
      case 'email':
      case 'text':
      case 'country':
      case 'state':
        return {
          ...initialSchema,
          [field.name]: '',
        }
      default:
        return initialSchema
    }
  }, {})
}
