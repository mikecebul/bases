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
    {
      name: 'features',
      type: 'array',
      label: 'Feature Cards',
      minRows: 1,
      maxRows: 6,
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
      ],
      defaultValue: [
        {
          title: 'Enhanced Security & HIPAA Compliance',
          description: 'HITRUST-certified security with specialized protection for substance abuse treatment records under 42 CFR Part 2. Bank-level encryption ensures your sensitive information is protected.',
        },
        {
          title: 'Streamlined Treatment Access',
          description: 'Complete intake forms from home, receive automated appointment reminders with secure telehealth links, and access your treatment documents 24/7 through our secure portal.',
        },
        {
          title: 'Integrated Care Coordination',
          description: 'Professional-grade treatment infrastructure with HIPAA-compliant telehealth integration, reducing administrative burden so we can focus on your recovery and therapeutic work.',
        },
      ],
    },
  ],
}