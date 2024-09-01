'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const navItems = header?.navItems || []
  const { address, phone } = header

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    // <header
    //   className="container relative z-20 py-8 flex justify-between"
    //   {...(theme ? { 'data-theme': theme } : {})}
    // >
    //   <Link href="/">
    //     <Logo />
    //   </Link>
    //   <HeaderNav header={header} />
    // </header>
    <header className="sticky top-0 z-40 flex w-full bg-background/50 backdrop-blur-sm">
      <div className="flex items-center w-full px-4 md:px-8 2xl:px-0 2xl:container">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), 'py-8 px-0')}>
          <Icons.logo className="w-40 md:w-44 lg:w-64" />
        </Link>
        <MainNav navItems={navItems} />
        <MobileNav navItems={navItems} />
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
