import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { Team } from './Component.client'

import type { TeamBlock as TeamBlockType } from '@/payload-types'
import Container from '@/components/Container'

export const TeamBlock = async (teamBlock: TeamBlockType) => {
  const payload = await getPayload({ config: payloadConfig })

  return (
    <Container>
      <Team teamBlock={teamBlock} />
    </Container>
  )
}
