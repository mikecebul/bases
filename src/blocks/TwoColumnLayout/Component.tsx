import Container from '@/components/Container'
import { CTALinks } from '@/components/CTALinks'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { Icon } from '@/components/Icons/Icon'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import type { TwoColumnLayoutBlock as TwoColumnLayoutBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { RenderBlocks } from '../RenderBlocks'
import RichTextCarousel from '../RichText/RichTextCarousel'
import { imagesAsMedia } from '@/utilities/imagesAsMedia'
import { HeroSVG } from '@/components/Hero'
import Image from 'next/image'

export const TwoColumnLayoutBlock = ({
  direction = 'ltr',
  breakpoint = 'md',
  columnOne,
  columnTwo,
}: TwoColumnLayoutBlockType) => {
  const {
    contentType: columnOneType,
    cta,
    richText,
    verticalAlignment = 'center',
  } = columnOne ?? {}
  const { hasSubtitle, subtitle, title, heading, description, links } = cta ?? {}
  const {
    contentType: columnTwoType,
    form,
    images,
    priority,
    sticky = false,
    svg = false,
  } = columnTwo ?? {}
  const validImages = imagesAsMedia(images)

  return (
    <Container className="xl:overflow-visible">
      <div
        className={cn('grid grid-cols-1 gap-12', `${breakpoint}:grid-cols-2`, {
          'xl:items-start': sticky,
        })}
      >
        <div
          className={cn('order-1 flex flex-col justify-center gap-4', {
            'justify-center': verticalAlignment === 'center',
            'justify-start': verticalAlignment === 'top',
            'justify-end': verticalAlignment === 'bottom',
            'sm:order-2': direction === 'rtl' && breakpoint === 'sm',
            'md:order-2': direction === 'rtl' && breakpoint === 'md',
            'lg:order-2': direction === 'rtl' && breakpoint === 'lg',
            'xl:order-2': direction === 'rtl' && breakpoint === 'xl',
          })}
        >
          {columnOneType === 'cta' ? (
            <>
              {hasSubtitle && (
                <Badge variant="brand" className="w-fit">
                  <Icon name={subtitle?.icon ?? 'trophy'} className="mr-1 size-4" />
                  {subtitle?.text}
                </Badge>
              )}
              {title && <Title text={title} heading={heading ?? 'h2'} />}
              {description && <Description text={description} />}
              {links && <CTALinks links={links} />}
            </>
          ) : (
            richText && <RichText content={richText} />
          )}
        </div>
        <div
          className={cn('order-2', {
            'flex items-center justify-center': !sticky,
            'sticky xl:top-20 xl:pt-2': sticky,
            relative: svg,
            'sm:order-1': direction === 'rtl' && breakpoint === 'sm',
            'md:order-1': direction === 'rtl' && breakpoint === 'md',
            'lg:order-1': direction === 'rtl' && breakpoint === 'lg',
            'xl:order-1': direction === 'rtl' && breakpoint === 'xl',
          })}
        >
          {columnTwoType === 'form' ? (
            form && <RenderBlocks blocks={form} />
          ) : validImages.length > 1 ? (
            <div className="relative">
              <RichTextCarousel images={validImages} priority={priority ?? false} />
              {svg && <HeroSVG direction={direction} />}
            </div>
          ) : images?.[0] && typeof images[0] === 'object' ? (
            <div className="relative">
              <Image
                className="object-cover w-full max-w-3xl rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
                src={images?.[0]?.url ?? ''}
                alt={images?.[0]?.alt ?? ''}
                width={images?.[0]?.width ?? 960}
                height={images?.[0]?.height ?? 640}
                priority={priority ?? false}
              />
              {svg && <HeroSVG direction={direction} />}
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  )
}
