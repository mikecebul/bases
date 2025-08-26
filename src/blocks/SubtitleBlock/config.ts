import type { Block } from 'payload'

export const SubtitleBlock: Block = {
  slug: 'subtitleBlock',
  interfaceName: 'SubtitleBlock',
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Subtitle Text',
      required: true,
    },
  ],
}