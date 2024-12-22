export type RichTextContent = {
  root: {
    children: any[]
  }
}

export type RichTextProps = {
  content: RichTextContent | string
  className?: string
  enableGutter?: boolean
  enableProse?: boolean
}
