import { cn } from '@/utilities/cn'
import type { ReactNode } from 'react'

export default function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={cn(
        'animate-fadeIn relative max-w-full flex-1 flex-col overflow-x-clip px-4 2xl:container md:px-8 2xl:px-0 2xl:mx-auto',
        className,
      )}
    >
      {children}
    </section>
  )
}
