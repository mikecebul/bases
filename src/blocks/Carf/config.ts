import { Block } from 'payload'

export const Carf: Block = {
  slug: 'carf',
  interfaceName: 'CarfBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'cards',
    },
  ],
}
