import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import payloadConfig from '@payload-config'
import type { Hero as HeroType } from '@/payload-types'
import { CMSLink } from '../Link'
import { getPayloadHMR } from '@payloadcms/next/utilities'

type Props = NonNullable<HeroType['highImpact']>

export async function Hero({ title, description, image, links }: Props) {
  const payload = await getPayloadHMR({
    config: payloadConfig,
  })
  const { phone } = await payload.findGlobal({
    slug: 'company-info',
  })
  const cleanedPhone = phone.replace(/\D/g, '')

  return (
    <section className="grid lg:gap-8 lg:grid-cols-12 2xl:px-0 2xl:container pb-16">
      <div className="mr-auto place-self-center lg:col-span-6">
        <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight lg:mb-8 sm:text-4xl xl:text-6xl 2xl:text-7xl">
          {title}
        </h1>
        <p className="max-w-xl mb-4 lg:mb-8 text-muted-foreground text-lg">{description}</p>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 xl:space-x-0">
          {/* Mobile Links */}
          <Link
            href={`tel:${cleanedPhone}`}
            className={cn(
              buttonVariants({ variant: 'brand', size: 'xl' }),
              'xl:hidden min-w-full md:min-w-64',
            )}
          >
            <Icons.phone className="mr-2" />
            Call Now
          </Link>
          {/* Desktop Links */}
          {links != null &&
            links.map(({ link, id }, index) => (
              <CMSLink
                key={id}
                {...link}
                size="xl"
                appearance={index === 0 ? 'brand' : link.appearance}
                className="hidden xl:flex lg:min-w-64"
              />
            ))}
        </div>
      </div>
      <div className="hidden lg:mt-0 lg:col-span-6 lg:flex relative">
        {image != null && typeof image === 'object' && (
          <>
            <Image
              src={image.url ?? 'Woman_Laptop.webp'}
              alt={image.alt ?? 'Woman using telehealth services from home.'}
              className="object-cover w-full rounded-md"
              width={1080}
              height={1980}
              priority
            />
            <SVG />
          </>
        )}
      </div>
    </section>
  )
}

const SVG = () => {
  return (
    <span className="absolute -left-8 -bottom-8 -z-10 text-brand">
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
