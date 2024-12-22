import { Button as PayloadButton } from '@payloadcms/ui'
import { getPayload, type ServerComponentProps } from 'payload'
import configPromise from '@payload-config'
import { siteConfig } from '@/config'
import { revalidatePath } from 'next/cache'

async function handleSeed(): Promise<void> {
  'use server'
  try {
    const payload = await getPayload({ config: configPromise })
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
    await Promise.all(createServicesPromises)
    revalidatePath('/(payload)/admin/collections/services', 'page')
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error')
  }
}

export const Button = async ({ payload }: ServerComponentProps) => {
  const { totalDocs } = await payload.find({
    collection: 'services',
    depth: 0,
    limit: 0,
  })

  if (totalDocs > 0) return null

  return (
    <form action={handleSeed}>
      <PayloadButton buttonStyle="secondary" className="w-52" type="submit">
        Seed Services
      </PayloadButton>
    </form>
  )
}
