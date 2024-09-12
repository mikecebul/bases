import type { Metadata } from 'next/types'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import Container from '@/components/Container'
import { TeamPage } from './page.client'
import payloadConfig from '@payload-config'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayloadHMR({ config: payloadConfig })
  const { docs: staff } = await payload.find({
    collection: 'team',
    depth: 1,
    limit: 100,
    where: {
      type: { equals: 'staff' },
    },
  })
  const { docs: board } = await payload.find({
    collection: 'team',
    depth: 1,
    limit: 100,
    where: {
      type: { equals: 'board' },
    },
  })

  return (
    <Container>
      <TeamPage staff={staff} board={board} />
    </Container>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
