import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { CollectionConfig } from 'payload'

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
    hideAPIURL: true,
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
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
          Field: {
            path: '@/collections/Services/IconSelect',
          },
          Cell: '@/collections/Services/CellIcon',
        },
      },
    },
  ],
}
