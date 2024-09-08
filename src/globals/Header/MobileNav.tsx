'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Icons } from '../../components/Icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'
import { isActiveRoute } from '@/utilities/isActiveRoute'
import { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export type NavItem = NonNullable<Header['navItems']>[number]

export function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const currentPathName = usePathname()

  return (
    <div className="md:hidden flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="w-8 h-8 p-0 bg-secondary text-primary hover:bg-muted-foreground/20"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Icons.closeMenu className="h-8 w-8" />
            ) : (
              <Icons.openMenu className="h-8 w-8" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 sm:w-1/2">
          <div className="flex justify-center mt-16">
            <Icons.logo className="w-40" />
          </div>
          <ScrollArea className="my-4 h-[calc(100vh-9rem)] pb-10">
            <div className="flex flex-col items-center justify-center gap-10 py-2">
              <nav className="flex flex-col items-center justify-center flex-1 space-y-4">
                {navItems.map(({ link }, i) => {
                  const slug =
                    typeof link.reference?.value === 'object' &&
                    typeof link.reference.value.slug === 'string'
                      ? link.reference.value.slug
                      : ''
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance="nav"
                      className={cn('text-lg', {
                        'border-b-2 border-b-brand border-opacity-100 rounded-br-lg rounded-bl-lg text-brand':
                          isActiveRoute(currentPathName as string, slug),
                      })}
                      onClick={() => {
                        setOpen(false)
                      }}
                    />
                  )
                })}
              </nav>
              <div className="absolute bottom-0 right-0"></div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
