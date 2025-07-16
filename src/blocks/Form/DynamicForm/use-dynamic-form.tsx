'use client'

import { Form } from '@/payload-types'
import { useDynamicFormOpts } from './use-dynamic-form-opts'
import { useAppForm } from '../hooks/form'
import { Dispatch, SetStateAction } from 'react'
import { PostError } from '../Component'

type Props = {
  payloadForm: Form | string
  setPostError: Dispatch<SetStateAction<PostError | undefined>>
}

export const useDynamicForm = ({ payloadForm, setPostError }: Props) => {
  const { defaultValues, onSubmit } = useDynamicFormOpts({
    payloadForm,
    setPostError,
  })
  const form = useAppForm({
    defaultValues,
    onSubmit,
  })
  return { form, defaultValues }
}

export type DynamicFormType = ReturnType<typeof useDynamicForm>['form']
