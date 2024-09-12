import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    defaultColumns: ['name', 'type', 'avatar', 'role', 'updatedAt'],
    description: 'A collection of staff and board members.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'type',
              type: 'radio',
              defaultValue: 'staff',
              options: [
                {
                  label: 'Staff Member',
                  value: 'staff',
                },
                {
                  label: 'Board Member',
                  value: 'board',
                },
              ],
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'avatars',
              required: true,
              admin: {
                description:
                  'This image will only show the face. Leave some space for it to be cropped in a circle.',
                components: {
                  Cell: '@/collections/Team/AvatarCell',
                },
              },
            },
            {
              name: 'image',
              label: 'Portrait Image',
              type: 'upload',
              relationTo: 'portraits',
              required: true,
              admin: {
                description: 'This image uses a 8:10 ratio.',
              },
            },
            {
              name: 'role',
              type: 'text',
              required: true,
            },
            {
              name: 'qualifications',
              type: 'text',
              admin: {
                condition: (_, { type } = {}) => ['staff'].includes(type),
              },
            },
            {
              name: 'bio',
              label: 'Biography',
              type: 'richText',
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    ...slugField('name'),
  ],
}
