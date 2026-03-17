'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useState } from 'react'
import { useStore } from '@tanstack/react-form'
import type { FormBlock as FormBlockType } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { useDynamicForm } from './use-dynamic-form'
import { PostError } from '../Component'
import { RenderFields } from '../renders/render-fields-with-validation'

export const DynamicForm = ({ form: payloadForm, enableIntro, introContent }: FormBlockType) => {
  const { confirmationMessage, confirmationType, fields, formType } =
    typeof payloadForm !== 'string' ? payloadForm : {}

  const [postError, setPostError] = useState<PostError | undefined>()

  const { form, defaultValues } = useDynamicForm({ payloadForm, setPostError })

  // Check if the form is successfully submitted
  const [isSubmitSuccessful] = useStore(form.store, (state) => [state.isSubmitSuccessful])

  // Confirmation Message
  if (isSubmitSuccessful && !postError && confirmationType === 'message' && confirmationMessage)
    return <RichText data={confirmationMessage} />

  return (
    <div className="w-full">
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
          <CardContent className="grid grid-cols-1 gap-4 @lg:grid-cols-2 p-6 auto-cols-fr">
            {fields?.map((field) => (
              <RenderFields
                key={field.id}
                field={field}
                defaultValues={defaultValues}
                form={form}
              />
            ))}
          </CardContent>
          <CardFooter className="flex flex-col items center">
            <form.AppForm>
              <form.SubmitButton label={'Submit'} />
            </form.AppForm>
            {postError && (
              <em className="pt-2 text-destructive">{`${postError.status || '500'}: ${postError.message || ''}`}</em>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
