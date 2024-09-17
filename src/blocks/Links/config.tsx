import { Block } from 'payload'
import { Hero } from '@/blocks/Hero/config'
import { addHTTPS } from '@/hooks/addHTTPS'
import { fetchRandomImage } from '@/fields/cards/fetchRandomImage'

export const Links: Block = {
  slug: 'linksBlock',
  interfaceName: 'LinksBlock',
  fields: [
    {
      name: 'hero',
      type: 'blocks',
      blocks: [Hero],
      maxRows: 1,
      admin: {
        description: 'Only use Medium Impact Hero.',
      },
    },
    {
      name: 'linkCards',
      type: 'array',
      label: 'Link and YouTube Cards',
      admin: {
        components: {
          RowLabel: '@/blocks/Links/RowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'linkType',
          type: 'radio',
          options: [
            {
              label: 'Link to Resource',
              value: 'link',
            },
            {
              label: 'Video Embed Link',
              value: 'video',
            },
          ],
        },
        {
          name: 'resource',
          type: 'group',
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'link',
          },
          fields: [
            {
              name: 'imageUploadOption',
              label: 'Image Upload Option',
              type: 'radio',
              defaultValue: 'generate',
              admin: {
                condition: (_, siblingData) => !siblingData.image,
              },
              options: [
                {
                  label: 'Generate image',
                  value: 'generate',
                },
                {
                  label: 'Upload image',
                  value: 'manual',
                },
              ],
            },
            {
              name: 'keywords',
              type: 'text',
              admin: {
                description: 'Coma seperated words',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'cards',
              hooks: {
                beforeChange: [
                  ({ siblingData }) =>
                    fetchRandomImage(
                      siblingData.keywords ? siblingData.keywords.split(',') : ['mental health'],
                    ),
                ],
              },
              admin: {
                condition: (_, siblingData) => {
                  return (
                    !!siblingData.image ||
                    (siblingData.imageUploadOption && siblingData.imageUploadOption === 'manual')
                  )
                },
              },
            },
          ],
        },
        {
          name: 'href',
          label: 'Url',
          type: 'text',
          required: true,
          hooks: {
            beforeValidate: [addHTTPS],
          },
        },
      ],
    },
  ],
}
