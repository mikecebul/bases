'use server'

import { getPayload, PayloadRequest } from 'payload'
import configPromise from '@payload-config'
import { siteConfig } from '@/config'
import { formatSlug } from '@/fields/slug/formatSlug'
import { $convertFromMarkdownString } from '@lexical/markdown'
import {
  defaultEditorConfig,
  defaultEditorFeatures,
  getEnabledNodes,
  sanitizeServerEditorConfig,
} from '@payloadcms/richtext-lexical'
import { createHeadlessEditor } from '@lexical/headless'
import { Team } from '@/payload-types'
import { commitTransaction, initTransaction } from 'payload'
import fs from 'fs'
import path from 'path'
import { headers } from 'next/headers'

export const seedTeam = async (prevState: any, formData: FormData) => {
  const headersList = await headers()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({
    headers: headersList,
  })

  if (!user) {
    throw new Error('You must be logged in to seed team members')
  }

  // Add authorization check
  if (user.role !== 'superAdmin') {
    throw new Error('Only super admins can seed team members')
  }
  const transactionReq = { payload } as PayloadRequest
  try {
    await initTransaction(transactionReq)
    payload.logger.info('Seeding database...')

    // Clear media directories
    const publicDir = path.join(process.cwd(), 'public')
    const directories = ['avatars', 'portraits']

    directories.forEach((dir) => {
      const dirPath = path.join(publicDir, dir)
      if (fs.existsSync(dirPath)) {
        payload.logger.info(`Removing ${dir} directory at ${dirPath}`)
        fs.rmdirSync(dirPath, { recursive: true })
      }
    })

    // Setup editor config
    const payloadConfig = await configPromise
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

    // Create team members
    for (const person of siteConfig.team) {
      try {
        const filename = `${formatSlug(person.name)}-profile`
        const mediaDir = path.join(process.cwd(), 'public', 'media')

        // Check for existing files with the same filename pattern
        if (fs.existsSync(mediaDir)) {
          const files = fs.readdirSync(mediaDir)
          const existingFile = files.find((file) => file.startsWith(filename))
          if (existingFile) {
            const filePath = path.join(mediaDir, existingFile)
            payload.logger.info(`Removing existing file: ${filePath}`)
            fs.unlinkSync(filePath)
          }
        }

        const imagePath = path.join(process.cwd(), 'public', person.imageUrl)

        const image = await payload.create({
          collection: 'media',
          data: {
            alt: `${person.name} profile`,
            filename: filename,
          },
          filePath: imagePath,
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
            publishedAt: new Date().toJSON(),
            _status: 'published',
          },
        })
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        payload.logger.error(message)
        throw error
      }
    }

    await commitTransaction(transactionReq)
    payload.logger.info('Seeded team members successfully!')
    return { message: 'Team seeded successfully!' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return { message: `Error: ${message}` }
  }
}
