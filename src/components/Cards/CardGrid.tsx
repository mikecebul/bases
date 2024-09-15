import type { ReactNode } from 'react'

export const CardGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid max-w-xl grid-cols-1 mx-auto lg:max-w-3xl gap-x-8 gap-y-10 xl:max-w-6xl lg:grid-cols-2 lg:gap-16 xl:grid-cols-3 xl:gap-8">
      {children}
    </div>
  )
}
