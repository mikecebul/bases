import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { TeamMemberBlock } from '@/blocks/TeamMember/Component'
import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })

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
    overrideAccess: false,
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
  const { slug = ['home'] } = await paramsPromise
  const url = '/' + slug.join('/')

  // Handle team member pages
  if (slug[0] === 'team' && slug.length === 2) {
    const teamMember = await queryTeamMemberBySlug({ slug: slug[1] })
    if (!teamMember) {
      return <PayloadRedirects url={url} />
    }

    return (
      <main>
        <PayloadRedirects disableNotFound url={url} />
        <TeamMemberBlock teamMember={teamMember} />
      </main>
    )
  }

  // Handle regular pages
  const page = await queryPageBySlug({
    slug: slug[0],
  })

  if (!page && slug[0] === 'home') {
    return null
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  return (
    <main>
      <PayloadRedirects disableNotFound url={url} />
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
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

  const payload = await getPayloadHMR({ config: configPromise })

  const { docs: team } = await payload.find({
    collection: 'team',
    draft,
    limit: 1,
    overrideAccess: draft,
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
