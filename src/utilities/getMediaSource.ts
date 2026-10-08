import type { Media } from '@/payload-types'
import { getMediaUrl } from './getMediaUrl'

export const getMediaSource = (media: Media | string | number | null | undefined) => {
  if (!media || typeof media !== 'object') return null
  return {
    src: getMediaUrl(media.url, media.updatedAt),
    thumbnail: getMediaUrl(media.sizes?.thumbnail?.url, media.updatedAt),
    alt: media.alt || '',
    objectPosition: `${media.focalX ?? 50}% ${media.focalY ?? 50}%`,
  }
}
