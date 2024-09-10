import { Icons } from '@/components/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import type { TeamBlock as TeamBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import payloadConfig from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Team } from './Component.client'

export const TeamBlock = async (teamBlock: TeamBlockType) => {
  const payload = await getPayloadHMR({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'team',
    depth: 1,
    limit: 100,
    where: {
      type: { equals: teamBlock.type },
    },
  })

  return <Team teamBlock={teamBlock} team={docs} />
}
