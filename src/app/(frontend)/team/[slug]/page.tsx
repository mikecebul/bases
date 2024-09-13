import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { TeamMemberBlock } from '@/blocks/TeamMember/Component'

import type { Metadata } from 'next'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const team = await payload.find({
    collection: 'team',
    draft: false,
    limit: 1000,
    overrideAccess: true,
  })

  return team.docs?.map(({ slug }) => slug)
}

export default async function TeamMember({ params: { slug = '' } }) {
  const url = '/team/' + slug
  const teamMember = await queryTeamMemberBySlug({ slug })

  if (!teamMember) return <PayloadRedirects url={url} />

  return (
    <main className="">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      <TeamMemberBlock teamMember={teamMember} />
    </main>
  )
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const teamMember = await queryTeamMemberBySlug({ slug })

  return generateMeta({ doc: teamMember })
}

const queryTeamMemberBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'team',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
