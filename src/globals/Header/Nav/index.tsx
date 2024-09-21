'use client'

import { CMSLink } from '@/components/Link'
import { NavItem } from '../MobileNav'

export const HeaderNav = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}
