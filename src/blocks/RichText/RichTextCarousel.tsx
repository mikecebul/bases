'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Media } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import Image from 'next/image'

export default function RichTextCarousel({ images }: { images: Media[] }) {
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
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <Image
              className="object-cover w-full max-w-3xl rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
              src={image.url ?? ''}
              alt="Image"
              width={960}
              height={640}
              priority
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
