import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { fileURLToPath } from 'url'
import path from 'path'
import { superAdmin } from '@/access/superAdmin'
import { editorOrHigher } from '@/access/editorOrHigher'
import { generateBlurhash } from './generateBlurhash'
import { revalidateMedia } from './hooks/revalidateMedia'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: anyone,
    update: editorOrHigher,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Admin',
    hideAPIURL: !superAdmin,
  },
  upload: {
    formatOptions: {
      format: 'webp',
    },
    resizeOptions: {
      width: 1600,
      withoutEnlargement: true,
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        fit: 'cover',
        withoutEnlargement: false,
        formatOptions: {
          format: 'webp',
        },
        generateImageName: ({ originalName, extension }) => {
          return `${originalName}-thumbnail.${extension}`
        },
      },
      {
        name: 'meta',
        width: 1200,
        height: 630,
        position: 'top',
        fit: 'inside',
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
        },
        generateImageName: ({ originalName, extension }) => {
          return `${originalName}-meta.${extension}`
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    staticDir: path.resolve(dirname, '../../../public/media'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for SEO and accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'prefix',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'blurhash',
      type: 'text',
      admin: {
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
  ],
  hooks: {
    beforeValidate: [generateBlurhash],
    afterChange: [revalidateMedia],
    afterDelete: [revalidateMedia],
  },
}
