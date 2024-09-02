import type { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex-1 flex-col max-w-full overflow-hidden xl:overflow-visible animate-fadeIn px-4 2xl:container md:px-8 2xl:px-0">
      {children}
    </section>
  )
}
