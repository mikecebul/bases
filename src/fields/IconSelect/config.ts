import { TextField } from 'payload'

export const iconSelect: TextField = {
  name: 'icon',
  type: 'text',
  admin: {
    components: {
      Field: '@/fields/iconSelect/Component',
    },
  },
}
