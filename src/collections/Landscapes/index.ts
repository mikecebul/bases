import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { fileURLToPath } from 'url'
import path from 'path'
import { superAdmin } from '@/access/superAdmin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
    description: 'Images with a 3:2 ratio.',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
    hideAPIURL: !superAdmin,
  },
  upload: {
    formatOptions: {
      format: 'webp',
    },
    resizeOptions: {
      width: 960,
      height: 640,
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
    staticDir: path.resolve(dirname, '../../../public/landscapes'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
