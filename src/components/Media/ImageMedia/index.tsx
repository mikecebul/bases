'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/cn'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaSource } from '@/utilities/getMediaSource'

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
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''
  let blurhash: string | undefined
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
    blurhash = blurhasFromResource || undefined

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
        placeholder={blurhash ? 'blur' : 'empty'}
        blurDataURL={blurhash}
        priority={priority}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  )
}
