import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { baseUrl } from '@/utilities/baseUrl'

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (process.env.NEXT_PUBLIC_IS_LIVE === 'false') {
    return {
      rules: {
        userAgent: '*',
        disallow: ['/'],
      },
    }
  }

  const payload = await getPayload({ config: configPromise })
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      'meta.hideFromSearchEngines': {
        equals: true,
      },
    },
    limit: 1000,
  })
  const { docs: teamMembers } = await payload.find({
    collection: 'team',
    where: {
      'meta.hideFromSearchEngines': {
        equals: true,
      },
    },
    limit: 1000,
  })

  // Map the slugs of the pages you want to disallow in robots.txt
  const disallowedPages = pages.map((page) => `/${page.slug}`)
  const disallowedTeamPages = teamMembers.map((page) => `/team/${page.slug}`)

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', ...disallowedPages, ...disallowedTeamPages],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
