'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icons } from '../../components/Icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'
import { isActiveRoute } from '@/utilities/isActiveRoute'
import { Header, CompanyInfo } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'

export type NavItem = NonNullable<Header['navItems']>[number]

export function MobileNav({ navItems, contact }: { navItems: NavItem[], contact: CompanyInfo['contact'] }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const currentPathName = usePathname()

  // Prevent hydration mismatch by only showing active state after mount
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const cleanedPhone = contact?.phone ? contact.phone.replace(/\D/g, '') : null

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
          <SheetTitle>
            <p className="sr-only">BASES mobile navigation</p>
          </SheetTitle>
          <div className="flex justify-center mt-16">
            <Icons.logo className="w-40" />
          </div>
          <ScrollArea className="my-4 h-[calc(100vh-12rem)] pb-4">
            <div className="flex flex-col items-center justify-center gap-10 py-2">
              <nav className="flex flex-col items-center justify-center flex-1 space-y-4">
                {navItems.map(({ link }, i) => {
                  const slug =
                    typeof link.reference?.value === 'object'
                      ? link.reference?.relationTo === 'pages' &&
                        typeof link.reference.value.slug === 'string'
                        ? link.reference.value.slug
                        : link.reference?.relationTo === 'media' &&
                          typeof link.reference.value.url === 'string'
                          ? link.reference.value.url
                          : ''
                      : ''
                      
                  const appearance = link.appearance === 'primary' ? 'default' : 'nav'
                  const isPrimary = link.appearance === 'primary'
                      
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance={appearance}
                      className={cn('text-lg', {
                        'border-b-2 border-b-brand border-opacity-100 rounded-br-lg rounded-bl-lg text-brand':
                          !isPrimary && mounted && isActiveRoute(currentPathName as string, slug),
                        'bg-brand hover:bg-brand/90 text-white':
                          isPrimary,
                      })}
                      onClick={() => {
                        setOpen(false)
                      }}
                    />
                  )
                })}
              </nav>
            </div>
          </ScrollArea>
          
          {/* Fixed Footer with Call and Directions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
            <div className="flex flex-col space-y-2">
              <Link
                href={cleanedPhone ? `tel:${cleanedPhone}` : '#'}
                className={cn(
                  buttonVariants({ variant: 'brand', size: 'default' }),
                  'w-full justify-center'
                )}
                onClick={() => setOpen(false)}
              >
                <Icons.phone className="mr-2 size-4" />
                Call Now
              </Link>
              <Link
                href={contact?.physicalAddress?.googleMapLink ?? '#'}
                className={cn(
                  buttonVariants({ variant: 'brandOutline', size: 'default' }),
                  'w-full justify-center'
                )}
                onClick={() => setOpen(false)}
              >
                <Icons.navigation className="mr-2 size-4" />
                Get Directions
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
