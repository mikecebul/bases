import type { ArrayField } from 'payload'
import { addHTTPS } from '@/hooks/addHTTPS'
import { fetchRandomImage } from './fetchRandomImage'

export const linkCards: ArrayField = {
  name: 'linkCards',
  type: 'array',
  label: 'Link and YouTube Cards',
  interfaceName: 'LinkCards',
  admin: {
    components: {
      RowLabel: '@/components/RowLabel/RowLabelWithTitle',
    },
  },
  fields: [
    {
      name: 'linkType',
      type: 'radio',
      defaultValue: 'link',
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
      name: 'imageUploadOption',
      label: 'Image Upload Option',
      type: 'radio',
      defaultValue: 'generate',
      admin: {
        condition: (_, siblingData) => !siblingData.image && siblingData.linkType === 'link',
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
        condition: (_, siblingData) =>
          siblingData.linkType === 'link' && siblingData.imageUploadOption === 'generate',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      hooks: {
        beforeChange: [fetchRandomImage]
      },
      admin: {
        condition: (_, siblingData) =>
          siblingData.linkType === 'link' &&
          (!!siblingData.image || siblingData.imageUploadOption === 'manual'),
      },
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
}
