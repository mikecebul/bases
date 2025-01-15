import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import type { CompanyInfo, Hero as HeroType } from '@/payload-types'
import { CMSLink } from '../Link'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = NonNullable<HeroType['highImpact']>

export async function Hero({ title, description, image, links, svg }: Props) {
  const { contact, social, hours } = (await getCachedGlobal('company-info', 2)()) as CompanyInfo
  const cleanedPhone = contact?.phone ? contact?.phone.replace(/\D/g, '') : null

  return (
    <section className="grid lg:gap-8 lg:grid-cols-12 2xl:px-0 2xl:container gap-12">
      <div className="flex flex-col mr-auto lg:col-span-6">
        <h1 className="max-w-2xl pb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:pb-8 xl:text-6xl 2xl:text-7xl">
          {title}
        </h1>
        <p className="max-w-xl pb-8 text-lg text-muted-foreground">{description}</p>
        <div className="flex flex-col space-y-4 md:mr-4 xl:flex-row xl:space-x-0 xl:items-start">
          {/* Mobile Links */}
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
          {/* Desktop Links */}
          {links != null &&
            links.map(({ link, id }, index) => (
              <CMSLink
                key={id}
                {...link}
                size="xl"
                appearance={index === 0 ? 'brand' : link.appearance}
                className="hidden rounded-lg xl:flex lg:min-w-64"
              />
            ))}
        </div>
      </div>
      <div className="relative">
        {image != null && typeof image === 'object' && (
          <>
            <Image
              src={image.url ?? '/woman-laptop.webp'}
              alt={image.alt ?? 'Woman using telehealth services from home.'}
              className="object-cover w-full max-w-3xl rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
              width={image.width ?? 0}
              height={image.height ?? 0}
              priority
            />
            <HeroSVG />
          </>
        )}
      </div>
    </section>
  )
}

export const HeroSVG = ({ direction = 'ltr' }: { direction?: 'ltr' | 'rtl' | null }) => {
  return (
    <span
      className={cn('hidden xl:block absolute -z-10 text-brand', {
        '-bottom-9 -left-9': direction === 'ltr' || direction === 'rtl',
        // '-bottom-9 -left-9': direction === 'ltr',
      })}
    >
      <svg
        width="93"
        height="93"
        viewBox="0 0 93 93"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="2.5" cy="2.5" r="2.5" />
        <circle cx="2.5" cy="24.5" r="2.5" />
        <circle cx="2.5" cy="46.5" r="2.5" />
        <circle cx="2.5" cy="68.5" r="2.5" />
        <circle cx="2.5" cy="90.5" r="2.5" />
        <circle cx="24.5" cy="2.5" r="2.5" />
        <circle cx="24.5" cy="24.5" r="2.5" />
        <circle cx="24.5" cy="46.5" r="2.5" />
        <circle cx="24.5" cy="68.5" r="2.5" />
        <circle cx="24.5" cy="90.5" r="2.5" />
        <circle cx="46.5" cy="2.5" r="2.5" />
        <circle cx="46.5" cy="24.5" r="2.5" />
        <circle cx="46.5" cy="46.5" r="2.5" />
        <circle cx="46.5" cy="68.5" r="2.5" />
        <circle cx="46.5" cy="90.5" r="2.5" />
        <circle cx="68.5" cy="2.5" r="2.5" />
        <circle cx="68.5" cy="24.5" r="2.5" />
        <circle cx="68.5" cy="46.5" r="2.5" />
        <circle cx="68.5" cy="68.5" r="2.5" />
        <circle cx="68.5" cy="90.5" r="2.5" />
        <circle cx="90.5" cy="2.5" r="2.5" />
        <circle cx="90.5" cy="24.5" r="2.5" />
        <circle cx="90.5" cy="46.5" r="2.5" />
        <circle cx="90.5" cy="68.5" r="2.5" />
        <circle cx="90.5" cy="90.5" r="2.5" />
      </svg>
    </span>
  )
}
