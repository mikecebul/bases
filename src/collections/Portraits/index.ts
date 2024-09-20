import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { fileURLToPath } from 'url'
import path from 'path'
import { superAdmin } from '@/access/superAdmin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Portraits: CollectionConfig = {
  slug: 'portraits',
  labels: {
    singular: 'Portrait',
    plural: 'Portraits',
  },
  access: {
    read: anyone,
  },
  admin: {
    description: 'Images with a 8:10 ratio.',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
    hideAPIURL: !superAdmin,
  },
  upload: {
    formatOptions: {
      format: 'webp',
    },
    resizeOptions: {
      width: 800,
      height: 1000,
      position: 'top',
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
    staticDir: path.resolve(dirname, '../../../public/portraits'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
