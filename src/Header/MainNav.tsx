'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/utilities/cn'
import { isActiveRoute } from '@/utilities/isActiveRoute'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { usePathname } from 'next/navigation'
import type { NavItem } from './MobileNav'

export function MainNav({ navItems }: { navItems: NavItem[] }) {
  const currentPathName = usePathname()

  return (
    <div className="flex-1">
      <nav className="justify-around hidden p-8 md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map(({ link }) => (
              <NavigationMenuItem key={link.label}>
                <Link href={link.url ?? ''} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), 'text-lg', {
                      'border-b-2 border-b-brand border-opacity-100 rounded-b-none text-brand':
                        isActiveRoute(currentPathName as string, link.url ?? ''),
                    })}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  )
}
