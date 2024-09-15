import React, { FC, Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HeroBlock } from '@/blocks/Hero/Component'
import { ServicesBlock } from './Services/Component'
import { CarfBlock } from './Carf/Component'
import DonateBlock from './Donate/Component'
import { TeamBlock } from './Team/Component'
import { TeamMemberBlock } from './TeamMember/Component'
import { AboutUsBlock } from './AboutUs/Component'
import { LinksBlock } from './Links/Component'

const blockComponents = {
  hero: HeroBlock,
  services: ServicesBlock,
  carf: CarfBlock,
  donate: DonateBlock,
  team: TeamBlock,
  teamMember: TeamMemberBlock,
  aboutUs: AboutUsBlock,
  linksBlock: LinksBlock,
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
                  <Block {...(block as any)} />
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
