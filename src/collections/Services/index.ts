import { anyone } from '@/access/anyone'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrHigher } from '@/access/editorOrHigher'
import { superAdmin } from '@/access/superAdmin'
import { iconSelect } from '@/fields/iconSelect/config'
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
      afterListTable: [
        {
          path: '@/collections/Services/SeedButton',
          exportName: 'Button',
        },
      ],
    },
    hideAPIURL: !superAdmin,
  },
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: anyone,
    update: editorOrHigher,
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
    iconSelect,
  ],
}
