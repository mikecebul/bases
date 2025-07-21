import configPromise from '@payload-config'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs: pages } = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  const params = pages
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = `/${slug}`

  let page: RequiredDataFromCollectionSlug<'pages'> | null
  console.log('Page:', slug, 'Draft mode:', draft)

  page = await queryPageBySlug({ slug })

  if (!page && slug === 'home') {
    return (
      <main className="flex flex-col items-center justify-center grow">
        <h1 className="text-4xl font-bold">Hello World</h1>
      </main>
    )
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

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  console.log(`=== Querying ${slug} ===`)
  console.log(`Draft: ${draft}, Override: ${draft}`)

  try {
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: { equals: slug },
      },
    })

    const page = result.docs?.[0] || null

    if (page) {
      console.log(
        `✓ Found ${slug}: status=${page._status}, layout=${page.layout?.length || 0} blocks`,
      )

      // Check each block
      if (page.layout) {
        page.layout.forEach((block, i) => {
          if (!block) {
            console.error(`❌ Block ${i} is null/undefined`)
          } else if (!block.blockType) {
            console.error(`❌ Block ${i} missing blockType:`, Object.keys(block))
          } else {
            console.log(`✓ Block ${i}: ${block.blockType}`)
          }
        })
      }
    } else {
      console.log(`❌ No page found for ${slug}`)
    }

    return page
  } catch (error) {
    console.error(`❌ Error querying ${slug}:`, error)
    throw error
  }
})
