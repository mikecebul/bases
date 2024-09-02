'use client'

import { cn } from '@/utilities/cn'
import { isActiveRoute } from '@/utilities/isActiveRoute'
import { usePathname } from 'next/navigation'
import type { NavItem } from './MobileNav'
import { CMSLink } from '@/components/Link'

export function MainNav({ navItems }: { navItems: NavItem[] }) {
  const currentPathName = usePathname()

  return (
    <div className="flex-1">
      <div className=" justify-center hidden px-8 gap-8 md:flex">
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
              appearance="text"
              className={cn('text-lg', {
                'border-b-2 border-b-brand border-opacity-100 rounded-b-none text-brand':
                  isActiveRoute(currentPathName as string, slug),
              })}
            />
          )
        })}
      </div>
    </div>
  )
}
