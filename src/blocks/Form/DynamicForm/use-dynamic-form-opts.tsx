'use client'

import { formOptions } from '@tanstack/react-form'
import type { Form } from '@/payload-types'
import type { Dispatch, SetStateAction } from 'react'
import { getClientSideURL } from '@/utilities/getURL'
import { useRouter } from 'next/navigation'
import { PostError } from '../Component'

export type FormField = NonNullable<Form['fields']>[number]
export type Value = string | number | boolean | any[] | Record<string, any> | undefined
export type DefaultValues = Record<string, Value>

export const useDynamicFormOpts = ({
  payloadForm,
  setPostError,
}: {
  payloadForm: Form | string
  setPostError: Dispatch<SetStateAction<PostError | undefined>>
}) => {
  const {
    confirmationType,
    fields,
    id: formId,
    redirect,
    form,
  } = typeof payloadForm !== 'string' ? payloadForm : {}
  const router = useRouter()
  const defaultValues = getDefaultValues(fields)

  return formOptions({
    defaultValues,
    onSubmit: async ({ value: data, formApi: form }) => {
      setPostError(undefined)

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formId,
            data,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = await req.json()

        if (req.status >= 400) {
          setPostError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status,
          })

          return
        }

        if (confirmationType === 'redirect' && redirect) {
          if (redirect.url) router.push(redirect.url)
          if (
            typeof redirect.reference !== 'string' &&
            typeof redirect.reference?.value !== 'string' &&
            redirect.reference?.value.slug
          ) {
            router.push(redirect.reference.value.slug)
          }
        }

        form.reset()
      } catch (err) {
        console.warn(err)
        setPostError({
          message: 'Something went wrong.',
        })
      }
    },
  })
}

const getDefaultValues = (fields: Form['fields']) => {
  const defaultValues: DefaultValues = {}

  if (fields) {
    fields.forEach((field) => {
      if ('name' in field && field.name) {
        let defaultValue: Value

        switch (field.blockType) {
          case 'number':
            defaultValue = !!field.defaultValue ? Number(field.defaultValue) : ''
            break
          case 'checkbox':
            defaultValue = !!field.defaultValue ? Boolean(field.defaultValue) : false
            break
          case 'array':
            const arrayDefaults = getDefaultValues(field.fields)
            defaultValue = field.fields ? [arrayDefaults] : []
            break
          case 'group':
            defaultValue = getDefaultValues(field.fields)
            break
          default:
            defaultValue = 'defaultValue' in field && !!field.defaultValue ? field.defaultValue : ''
            break
        }
        defaultValues[field.name] = defaultValue
      }
    })
  }
  return defaultValues
}
