'use client'

import { useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { cn } from '@/utilities/cn'
import { Icons } from './Icons'

export default function Banner() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div
      id="banner"
      tabIndex={-1}
      className="flex items-center justify-between w-full px-4 py-3 border border-b border-gray-200 bg-gray-50 sm:items-center lg:py-4 xl:hidden"
    >
      <div className="flex flex-col gap-2 sm:items-center sm:flex-row">
        <p className="text-xs text-muted-foreground sm:text-base">Visit us at our new location: </p>
        <a
          className={cn(
            buttonVariants({ variant: 'brand', size: 'sm' }),
            'flex gap-2 items-center text-sm',
          )}
          href="https://goo.gl/maps/X956fmf511Fef9Pr7"
        >
          <Icons.navigation />
          <p>101 M-66 N, Charlevoix, MI 49720</p>
        </a>
      </div>
      <Button
        data-collapse-toggle="banner"
        type="button"
        onClick={() => setIsOpen(false)}
        className="w-6 h-6 p-0 bg-secondary text-primary hover:bg-muted-foreground/20"
      >
        <Icons.closeMenu />
      </Button>
    </div>
  )
}
