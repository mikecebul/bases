'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { getMediaSource } from '@/utilities/getMediaSource'

export default function AboutUsCarousel({ images }: { images: Media[] }) {
  if (!images) return null

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
        {images
          .filter((image) => image?.url)
          .map((image, index) => (
            <CarouselItem key={image.id}>
              <Image
                className="object-cover w-full max-w-3xl rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
                src={getMediaSource(image)!.src}
                style={{ objectPosition: getMediaSource(image)!.objectPosition }}
                alt={image.alt || ''}
                width={image.width || 960}
                height={image.height || 640}
                sizes="(min-width: 1280px) 50vw, 100vw"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  )
}
