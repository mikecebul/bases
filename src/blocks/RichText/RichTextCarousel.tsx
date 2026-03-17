'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Media } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import Image from 'next/image'
import { HeroCornerDots } from '@/components/Hero/HeroCornerDots'
import { cn } from '@/utilities/cn'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export default function RichTextCarousel({
  direction = 'ltr',
  images,
  priority,
  showCornerDots = false,
}: {
  direction?: 'ltr' | 'rtl' | null
  images: Media[]
  priority?: boolean
  showCornerDots?: boolean
}) {
  if (!images?.length) return null

  const plugins =
    images.length > 1
      ? [
          Autoplay({
            delay: 5000,
          }),
          Fade(),
        ]
      : undefined

  return (
    <Carousel plugins={plugins}>
      {/* Needs better type checking system */}
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image.id} className="relative">
            <div
              className={cn('relative w-fit', {
                'xl:pb-10 xl:pr-10': showCornerDots && direction === 'rtl',
                'xl:pb-10 xl:pl-10': showCornerDots && direction !== 'rtl',
              })}
            >
              <Image
                className="relative z-10 object-cover w-full max-w-3xl rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
                src={getMediaUrl(image.url)}
                alt={image.alt ?? ''}
                width={image.width ?? 960}
                height={image.height ?? 640}
                priority={index === 0 ? (priority ?? false) : false}
              />
              {showCornerDots ? (
                <HeroCornerDots
                  direction={direction}
                  className={
                    direction === 'rtl'
                      ? 'right-0 bottom-0 z-0 translate-x-0 translate-y-0'
                      : 'left-0 bottom-0 z-0 translate-x-0 translate-y-0'
                  }
                />
              ) : null}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
