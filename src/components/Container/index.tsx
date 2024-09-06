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
        'relative flex-1 flex-col max-w-full overflow-hidden xl:overflow-visible animate-fadeIn px-4 2xl:container md:px-8 2xl:px-0 py-16',
        className,
      )}
    >
      {children}
    </section>
  )
}
