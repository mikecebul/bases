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
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
