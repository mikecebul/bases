'use client'

import { formOptions } from '@tanstack/react-form'
import { getClientSideURL } from '@/utilities/getURL'
import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import { PostError } from '../Component'
import { Form } from '@/payload-types'

export type ContactFormType = {
  name: string
  phone: string
  email: string
  confirmEmail: string
  services: string[]
  message: string
}

export const useContactFormOpts = ({
  payloadForm,
  setPostError,
}: {
  payloadForm: Form | string
  setPostError: Dispatch<SetStateAction<PostError | undefined>>
}) => {
  const router = useRouter()
  const {
    confirmationType,
    id: formId,
    redirect,
  } = typeof payloadForm !== 'string' ? payloadForm : {}

  return formOptions({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      confirmEmail: '',
      services: [],
      message: '',
    } as ContactFormType,
    onSubmit: async ({ value: data, formApi: form }) => {
      setPostError(undefined)
      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({ form: formId, data }),
          headers: { 'Content-Type': 'application/json' },
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
        setPostError({ message: 'Something went wrong.' })
      }
    },
  })
}
