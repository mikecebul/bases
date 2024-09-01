import React from 'react'
import type { ReactNode } from 'react'

export function IconContainer({ children }: { children: ReactNode }) {
  return (
    <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-brand`}>
      {children}
    </div>
  )
}
