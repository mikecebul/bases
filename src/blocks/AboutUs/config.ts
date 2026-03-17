import { Block } from 'payload'

export const AboutUs: Block = {
  slug: 'aboutUs',
  interfaceName: 'AboutUsBlock',
  fields: [
    {
      name: 'richContent',
      type: 'richText',
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}
