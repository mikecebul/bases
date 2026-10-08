'use client'

import { useState } from 'react'
import { Icons } from '@/components/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Media } from '@/payload-types'
import { getMediaSource } from '@/utilities/getMediaSource'

export function TeamAvatar({
  image,
  name,
}: {
  image: Media | string | null | undefined
  name: string
}) {
  const source = getMediaSource(image)
  // Remount when the media changes so a previous failure does not persist after an edit.
  return <TeamAvatarImage key={`${source?.thumbnail}|${source?.src}`} source={source} name={name} />
}

function TeamAvatarImage({
  source,
  name,
}: {
  source: ReturnType<typeof getMediaSource>
  name: string
}) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false)
  const useThumbnail = Boolean(source?.thumbnail) && !thumbnailFailed
  return (
    <Avatar className="w-16 h-16">
      <AvatarImage
        src={(useThumbnail ? source?.thumbnail : source?.src) || undefined}
        alt={source?.alt || name}
        className="object-cover"
        style={{ objectPosition: useThumbnail ? 'center' : source?.objectPosition }}
        onLoadingStatusChange={(status) => {
          if (status === 'error' && useThumbnail) setThumbnailFailed(true)
        }}
      />
      <AvatarFallback>
        <Icons.user className="size-8" />
      </AvatarFallback>
    </Avatar>
  )
}
