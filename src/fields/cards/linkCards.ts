import type { Field } from 'payload'
import { RowLabel } from '../../blocks/Links/RowLabel'
import { addHTTPS } from '@/hooks/addHTTPS'
import { fetchRandomImage } from './fetchRandomImage'

export const linkCards = (keywords: string[]): Field => {
  return {
    name: 'links',
    type: 'array',
    interfaceName: 'LinkCards',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
        required: true,
      },
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
        name: 'image',
        type: 'upload',
        relationTo: 'cards',
        hooks: {
          beforeChange: [fetchRandomImage(keywords)],
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
}
