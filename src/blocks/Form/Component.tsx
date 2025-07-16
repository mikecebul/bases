import { FormBlock } from '@/payload-types'
import { ContactForm } from './ContactForm'
import { DynamicForm } from './DynamicForm'
import Container from '@/components/Container'

export type PostError = {
  message: string
  status?: string
}

export const FormBlockRouter = (props: FormBlock & { nested?: boolean }) => {
  const { form, nested } = props
  const { formType } = typeof form !== 'string' ? form : {}

  if (formType === 'dynamic') {
    if (nested) return <DynamicForm {...props} />
    return (
      <Container>
        <DynamicForm {...props} />
      </Container>
    )
  }

  if (typeof form === 'object' && formType === 'static') {
    if (nested) return <ContactForm {...props} />
    return (
      <Container>
        <ContactForm {...props} />
      </Container>
    )
  }
}
