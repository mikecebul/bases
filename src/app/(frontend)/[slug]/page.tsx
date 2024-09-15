import type { Metadata } from 'next'

import React, { cache } from 'react'
import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'

import type { Page as PageType } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: true,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => slug)
}

export default async function Page({ params: { slug = 'home' } }) {
  const url = '/' + slug

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  // if (!page) {
  //   page = homeStatic
  // }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = page

  return (
    <main className="">
      <p>Hello WOrld</p>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      <RenderBlocks blocks={layout} />
    </main>
  )
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
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
