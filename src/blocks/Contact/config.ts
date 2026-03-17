import type { Block } from 'payload'

export const ContactPage: Block = {
  slug: 'contactPage',
  interfaceName: 'ContactPage',
  labels: {
    singular: 'Contact Page',
    plural: 'Contact Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      defaultValue: 'Contact Us',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Page Description',
      defaultValue: 'Ready to take the next step in your wellness journey? We\'re here to help. Reach out to schedule an appointment, ask questions, or learn more about our services.',
    },
    {
      name: 'contactFormTitle',
      type: 'text',
      label: 'Contact Form Title',
      defaultValue: 'Send Secure Message',
    },
    {
      name: 'contactFormDescription',
      type: 'textarea',
      label: 'Contact Form Description',
      defaultValue: 'Use our HIPAA-compliant contact form to send us a secure message.',
    },
    {
      name: 'contactFormButtonText',
      type: 'text',
      label: 'Contact Form Button Text',
      defaultValue: 'Open Contact Form',
    },
    {
      name: 'contactInstructions',
      type: 'richText',
      label: 'Contact Instructions',
      admin: {
        description: 'Instructions for clients on how to contact the practice (displays in the location card)',
      },
    },
    {
      name: 'useCompanyInfo',
      type: 'checkbox',
      label: 'Use Company Info for Contact Details',
      defaultValue: true,
      admin: {
        description: 'When enabled, contact details will be pulled from Company Info global. When disabled, use the fields below.',
      },
    },
    {
      name: 'customEmail',
      type: 'email',
      label: 'Custom Email',
      admin: {
        condition: (_, siblingData) => !siblingData.useCompanyInfo,
        description: 'Override email when not using Company Info',
      },
    },
    {
      name: 'customPhone',
      type: 'text',
      label: 'Custom Phone',
      admin: {
        condition: (_, siblingData) => !siblingData.useCompanyInfo,
        description: 'Override phone when not using Company Info',
      },
    },
    {
      name: 'customAddress',
      type: 'textarea',
      label: 'Custom Address',
      admin: {
        condition: (_, siblingData) => !siblingData.useCompanyInfo,
        description: 'Override address when not using Company Info',
      },
    },
    {
      name: 'phoneHours',
      type: 'text',
      label: 'Phone Hours',
      admin: {
        description: 'Phone availability hours (displays under the phone number)',
      },
      defaultValue: 'Monday - Friday, 11:00 AM - 2:00 PM',
    },
  ],
}