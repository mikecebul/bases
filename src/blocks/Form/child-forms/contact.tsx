import { z } from 'zod'
import { withForm } from '../hooks/form'
import { formOptions } from '@tanstack/react-form'

export const contactFormOpts = formOptions({
  defaultValues: {
    name: '',
    number: '',
    email: '',
    description: '',
  },
})

export const ContactForm = withForm({
  ...contactFormOpts,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField
          name="name"
          validators={{
            onChange: z.string().min(1, 'Name is required'),
          }}
        >
          {(formField) => (
            <formField.TextField name="name" label="Name" colSpan="2" blockType="text" required />
          )}
        </form.AppField>
        <form.AppField
          name="number"
          validators={{
            onChange: z
              .string()
              .min(1, 'Phone number required')
              .regex(
                /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                'Invalid phone number',
              ),
          }}
        >
          {(formField) => (
            <formField.PhoneField
              name="number"
              label="Phone Number"
              colSpan="2"
              blockType="phone"
              required
            />
          )}
        </form.AppField>
        <form.AppField
          name="email"
          validators={{
            onChange: z.string().min(1, 'Email is required').email(),
          }}
        >
          {(formField) => (
            <formField.EmailField
              name="email"
              label="Email"
              colSpan="2"
              blockType="email"
              required
            />
          )}
        </form.AppField>
        <form.AppField
          name="description"
          validators={{
            onChange: z.string().min(1, 'Description is required'),
          }}
        >
          {(formField) => (
            <formField.TextareaField
              name="description"
              label="Description"
              colSpan="2"
              blockType="textarea"
              required
            />
          )}
        </form.AppField>
      </>
    )
  },
})
