'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/cn'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaSource } from '@/utilities/getMediaSource'

// Older CMS uploads may lack a generated blur. Keep their placeholder embedded
// so it is visible before hydration without another image request.
const placeholderBlurFallback = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#d1d5db"/><stop offset="1" stop-color="#9ca3af"/></linearGradient></defs><rect width="8" height="8" fill="url(#g)"/></svg>',
)}`

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    blurhash: blurFromProps,
    onLoad,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''
  let blurhash = blurFromProps || srcFromProps?.blurDataURL || placeholderBlurFallback
  let objectPosition: string | undefined

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      blurhash: blurhasFromResource,
      height: fullHeight,
      width: fullWidth,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromProps ?? altFromResource ?? ''
    blurhash = blurFromProps || blurhasFromResource || placeholderBlurFallback

    const source = getMediaSource(resource)
    src = source?.src || ''
    objectPosition = source?.objectPosition
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps || '100vw'

  if (!src) return null

  return (
    <picture className={cn(pictureClassName)}>
      <NextImage
        alt={alt || ''}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        style={{ objectPosition }}
        placeholder="blur"
        blurDataURL={blurhash}
        priority={priority}
        loading={loading}
        onLoad={onLoad}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  )
}
