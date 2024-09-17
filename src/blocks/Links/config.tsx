import { Block } from 'payload'
import { Hero } from '@/blocks/Hero/config'
import { linkCards } from '@/fields/cards/linkCards'

export const Links: Block = {
  slug: 'linksBlock',
  interfaceName: 'LinksBlock',
  fields: [
    {
      name: 'hero',
      type: 'blocks',
      blocks: [Hero],
      maxRows: 1,
      admin: {
        description: 'Only use Medium Impact Hero.',
      },
    },
    linkCards,
  ],
}
