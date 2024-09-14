import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Cards: CollectionConfig = {
  slug: 'cards',
  labels: {
    singular: 'Card Image',
    plural: 'Card Images',
  },
  access: {
    read: anyone,
  },
  admin: {
    hideAPIURL: true,
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
  },
  upload: {
    crop: true,
    formatOptions: {
      format: 'avif',
    },
    resizeOptions: {
      height: 800,
      width: 800,
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
