import type { FieldHook } from 'payload'
import fs from 'fs'
import { extname } from 'path'
import { formatSlug } from '../slug/formatSlug'

async function storeFileLocally(url: string, fileName: string): Promise<string> {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  const data = Buffer.from(buffer)

  const fileExtension = extname(url).slice(1)
  const filePath = `/tmp/${fileName}.${fileExtension}`

  fs.writeFileSync(filePath, data)

  return filePath
}

const formatFilename = (val: string): string =>
  val
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens (handle multiple spaces)
    .replace(/[^\w-.]+/g, '') // Keep letters, numbers, hyphens, and periods (for extensions)
    .toLowerCase()

export const fetchRandomImage: FieldHook = async ({ value, req, siblingData, data: pageData }) => {
  if (!value && pageData?._status === 'published') {
    const url = `https://api.unsplash.com/photos/random?client_id=${
      process.env.UNSPLASH_ACCESS_KEY
    }&query=${siblingData?.keywords}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      const imageUrl = data.urls.regular
      const altDescription = data.alt_description
      const fileName = data.slug

      const localFilePath = await storeFileLocally(imageUrl, fileName)

      // Read the file buffer
      const fileBuffer = fs.readFileSync(localFilePath)
      const fileExtension: string = imageUrl.split('.').pop() || 'jpeg'
      const mimeType = `image/${fileExtension}`

      // Create the image file object
      const imageFile = {
        data: fileBuffer,
        mimetype: mimeType,
        name: formatFilename(siblingData?.title ?? 'card'),
        size: fileBuffer.length,
      }

      // Upload the image to the media collection
      const image = await req.payload.create({
        collection: 'cards',
        data: {
          alt: altDescription,
        },
        file: imageFile,
        req,
      })

      // Clean up the temporary file
      fs.unlinkSync(localFilePath)

      return image.id
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }
  return value
}
