import type { Payload, PayloadHandler, PayloadRequest } from 'payload'
import { siteConfig } from '@/config'
import { revalidatePath } from 'next/cache'
import { formatSlug } from '@/fields/slug/formatSlug'
import importedPayloadConfig from '@payload-config'
import { $convertFromMarkdownString } from '@lexical/markdown'
import {
  defaultEditorConfig,
  defaultEditorFeatures,
  getEnabledNodes,
  sanitizeServerEditorConfig,
} from '@payloadcms/richtext-lexical'
import { createHeadlessEditor } from '@lexical/headless'
import { Team } from '@/payload-types'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const seedTeamScript = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Clearing media...`)
  const avatarDir = path.resolve(dirname, '../../../public/avatars')
  if (fs.existsSync(avatarDir)) {
    payload.logger.info(`Removing avatars directory at ${avatarDir}`)
    fs.rmdirSync(avatarDir, { recursive: true })
  } else {
    payload.logger.warn(`Avatars directory does not exist at ${avatarDir}`)
  }

  const portraitDir = path.resolve(dirname, '../../../public/portraits')
  if (fs.existsSync(portraitDir)) {
    payload.logger.info(`Removing portraits directory at ${portraitDir}`)
    fs.rmdirSync(portraitDir, { recursive: true })
  } else {
    payload.logger.warn(`Portraits directory does not exist at ${portraitDir}`)
  }

  const payloadConfig = await importedPayloadConfig

  const yourEditorConfig = {
    ...defaultEditorConfig,
    features: [...defaultEditorFeatures],
  }

  const yourSanitizedEditorConfig = await sanitizeServerEditorConfig(
    yourEditorConfig,
    payloadConfig,
  )

  const headlessEditor = createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: yourSanitizedEditorConfig,
    }),
  })

  const teamMembers = siteConfig.team
  for (const person of teamMembers) {
    try {
      const imagePath = path.join(process.cwd(), 'public', person.imageUrl)

      const image = await req.payload.create({
        collection: 'portraits',
        data: {
          alt: `${person.name} profile`,
          filename: `${formatSlug(person.name)}-profile`,
        },
        filePath: imagePath,
        req,
      })

      const avatar = await req.payload.create({
        collection: 'avatars',
        data: {
          alt: `${person.name} avatar`,
          filename: `${formatSlug(person.name)}-avatar`,
        },
        filePath: imagePath,
        req,
      })

      headlessEditor.update(
        () => {
          $convertFromMarkdownString(
            person.bio,
            yourSanitizedEditorConfig.features.markdownTransformers,
          )
        },
        { discrete: true },
      )

      const editorJSON = headlessEditor.getEditorState().toJSON()

      await payload.create({
        collection: 'team',
        data: {
          memberType: person.memberType as Team['memberType'],
          name: person.name,
          role: person.role,
          qualifications: person.qualifications ?? undefined,
          image: image.id,
          bio: editorJSON as Team['bio'],
          slug: String(formatSlug(person.name)),
          avatar: avatar.id,
          publishedAt: new Date().toJSON(),
        },
      })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      payload.logger.error(message)
    }
  }
  revalidatePath('/(payload)/admin/collections/team', 'page')
  payload.logger.info('Seeded team members successfully!')
}
