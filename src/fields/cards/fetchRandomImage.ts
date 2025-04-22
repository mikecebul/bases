import type { FieldHook } from 'payload'
import fs from 'fs'

const formatFilename = (val: string): string =>
  val
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens (handle multiple spaces)
    .replace(/[^\w-.]+/g, '') // Keep letters, numbers, hyphens, and periods (for extensions)
    .toLowerCase()

export const fetchRandomImage: FieldHook = async ({ value, req, siblingData, data: pageData }) => {
  if (!value && pageData?._status === 'published' && siblingData.linkType === 'link') {
    const url = `https://api.unsplash.com/photos/random?client_id=${
      process.env.UNSPLASH_ACCESS_KEY
    }&query=${siblingData?.keywords}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      const imageUrl = data.urls.regular
      const altDescription = data.alt_description

      // Fetch the actual image
      const imageResponse = await fetch(imageUrl)
      const arrayBuffer = await imageResponse.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Create the image file object
      const imageFile = {
        data: buffer,
        mimetype: 'image/jpeg',
        name: formatFilename(siblingData?.title ?? 'card') + '.jpg',
        size: buffer.length,
      }

      // Upload the image to the media collection
      const image = await req.payload.create({
        collection: 'media',
        data: {
          alt: altDescription,
          filename: imageFile.name,
          mimeType: imageFile.mimetype,
        },
        file: imageFile,
        req,
      })

      return image.id
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }
  return value
}
