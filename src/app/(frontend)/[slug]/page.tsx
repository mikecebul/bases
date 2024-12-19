import configPromise from '@payload-config'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import { getPayload } from 'payload'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: true,
  })

  return pages.docs
    ?.filter((doc) => doc.slug !== 'home')
    .map(({ slug }) => ({ slug }))
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  })

  return pages?.[0] || null
})

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = `/${slug}`

  const page = await queryPageBySlug({ slug })

  if (!page && slug === 'home') {
    return null
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  return (
    <main>
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({ slug })
  return generateMeta({ doc: page })
} 