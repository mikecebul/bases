import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
// import { superAdmin } from "@/payload/access/superAdmin";

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
    // hideAPIURL: !superAdmin,
  },
  upload: {
    formatOptions: {
      format: 'pdf',
    },
  },
  fields: [],
}
