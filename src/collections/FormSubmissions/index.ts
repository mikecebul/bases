import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { replaceDoubleCurlys } from './utils/replace-double-curlys'
import { serializeLexical } from './utils/Lexical/serialize-lexical'
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
