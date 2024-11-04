import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { baseUrl } from '@/utilities/baseUrl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.NEXT_PUBLIC_IS_LIVE === 'false') {
    return []
  }

  const payload = await getPayload({ config: configPromise })
  const { docs: pages } = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: true,
  })
  const { docs: teamPages } = await payload.find({
    collection: 'team',
    draft: false,
    limit: 1000,
    overrideAccess: true,
  })

  const routes = pages.map((route) => ({
    url: `${baseUrl}${route.slug}`,
    lastModified: route.updatedAt,
  }))
  const teamRoutes = teamPages.map((route) => ({
    url: `${baseUrl}/team/${route.slug}`,
    lastModified: route.updatedAt,
  }))

  return [...routes, ...teamRoutes]
}
