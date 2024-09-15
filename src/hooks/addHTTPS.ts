import type { FieldHook } from 'payload'

export const addHTTPS: FieldHook = ({ operation, value }) => {
  if (operation === 'create' || operation === 'update') {
    if (typeof value === 'string' && !value.startsWith('https://') && !value.startsWith('http://'))
      return `https://${value}`
  }
  return value
}
