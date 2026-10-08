import { Team } from './Component.client'

import type { TeamBlock as TeamBlockType } from '@/payload-types'
import Container from '@/components/Container'

export const TeamBlock = async (teamBlock: TeamBlockType) => {
  return (
    <Container>
      <Team teamBlock={teamBlock} />
    </Container>
  )
}
