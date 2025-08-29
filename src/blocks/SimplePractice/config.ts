import type { Block } from 'payload'
import { contentFields } from '@/fields/contentFields'

export const SimplePractice: Block = {
  slug: 'simplePractice',
  interfaceName: 'SimplePractice',
  labels: {
    singular: 'SimplePractice Contact',
    plural: 'SimplePractice Contacts',
  },
  fields: [
    ...contentFields,
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Schedule Consultation',
      required: true,
    },
    {
      name: 'buttonDescription',
      type: 'text',
      label: 'Button Description',
      defaultValue: 'Click above to open our secure contact form',
    },
  ],
}