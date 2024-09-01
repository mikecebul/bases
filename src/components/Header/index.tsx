import Link from 'next/link'
import { Icons } from '../Icons'
import { MobileNav } from './MobileNav'
import { buttonVariants } from '../ui/button'
import { cn } from '@/utilities/cn'
import { MainNav } from './MainNav'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

export async function Header() {
  const payload = await getPayload({
    config: payloadConfig,
  })
  const { address, phone } = await payload.findGlobal({
    slug: 'company-info',
  })

  return (
    <header className="sticky top-0 z-40 flex w-full bg-background/50 backdrop-blur-sm">
      <div className="flex items-center w-full px-4 md:px-8 2xl:px-0 2xl:container">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), 'py-8 px-0')}>
          <Icons.logo className="w-40 md:w-44 lg:w-64" />
        </Link>
        <MainNav />
        <MobileNav />
        <div className="flex flex-col items-center xl:flex-row 2xl:space-x-2">
          <div
            className={cn(
              buttonVariants({ variant: 'text' }),
              'text-lg text-brand hidden xl:inline-flex',
            )}
          >
            <Icons.phone className="mr-2" size={20} />
            {phone}
          </div>
          <Link
            href="https://goo.gl/maps/X956fmf511Fef9Pr7"
            className={cn(buttonVariants({ variant: 'outline' }), 'hidden xl:inline-flex')}
          >
            <Icons.navigation className="mr-2" size={20} />
            {address}
          </Link>
        </div>
      </div>
    </header>
  )
}
