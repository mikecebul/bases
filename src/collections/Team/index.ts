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
import { editorOrHigher } from '@/access/editorOrHigher'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateDelete } from './hooks/revalidateDelete'

export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: authenticatedOrPublished,
    update: editorOrHigher,
  },
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'name',
    hideAPIURL: !superAdmin,
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? `team/${data.slug}` : '',
          collection: 'team',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? `team/${data.slug}` : '',
        collection: 'team',
        req,
      }),
    defaultColumns: ['name', 'image', 'memberType', 'role', 'updatedAt'],
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
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              displayPreview: true,
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
                  relationTo: 'media',
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
    afterDelete: [revalidateDelete],
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
