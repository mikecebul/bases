import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig } from 'payload'
import { revalidateTeam } from './hooks/revalidateTeam'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { superAdmin } from '@/access/superAdmin'

export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'name',
    hideAPIURL: !superAdmin,
    defaultColumns: ['name', 'memberType', 'avatar', 'role', 'updatedAt'],
    description: 'A collection of staff and board members.',
    components: {
      afterListTable: ['@/collections/Team/SeedButton'],
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'memberType',
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
                condition: (_, { memberType } = {}) => ['staff'].includes(memberType),
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
            {
              name: 'hideFromSearchEngines',
              type: 'checkbox',
              defaultValue: false,
              label: 'Hide from search engines',
            },
            {
              name: 'metadata',
              type: 'group',
              admin: {
                condition: (data) => data.meta.hideFromSearchEngines === false,
              },
              fields: [
                OverviewField({
                  titlePath: 'meta.metadata.title',
                  descriptionPath: 'meta.metadata.description',
                  imagePath: 'meta.metadata.image',
                }),
                MetaTitleField({
                  hasGenerateFn: true,
                }),
                MetaImageField({
                  relationTo: 'meta-images',
                }),

                MetaDescriptionField({}),
                PreviewField({
                  // if the `generateUrl` function is configured
                  hasGenerateFn: true,

                  // field paths to match the target field for data
                  titlePath: 'meta.metadata.title',
                  descriptionPath: 'meta.metadata.description',
                }),
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField('name'),
  ],
  hooks: {
    afterChange: [revalidateTeam],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
