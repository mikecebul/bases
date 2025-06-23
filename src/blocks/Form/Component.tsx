import { FormBlock } from '@/payload-types'
import { ContactForm } from './ContactForm'
import { DynamicForm } from './DynamicForm'

export type PostError = {
  message: string
  status?: string
}

export const FormBlockRouter = (props: FormBlock) => {
  const { form } = props
  const { formType } = typeof form !== 'string' ? form : {}

  if (formType === 'dynamic') {
    return <DynamicForm {...props} />
  }

  if (typeof form === 'object' && formType === 'static') {
    return <ContactForm {...props} />
  }
}
