import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import Container from '@/components/Container'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const team = await payload.find({
    collection: 'team',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return team.docs?.map(({ slug }) => slug)
}

export default async function TeamMember({ params: { slug = '' } }) {
  const url = '/team/' + slug
  const teamMember = await queryTeamMemberBySlug({ slug })

  if (!teamMember) return <PayloadRedirects url={url} />

  return (
    <Container>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={teamMember.bio}
            enableGutter={false}
          />
        </div>
      </div>
    </Container>
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
