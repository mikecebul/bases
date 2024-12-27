'use client'

import { CMSLink } from '@/components/Link'
import type { LinkGroup } from '@/payload-types'
import { cn } from '@/utilities/cn'

export const CTALinks = ({
  links,
  justify = 'start',
}: {
  links: LinkGroup
  justify?: 'center' | 'start'
}) => {
  return (
    <div
      className={cn('flex gap-4 flex-wrap w-full pt-4', {
        'md:justify-start': justify === 'start',
        'md:justify-center': justify === 'center',
      })}
    >
      {links != null &&
        links.map(({ link, id }) => (
          <CMSLink
            key={id}
            {...link}
            size="xl"
            appearance={link.appearance === 'default' ? 'brand' : 'brandOutline'}
          />
        ))}
    </div>
  )
}
