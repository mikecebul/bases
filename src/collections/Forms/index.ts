import { CollectionConfig } from 'payload'
import { fields } from './fields'

export const Forms: CollectionConfig = {
  slug: 'forms',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Forms',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'formType',
      type: 'radio',
      options: [
        { label: 'Form Builder', value: 'dynamic' },
        { label: 'Pre Built', value: 'static' },
      ],
      defaultValue: 'dynamic',
      required: true,
    },
    {
      name: 'fields',
      type: 'blocks',
      blocks: Object.values(fields),
      admin: {
        condition: (_, siblingData) => siblingData.formType === 'dynamic',
      },
    },
    {
      name: 'form',
      type: 'select',
      options: [{ label: 'contact', value: 'contact' }],
      admin: {
        condition: (_, siblingData) => siblingData.formType === 'static',
      },
    },
    {
      name: 'submitButtonLabel',
      type: 'text',
      defaultValue: 'Submit',
    },
    {
      name: 'confirmationType',
      type: 'radio',
      admin: {
        description:
          'Choose whether to display an on-page message or redirect to a different page after they submit the form.',
        layout: 'horizontal',
      },
      defaultValue: 'message',
      options: [
        {
          label: 'Message',
          value: 'message',
        },
        {
          label: 'Redirect',
          value: 'redirect',
        },
      ],
    },
    {
      name: 'confirmationMessage',
      type: 'richText',
      admin: {
        condition: (_, siblingData) => siblingData?.confirmationType === 'message',
      },
      localized: true,
      required: true,
    },
    {
      name: 'redirect',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.confirmationType === 'redirect',
        hideGutter: true,
      },
      fields: [
        {
          name: 'type',
          type: 'radio',
          admin: {
            layout: 'horizontal',
          },
          defaultValue: 'reference',
          options: [
            {
              label: 'Internal link',
              value: 'reference',
            },
            {
              label: 'Custom URL',
              value: 'custom',
            },
          ],
        },
        {
          name: 'reference',
          type: 'relationship',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
          label: 'Document to link to',
          maxDepth: 2,
          relationTo: ['pages'],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL to redirect to',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
      ],
    },
    {
      name: 'emails',
      type: 'array',
      access: {
        read: ({ req: { user } }) => !!user,
      },
      admin: {
        description:
          "Send custom emails when the form submits. Use comma separated lists to send the same email to multiple recipients. To reference a value from this form, wrap that field's name with double curly brackets, i.e. {{firstName}}. You can use a wildcard {{*}} to output all data and {{*:table}} to format it as an HTML table in the email.",
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'emailTo',
              type: 'text',
              admin: {
                placeholder: '"Email Sender" <sender@email.com>',
                width: '100%',
              },
              label: 'Email To',
            },
            {
              name: 'cc',
              type: 'text',
              admin: {
                style: {
                  maxWidth: '50%',
                },
              },
              label: 'CC',
            },
            {
              name: 'bcc',
              type: 'text',
              admin: {
                style: {
                  maxWidth: '50%',
                },
              },
              label: 'BCC',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'replyTo',
              type: 'text',
              admin: {
                placeholder: '"Reply To" <reply-to@email.com>',
                width: '50%',
              },
              label: 'Reply To',
            },
            {
              name: 'emailFrom',
              type: 'text',
              admin: {
                placeholder: '"Email From" <email-from@email.com>',
                width: '50%',
              },
              label: 'Email From',
            },
          ],
        },
        {
          name: 'subject',
          type: 'text',
          defaultValue: "You've received a new message.",
          label: 'Subject',
          localized: true,
          required: true,
        },
        {
          name: 'message',
          type: 'richText',
          admin: {
            description: 'Enter the message that should be sent in this email.',
          },
          label: 'Message',
          localized: true,
        },
      ],
    },
  ],
}
