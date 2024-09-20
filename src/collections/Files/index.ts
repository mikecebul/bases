import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { fileURLToPath } from 'url'
import path from 'path'
import { superAdmin } from '@/access/superAdmin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Files: CollectionConfig = {
  slug: 'files',
  labels: {
    singular: 'File',
    plural: 'Files',
  },
  access: {
    read: anyone,
  },
  admin: {
    description: 'Only PDF formats.',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
    hideAPIURL: !superAdmin,
  },
  upload: {
    formatOptions: {
      format: 'pdf',
    },
    staticDir: path.resolve(dirname, '../../../public/files'),
  },
  fields: [],
}
