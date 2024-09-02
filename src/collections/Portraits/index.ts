import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
// import { superAdmin } from "@/payload/access/superAdmin";

export const Portraits: CollectionConfig = {
  slug: 'portraits',
  labels: {
    singular: 'Portrait',
    plural: 'Portrait',
  },
  access: {
    read: anyone,
  },
  admin: {
    description: 'Images with a 8:10 ratio.',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Media',
    // hideAPIURL: !superAdmin,
  },
  upload: {
    formatOptions: {
      format: 'avif',
    },
    resizeOptions: {
      width: 800,
      height: 1000,
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
