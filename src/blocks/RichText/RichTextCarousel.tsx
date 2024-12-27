'use client'

import { HeroSVG } from '@/components/Hero'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Media } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import Image from 'next/image'

export default function RichTextCarousel({
  images,
  priority,
}: {
  images: Media[]
  priority?: boolean
}) {
  if (!images?.length) return null

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
        Fade(),
      ]}
    >
      {/* Needs better type checking system */}
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image.id} className="relative">
            <Image
              className="object-cover w-full max-w-3xl rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
              src={image.url ?? ''}
              alt={image.alt ?? ''}
              width={image.width ?? 960}
              height={image.height ?? 640}
              priority={index === 0 ? (priority ?? false) : false}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
