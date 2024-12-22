import { cn } from '@/utilities/cn'
import React from 'react'

import { serializeLexical } from './serialize'
import { RichTextProps } from './types'

const RichText: React.FC<RichTextProps> = ({
  className,
  content,
  enableGutter = false,
  enableProse = true,
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'prose dark:prose-invert ': enableProse,
        },
        className,
      )}
    >
      {typeof content === 'string' ? (
        <p>{content}</p>
      ) : (
        content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })
      )}
    </div>
  )
}

export default RichText
