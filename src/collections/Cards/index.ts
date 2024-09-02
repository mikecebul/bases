import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
// import { superAdmin } from "@/payload/access/superAdmin";

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
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
    // hideAPIURL: !superAdmin,
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
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
