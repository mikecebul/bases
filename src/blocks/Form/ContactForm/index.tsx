'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useState } from 'react'
import { useStore } from '@tanstack/react-form'
import type { FormBlock } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { z } from 'zod'
import { useAppForm } from '../hooks/form'
import { PostError } from '../Component'
import { useContactFormOpts } from './use-contact-form-opts'

export const ContactForm = ({ form: payloadForm, enableIntro, introContent }: FormBlock) => {
  const { confirmationMessage, confirmationType } =
    typeof payloadForm === 'object' ? payloadForm : {}

  const [postError, setPostError] = useState<PostError | undefined>()
  const formOpts = useContactFormOpts({
    payloadForm,
    setPostError,
  })
  const form = useAppForm({
    ...formOpts,
  })

  // Check if the form is successfully submitted
  const [isSubmitSuccessful] = useStore(form.store, (state) => [state.isSubmitSuccessful])

  return (
    <div className="w-full max-w-2xl">
      {enableIntro && introContent && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Card className="@container">
          {isSubmitSuccessful &&
          !postError &&
          confirmationType === 'message' &&
          confirmationMessage ? (
            <RichText data={confirmationMessage} className="p-6" />
          ) : (
            <>
              <CardContent className="grid grid-cols-1 gap-4 @lg:grid-cols-2 p-6 auto-cols-fr">
                <form.AppField
                  name="name"
                  validators={{
                    onChange: z.string().min(1, 'Name is required'),
                  }}
                >
                  {(formField) => (
                    <formField.TextField
                      name="name"
                      label="Name"
                      colSpan="1"
                      blockType="text"
                      required
                    />
                  )}
                </form.AppField>
                <form.AppField
                  name="phone"
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
                      name="phone"
                      label="Phone Number"
                      colSpan="1"
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
                  name="confirmEmail"
                  validators={{
                    onChangeListenTo: ['email'],
                    onChange: ({ value, fieldApi }) => {
                      if (value !== fieldApi.form.getFieldValue('email')) {
                        return { message: 'Emails do not match' }
                      }
                      return undefined
                    },
                  }}
                >
                  {(formField) => (
                    <formField.EmailField
                      name="confirmEmail"
                      label="Confirm Email"
                      colSpan="2"
                      blockType="email"
                      required
                    />
                  )}
                </form.AppField>
                <form.AppField
                  name="services"
                  mode="array"
                  validators={{
                    onChange: ({ value }) =>
                      !value || value.length === 0
                        ? { message: 'Please select at least one service' }
                        : undefined,
                  }}
                >
                  {(formField) => (
                    <formField.MultiSelectField
                      name="services"
                      label="Services of Interest"
                      colSpan="2"
                    />
                  )}
                </form.AppField>
                <form.AppField
                  name="message"
                  validators={{
                    onChange: z.string().min(1, 'Description is required'),
                  }}
                >
                  {(formField) => (
                    <formField.TextareaField
                      name="message"
                      label="Message"
                      colSpan="2"
                      blockType="textarea"
                      required
                    />
                  )}
                </form.AppField>
              </CardContent>
              <CardFooter className="flex flex-col items center">
                <form.AppForm>
                  <form.SubmitButton label={'Submit'} />
                </form.AppForm>
                {postError && (
                  <em className="pt-2 text-destructive">{`${postError.status || '500'}: ${postError.message || ''}`}</em>
                )}
              </CardFooter>
            </>
          )}
        </Card>
      </form>
    </div>
  )
}
