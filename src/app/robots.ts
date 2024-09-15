import type { Page } from '@/payload-types'
import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    where: {
      'seo.hideFromSearchEngines': {
        equals: true,
      },
    },
    limit: 1000,
  })

  // Map the slugs of the pages you want to disallow in robots.txt
  const disallowedPages = pages.docs.map((page: Page) => `/${page.slug}`)

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', ...disallowedPages],
    },
    sitemap: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/sitemap.xml`,
  }
}
