import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
// import { superAdmin } from '@/payload/access/superAdmin'

export const Avatars: CollectionConfig = {
  slug: 'avatars',
  labels: {
    singular: 'Avatar',
    plural: 'Avatars',
  },
  access: {
    read: anyone,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
    // hideAPIURL: !superAdmin,
    description: 'Images with a 1:1 ratio. Crop only their face with some padding.',
  },
  upload: {
    crop: true,
    formatOptions: {
      format: 'avif',
    },
    resizeOptions: {
      width: 400,
      height: 400,
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
