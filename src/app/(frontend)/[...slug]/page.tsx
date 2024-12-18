import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { TeamMemberBlock } from '@/blocks/TeamMember/Component'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  // Get regular pages
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: true,
  })

  // Get team members
  const team = await payload.find({
    collection: 'team',
    draft: false,
    limit: 1000,
  })

  const params = [
    // Regular pages (excluding home)
    ...pages.docs?.filter((doc) => doc.slug !== 'home').map(({ slug }) => ({ slug: [slug] })),
    // Team members
    ...team.docs?.map(({ slug }) => ({ slug: ['team', slug] })),
  ]

  return params
}

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = ['home'] } = await paramsPromise
  const url = '/' + slug.join('/')

  let page
  
  // Handle team member pages
  if (slug[0] === 'team' && slug.length === 2) {
    const teamMember = await queryTeamMemberBySlug({ slug: slug[1] })
    if (!teamMember) {
      return <PayloadRedirects url={url} />
    }

    return (
      <main>
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        <TeamMemberBlock teamMember={teamMember} />
      </main>
    )
  }

  // Handle regular pages
  if (slug.length === 1) {
    page = await queryPageBySlug({slug: slug[0]})
  }

  if (!page && slug[0] === 'home') {
    return null
  }

  const { layout } = page

  return (
    <main>
      <PayloadRedirects url={url} />
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={layout} />
    </main>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryTeamMemberBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const { docs: team } = await payload.find({
    collection: 'team',
    draft,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return team?.[0] || null
})

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = ['home'] } = await paramsPromise

  // Handle team member metadata
  if (slug[0] === 'team' && slug.length === 2) {
    const teamMember = await queryTeamMemberBySlug({ slug: slug[1] })
    return generateMeta({ doc: teamMember })
  }

  // Handle regular page metadata
  const page = await queryPageBySlug({ slug: slug[0] })
  return generateMeta({ doc: page })
}
