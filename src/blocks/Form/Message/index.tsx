import { RichText } from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import type { RichTextContent } from '@/components/RichText'

export const Message = ({ message }: { message: RichTextContent }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  )
}
