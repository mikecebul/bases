'use client'

import { cn } from '@/utilities/cn'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export const MotionStaggeredChild = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.4,
          },
        },
      }}
      className={cn('h-full', className)}
    >
      {children}
    </motion.div>
  )
}
