import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HeroBlock } from '@/blocks/Hero/Component'
import { ServicesBlock } from './Services/Component'
import { CarfBlock } from './Carf/Component'
import DonateBlock from './Donate/Component'
import { TeamBlock } from './Team/Component'
import { TeamMemberBlock } from './TeamMember/Component'
import { AboutUsBlock } from './AboutUs/Component'
import { LinksBlock } from './Links/Component'
import { FormBlockRouter } from './Form/Component'
import { RichTextBlock } from './RichText/Component'
import { TwoColumnLayoutBlock } from './TwoColumnLayout/Component'
import { cn } from '@/utilities/cn'
// import { MediaBlock } from './MediaBlock/Component'

const blockComponents = {
  hero: HeroBlock,
  richText: RichTextBlock,
  services: ServicesBlock,
  carf: CarfBlock,
  donate: DonateBlock,
  team: TeamBlock,
  teamMember: TeamMemberBlock,
  aboutUs: AboutUsBlock,
  linksBlock: LinksBlock,
  formBlock: FormBlockRouter,
  twoColumnLayout: TwoColumnLayoutBlock,
  // mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][number][]
  nested?: boolean
}> = (props) => {
  const { blocks, nested = false } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return nested ? (
                <Block key={index} {...(block as any)} nested={nested} />
              ) : (
                <div
                  key={index}
                  className={cn(blockType === 'carf' ? 'py-0 last:pb-12' : 'py-24 last:pb-36')}
                >
                  <Block {...(block as any)} nested={nested} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
