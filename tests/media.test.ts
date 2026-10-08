import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import sharp from 'sharp'
import type { Media as MediaDocument } from '../src/payload-types'
import { Media } from '../src/collections/Media'
import { getMediaUrl } from '../src/utilities/getMediaUrl'
import { getMediaSource } from '../src/utilities/getMediaSource'
import { getStorageFileUrl } from '../src/utilities/getStorageFileUrl'
import { generateBlurhash } from '../src/collections/Media/generateBlurhash'
import { generateMeta } from '../src/utilities/generateMeta'
import { baseUrl } from '../src/utilities/baseUrl'
import type { Page } from '../src/payload-types'

test('SEO images use the fallback when populated media has no file URL', async () => {
  const metadata = await generateMeta({
    doc: { meta: { metadata: { image: { url: null, updatedAt: 'new' } } } } as Page,
  })
  assert.deepEqual(metadata.openGraph?.images, [{ url: `${baseUrl}/flowers-sign-meta.webp` }])
})

test('placeholder failures do not reject a media upload', async () => {
  const warnings: unknown[] = []
  const result = await generateBlurhash({
    data: { alt: 'Vector logo', blurhash: 'old-placeholder' },
    operation: 'update',
    req: {
      file: { data: Buffer.from('unsupported image data'), mimetype: 'image/svg+xml' },
      payload: { logger: { warn: (warning: unknown) => warnings.push(warning) } },
    },
  } as unknown as Parameters<typeof generateBlurhash>[0])
  assert.equal(result.alt, 'Vector logo')
  assert.equal(result.blurhash, null)
  assert.equal(warnings.length, 1)
})

test('media URLs preserve queries and fragments while versioning edits', () => {
  assert.equal(getMediaUrl(null, 'new'), '')
  assert.equal(getMediaUrl('/api/media/file/photo.webp', 'new'), '/api/media/file/photo.webp?v=new')
  assert.equal(
    getMediaUrl('https://cdn.example/photo.webp?size=300#preview', 'a b'),
    'https://cdn.example/photo.webp?size=300&v=a%20b#preview',
  )
  assert.equal(
    getMediaUrl('http://localhost:3000/api/media/file/photo.webp', 'new'),
    '/api/media/file/photo.webp?v=new',
  )
  assert.equal(getMediaUrl('https://cdn.example/photo.webp'), 'https://cdn.example/photo.webp')
})

test('missing relationships and thumbnails are safe, and zero focal coordinates survive', () => {
  for (const value of [null, undefined, 'media-id', 123]) assert.equal(getMediaSource(value), null)
  const source = getMediaSource({
    url: '/photo.webp',
    updatedAt: 'new',
    focalX: 0,
    focalY: 0,
  } as MediaDocument)
  assert.equal(source?.src, '/photo.webp?v=new')
  assert.equal(source?.thumbnail, '')
  assert.equal(source?.objectPosition, '0% 0%')
})

test('storage URLs encode filenames and support empty and nested prefixes', () => {
  const previous = process.env.NEXT_PUBLIC_S3_HOSTNAME
  process.env.NEXT_PUBLIC_S3_HOSTNAME = 'cdn.example'
  try {
    assert.equal(
      getStorageFileUrl({ filename: 'photo #1.webp', prefix: '/media/team/' }),
      'https://cdn.example/media/team/photo%20%231.webp',
    )
    assert.equal(getStorageFileUrl({ filename: 'photo.webp' }), 'https://cdn.example/photo.webp')
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_S3_HOSTNAME
    else process.env.NEXT_PUBLIC_S3_HOSTNAME = previous
  }
})

// Exercise Payload's actual resize implementation against our collection config.
// This internal import intentionally makes an incompatible Payload update fail the test.
const payloadDir = dirname(createRequire(import.meta.url).resolve('payload'))
const imageSizesModule = import(
  pathToFileURL(join(payloadDir, 'uploads/image-resizing/createImageSizes.js')).href
)
const cropModule = import(pathToFileURL(join(payloadDir, 'uploads/cropImage.js')).href)

async function resize(data: Buffer, focalPoint = { x: 50, y: 50 }) {
  const { createImageSizes } = await imageSizesModule
  const { width, height } = await sharp(data).metadata()
  const staticPath = await mkdtemp(join(tmpdir(), 'bases-media-test-'))
  try {
    return await createImageSizes({
      config: Media,
      dimensions: { width, height },
      file: { data, mimetype: 'image/png', size: data.length, name: 'portrait.png' },
      focalPoint,
      mimeType: 'image/png',
      req: { payloadUploadSizes: {} },
      savedFilename: 'portrait.webp',
      sharp,
      staticPath,
    })
  } finally {
    await rm(staticPath, { recursive: true, force: true })
  }
}

test('small images still generate a square thumbnail and metadata image with extensions', async () => {
  const data = await sharp({ create: { width: 120, height: 180, channels: 3, background: 'red' } })
    .png()
    .toBuffer()
  const { sizeData } = await resize(data)
  assert.equal(sizeData.thumbnail.width, 300)
  assert.equal(sizeData.thumbnail.height, 300)
  assert.equal(sizeData.thumbnail.filename, 'portrait-thumbnail.webp')
  assert.equal(sizeData.meta.filename, 'portrait-meta.webp')
  assert.ok(sizeData.meta.width <= 120 && sizeData.meta.height <= 180)
})

test('focal-point resizing stays within the selected crop', async () => {
  const { cropImage } = await cropModule
  const data = await sharp({ create: { width: 600, height: 600, channels: 3, background: 'red' } })
    .composite([
      {
        input: await sharp({ create: { width: 200, height: 600, channels: 3, background: 'blue' } })
          .png()
          .toBuffer(),
        left: 200,
        top: 0,
      },
    ])
    .png()
    .toBuffer()
  const cropped = await cropImage({
    cropData: { x: 100 / 3, y: 0 },
    dimensions: { width: 600, height: 600 },
    file: { data, mimetype: 'image/png', size: data.length },
    widthInPixels: 200,
    heightInPixels: 600,
    req: {},
    sharp,
  })
  const { sizesToSave } = await resize(cropped.data, { x: 100, y: 0 })
  const thumbnail = sizesToSave.find((file: { path: string }) =>
    file.path.endsWith('-thumbnail.webp'),
  )
  const { data: pixels, info } = await sharp(thumbnail.buffer)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const middle =
    (Math.floor(info.height / 2) * info.width + Math.floor(info.width / 2)) * info.channels
  assert.ok(
    pixels[middle + 2] > 200 && pixels[middle] < 30,
    'thumbnail must contain the blue crop, not the red excluded area',
  )
})
