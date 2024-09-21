import { getPayloadHMR } from '@payloadcms/next/utilities'
import payloadConfig from '@payload-config'
import { Team } from './Component.client'

import type { TeamBlock as TeamBlockType } from '@/payload-types'
import Container from '@/components/Container'

export const TeamBlock = async (teamBlock: TeamBlockType) => {
  const payload = await getPayloadHMR({ config: payloadConfig })

  return (
    <Container>
      <Team teamBlock={teamBlock} />
    </Container>
  )
}
