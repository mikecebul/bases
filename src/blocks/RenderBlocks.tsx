import { cn } from 'src/utilities/cn'
import React, { FC, Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroBlock } from '@/blocks/Hero/Component'
import { ServicesBlock } from './Services/Component'
import { CarfBlock } from './Carf/Component'
import DonateBlock from './Donate/Component'
import { TeamBlock } from './Team/Component'
import { TeamMemberBlock } from './TeamMember/Component'
import { AboutUsBlock } from './AboutUs/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  hero: HeroBlock,
  mediaBlock: MediaBlock,
  services: ServicesBlock,
  carf: CarfBlock,
  donate: DonateBlock,
  team: TeamBlock,
  teamMember: TeamMemberBlock,
  aboutUs: AboutUsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
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
