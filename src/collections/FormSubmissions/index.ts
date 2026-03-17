import type { CollectionConfig } from 'payload'
import { sendEmail } from './sendEmail'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    group: 'Forms',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      admin: {
        readOnly: true,
      },
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'data',
      type: 'json',
      required: true,
    },
  ],
  hooks: {
    afterChange: [(data) => sendEmail(data)],
  },
}
