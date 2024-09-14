import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const { docs: pages } = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: { equals: '/team' },
    },
  })
  return pages
}

export default async function Page() {
  const url = '/team'

  let page: PageType | null

  page = await queryTeamPage()

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = page

  return (
    <main className="">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      <RenderBlocks blocks={layout} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({ doc: 'team' })
}

const queryTeamPage = async () => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: 'team',
      },
    },
  })

  return result.docs?.[0] || null
}
