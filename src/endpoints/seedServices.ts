import type { PayloadHandler } from 'payload'
import { siteConfig } from '@/config'
import { revalidatePath } from 'next/cache'

export const seedServices: PayloadHandler = async (req): Promise<Response> => {
  const { payload, user } = req

  if (user?.role !== 'superAdmin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const createServicesPromises = siteConfig.Services.map(
      async (service) =>
        await payload.create({
          collection: 'services',
          data: {
            title: service.name,
            desc: service.description,
            icon: service.icon,
          },
        }),
    )

    Promise.all(createServicesPromises)
    revalidatePath('/(payload)/admin/collections/services', 'page')

    return Response.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}
