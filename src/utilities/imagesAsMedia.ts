import type { RichTextBlock, Media } from '@/payload-types'

export type SanitizedImage = {
  image: Media
  id: string
}

export const imagesAsMedia = (images: RichTextBlock['images']): Media[] => {
  const isLandscape = (item: any): item is Media => {
    return typeof item === 'object' && item !== null && 'url' in item
  }

  if (Array.isArray(images)) {
    return images.filter(isLandscape)
  }

  return []
}

