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
      <div className="justify-center hidden gap-8 px-8 md:flex md:flex-wrap">
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
              className={cn('', {
                'border-b-2 border-b-brand border-opacity-100 rounded-br-lg rounded-bl-lg text-brand':
                  !isPrimary && isActiveRoute(currentPathName as string, slug),
                'bg-brand hover:bg-brand/90 text-white':
                  isPrimary,
              })}
            />
          )
        })}
      </div>
    </div>
  )
}
