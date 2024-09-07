'use client'
import Link from 'next/link'

import type { Header } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'

export const HeaderClient = ({ header }: { header: Header }) => {
  const navItems = header?.navItems || []
  const { address, phone } = header

  return (
    <header className="sticky top-0 z-40 flex w-full bg-background/50 backdrop-blur-sm py-2">
      <div className="flex items-center w-full px-4 md:px-8 2xl:px-0 2xl:container">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'nav', size: 'clear' }), 'py-0 px-0')}
        >
          <Icons.logo className="w-40 md:w-44 lg:w-64" />
        </Link>
        <MainNav navItems={navItems} />
        <MobileNav navItems={navItems} />
        <div className="flex flex-col items-center xl:flex-row 2xl:space-x-2 text-lg">
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
            <Icons.navigation className="mr-2 text-lg" size={20} />
            {address}
          </Link>
        </div>
      </div>
    </header>
  )
}
