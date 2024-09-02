import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
// import { superAdmin } from '@/payload/access/superAdmin'

export const Landcapes: CollectionConfig = {
  slug: 'landscapes',
  labels: {
    singular: 'Landscape',
    plural: 'Landscapes',
  },
  access: {
    read: anyone,
  },
  admin: {
    description: 'Images with a 16:9 ratio.',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
    // hideAPIURL: !superAdmin,
  },
  upload: {
    formatOptions: {
      format: 'avif',
    },
    resizeOptions: {
      width: 1600,
      height: 900,
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        formatOptions: {
          format: 'avif',
        },
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
