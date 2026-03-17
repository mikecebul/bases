import configPromise from '@payload-config'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { TeamMemberBlock } from '@/blocks/TeamMember/Component'
import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs: team } = await payload.find({
    collection: 'team',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return team?.map(({ slug }) => ({ slug })) || []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function TeamMemberPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = `/team/${slug}`

  const teamMember = await queryTeamMemberBySlug({ slug })
  if (!teamMember) {
    return <PayloadRedirects url={url} />
  }

  return (
    <main className="pt-24 pb-36">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <TeamMemberBlock teamMember={teamMember} />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise

  if (!slug) {
    return {
      title: 'Team',
      description: 'Meet our team',
    }
  }

  const teamMember = await queryTeamMemberBySlug({ slug })
  return generateMeta({ doc: teamMember })
}

const queryTeamMemberBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'team',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs[0] || null
})
