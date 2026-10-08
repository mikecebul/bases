import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { mkdtemp, writeFile, rm, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import sharp from 'sharp'
import { Media } from '../src/collections/Media'

const payloadDir = dirname(createRequire(import.meta.url).resolve('payload'))
const pipelineModule = import(pathToFileURL(join(payloadDir, 'uploads/generateFileData.js')).href)

async function processUpload(buffer: Buffer, edits: Record<string, unknown>, existing = false) {
  const { generateFileData } = await pipelineModule
  const staticDir = await mkdtemp(join(tmpdir(), 'bases-upload-test-'))
  const metadata = await sharp(buffer).metadata()
  const filename = metadata.format === 'jpeg' ? 'portrait.jpg' : 'portrait.png'
  try {
    if (existing) await writeFile(join(staticDir, filename), buffer)
    return await generateFileData({
      collection: {
        config: {
          ...Media,
          upload: { ...(Media.upload as object), staticDir, disableLocalStorage: false },
        },
      },
      config: {},
      data: { alt: 'Portrait' },
      originalDoc: existing
        ? { filename, url: `/api/media/file/${filename}`, focalX: 50, focalY: 50 }
        : undefined,
      operation: existing ? 'update' : 'create',
      overwriteExistingFiles: true,
      req: {
        ...(existing
          ? {}
          : {
              file: {
                data: buffer,
                mimetype: `image/${metadata.format}`,
                name: filename,
                size: buffer.length,
              },
            }),
        query: { uploadEdits: edits },
        payload: {
          config: { sharp, serverURL: 'http://localhost:3000' },
          logger: { error: () => {} },
        },
      },
    })
  } finally {
    await rm(staticDir, { recursive: true, force: true })
  }
}

test('fresh rotated JPEG crops use the browser orientation and save real WebP bytes', async () => {
  const buffer = await sharp({
    create: { width: 300, height: 600, channels: 3, background: 'red' },
  })
    .jpeg()
    .withMetadata({ orientation: 6 })
    .toBuffer()
  const result = await processUpload(buffer, {
    crop: { unit: '%', x: 50, y: 0, width: 50, height: 100 },
    widthInPixels: 300,
    heightInPixels: 300,
    focalPoint: { x: 75, y: 50 },
  })
  assert.equal(result.data.width, 300)
  assert.equal(result.data.height, 300)
  assert.equal(result.data.focalX, 50)
  const saved = result.files.find((file: { path: string }) => file.path.endsWith('/portrait.webp'))
  const metadata = await sharp(saved.buffer).metadata()
  assert.equal(metadata.format, 'webp')
  assert.equal(metadata.orientation, undefined)
  assert.equal(result.data.mimeType, 'image/webp')
  assert.equal(saved.buffer.length, result.data.filesize)
})

test('editing an existing image uses selected percentages even if pixel inputs are stale', async () => {
  const buffer = await sharp({
    create: { width: 600, height: 600, channels: 3, background: 'blue' },
  })
    .png()
    .toBuffer()
  const result = await processUpload(
    buffer,
    {
      crop: { unit: '%', x: 50, y: 0, width: 50, height: 100 },
      widthInPixels: 1000,
      heightInPixels: 1000,
      focalPoint: { x: 75, y: 25 },
    },
    true,
  )
  assert.equal(result.data.width, 300)
  assert.equal(result.data.height, 600)
  assert.equal(result.data.focalX, 50)
  assert.equal(result.data.focalY, 25)
  assert.equal(result.data.sizes.thumbnail.width, 300)
  assert.equal(result.data.sizes.thumbnail.height, 300)
  const saved = result.files.find((file: { path: string }) => file.path.endsWith('/portrait.webp'))
  assert.equal((await sharp(saved.buffer).metadata()).format, 'webp')
})

test('cropped originals still obey the 1600px limit without enlarging small crops', async () => {
  const buffer = await sharp({
    create: { width: 3200, height: 1600, channels: 3, background: 'red' },
  })
    .png()
    .toBuffer()
  const result = await processUpload(buffer, {
    crop: { unit: '%', x: 25, y: 0, width: 75, height: 100 },
    widthInPixels: 2400,
    heightInPixels: 1600,
    focalPoint: { x: 50, y: 50 },
  })
  assert.equal(result.data.width, 1600)
  assert.equal(result.data.height, 1067)
  assert.equal(result.data.focalX, 33)
})

test('uncropped uploads preserve the normal resize and WebP pipeline', async () => {
  const buffer = await sharp({
    create: { width: 100, height: 150, channels: 3, background: 'red' },
  })
    .png()
    .toBuffer()
  const result = await processUpload(buffer, {})
  assert.equal(result.data.width, 100)
  assert.equal(result.data.height, 150)
  assert.equal(result.data.mimeType, 'image/webp')
  assert.equal(result.data.sizes.thumbnail.width, 300)
})

test('the generated admin import map includes Payload CollectionCards', async () => {
  const map = await readFile(
    new URL('../src/app/(payload)/admin/importMap.js', import.meta.url),
    'utf8',
  )
  assert.match(map, /"@payloadcms\/next\/rsc#CollectionCards":/)
})
