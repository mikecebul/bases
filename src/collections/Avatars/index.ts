import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import path from 'path'
import { fileURLToPath } from 'url'
import { authenticated } from '@/access/authenticated'
import { superAdmin } from '@/access/superAdmin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Avatars: CollectionConfig = {
  slug: 'avatars',
  labels: {
    singular: 'Avatar',
    plural: 'Avatars',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    hideAPIURL: !superAdmin,
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
    description: 'Images with a 1:1 ratio. Crop only their face with some padding.',
  },
  upload: {
    crop: true,
    formatOptions: {
      format: 'webp',
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
          format: 'webp',
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    staticDir: path.resolve(dirname, '../../../public/avatars'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
