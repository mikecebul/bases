import { ArrayBlock } from './fields/Array'
import { Checkbox } from './fields/Checkbox'
import { Country } from './fields/Country'
import { Email } from './fields/Email'
import { Group } from './fields/Group'
import { Message } from './fields/Message'
import { Number } from './fields/Number'
import { Payment } from './fields/Payment'
import { Phone } from './fields/Phone'
import { Select } from './fields/Select'
import { State } from './fields/State'
import { Text } from './fields/Text'
import { Textarea } from './fields/Textarea'

export type FormFields = keyof typeof fields

export const fields = {
  checkbox: Checkbox,
  country: Country,
  email: Email,
  message: Message,
  number: Number,
  // payment: Payment,
  select: Select,
  state: State,
  text: Text,
  textarea: Textarea,
  phone: Phone,
  array: ArrayBlock,
  group: Group,
}
