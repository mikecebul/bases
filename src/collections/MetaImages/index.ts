import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const MetaImages: CollectionConfig = {
  slug: 'meta-images',
  labels: {
    singular: 'Meta Image',
    plural: 'Meta Images',
  },
  access: {
    read: anyone,
  },
  admin: {
    description: 'Images with a 16:9 ratio.',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
    hideAPIURL: true,
  },
  upload: {
    formatOptions: {
      format: 'avif',
    },
    resizeOptions: {
      width: 1200,
      height: 630,
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
    staticDir: path.resolve(dirname, '../../../public/meta'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
