import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const URL = process.env.NEXT_PUBLIC_DOMAIN_URL
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
    url: `${URL}${route.slug}`,
    lastModified: route.updatedAt,
  }))
  const teamRoutes = teamPages.map((route) => ({
    url: `${URL}/team/${route.slug}`,
    lastModified: route.updatedAt,
  }))

  return [...routes, ...teamRoutes]
}
