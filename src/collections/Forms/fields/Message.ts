import type { Block } from 'payload'

export const Message: Block = {
  slug: 'message',
  fields: [
    {
      name: 'message',
      type: 'richText',
      localized: true,
    },
  ],
  labels: {
    plural: 'Message Blocks',
    singular: 'Message',
  },
}
