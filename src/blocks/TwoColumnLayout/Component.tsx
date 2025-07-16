import Container from '@/components/Container'
import { CTALinks } from '@/components/CTALinks'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { Icon } from '@/components/Icons/Icon'
import { Badge } from '@/components/ui/badge'
import type { CompanyInfo, TwoColumnLayoutBlock as TwoColumnLayoutBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { RichText } from '@/components/RichText'
import { RenderBlocks } from '../RenderBlocks'
import RichTextCarousel from '../RichText/RichTextCarousel'
import { imagesAsMedia } from '@/utilities/imagesAsMedia'
import { HeroSVG } from '@/components/Hero'
import Image from 'next/image'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { Media } from '@/components/Media'

export const TwoColumnLayoutBlock = async ({
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
  const { hasSubtitle, subtitle, title, heading, description, links, mobileHeroLinks } = cta ?? {}
  const {
    contentType: columnTwoType,
    form,
    images,
    priority,
    sticky = false,
    svg = false,
  } = columnTwo ?? {}
  const validImages = imagesAsMedia(images)

  const companyInfo = (await getCachedGlobal('company-info')()) as CompanyInfo
  const { contact } = companyInfo
  const cleanedPhone = contact?.phone ? contact.phone.replace(/\D/g, '') : null

  return (
    <Container className="xl:overflow-visible">
      <div
        className={cn('grid grid-cols-1 gap-12', `${breakpoint}:grid-cols-2`, {
          'xl:items-start': sticky,
        })}
      >
        <div
          className={cn('order-1 flex flex-col justify-center gap-4 lg:gap-6 ', {
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
              {links && (
                <CTALinks links={links} className={mobileHeroLinks ? 'hidden lg:flex' : ''} />
              )}
              {/* Mobile Links */}
              {mobileHeroLinks ? (
                <div className="flex flex-col space-y-4 md:mr-4 lg:hidden">
                  <Link
                    href={cleanedPhone ? `tel:${cleanedPhone}` : '#'}
                    className={cn(
                      buttonVariants({ variant: 'brand', size: 'xl' }),
                      'xl:hidden min-w-full lg:min-w-64',
                    )}
                  >
                    <Icons.phone className="mr-2" />
                    Call Now
                  </Link>
                  <Link
                    href={contact?.physicalAddress.googleMapLink ?? '#'}
                    className={cn(
                      buttonVariants({ variant: 'brandOutline', size: 'xl' }),
                      'xl:hidden min-w-full lg:min-w-64',
                    )}
                  >
                    <Icons.navigation className="mr-2" />
                    Directions to our Building
                  </Link>
                </div>
              ) : null}
            </>
          ) : (
            richText && <RichText data={richText} className="lg:text-lg" />
          )}
        </div>
        <div
          className={cn('order-2', {
            'flex flex-col items-center justify-center': !sticky,
            'sticky xl:top-20 xl:pt-2': sticky,
            relative: svg,
            'sm:order-1': direction === 'rtl' && breakpoint === 'sm',
            'md:order-1': direction === 'rtl' && breakpoint === 'md',
            'lg:order-1': direction === 'rtl' && breakpoint === 'lg',
            'xl:order-1': direction === 'rtl' && breakpoint === 'xl',
          })}
        >
          {columnTwoType === 'form' ? (
            form && <RenderBlocks blocks={form} nested />
          ) : validImages.length > 1 ? (
            <div className="relative">
              <RichTextCarousel images={validImages} priority={priority ?? false} />
              {svg && <HeroSVG direction={direction} />}
            </div>
          ) : images?.[0] && typeof images[0] === 'object' ? (
            <div className="relative">
              <Media
                className="relative"
                imgClassName="rounded-lg shadow-lg ring-1 ring-gray-400/10"
                resource={validImages[0] ?? '/women-laptop.webp'}
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
