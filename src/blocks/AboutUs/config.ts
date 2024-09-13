import { Block } from 'payload'

export const AboutUs: Block = {
  slug: 'about-us',
  interfaceName: 'AboutUsBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: "Where it started & where we're going",
    },
    {
      name: 'richContent',
      type: 'richText',
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'landscapes',
      hasMany: true,
    },
  ],
}
