import { CollectionConfig } from 'payload'
// import { superAdmin } from '@/payload/access/superAdmin'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'desc', 'updatedAt'],
    components: {
      afterListTable: ['@/collections/Services/SeedButton'],
    },
    // hideAPIURL: !superAdmin,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'desc',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        components: {
          Field: '@/collections/Services/IconSelect',
          Cell: '@/collections/Services/CellIcon',
        },
      },
    },
  ],
}
