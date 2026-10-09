'use client'

import { cn } from '@/utilities/cn'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export const MotionStaggeredChild = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: { opacity: reduceMotion ? 1 : 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: reduceMotion ? 0 : 0.4,
          },
        },
      }}
      className={cn('h-full', className)}
    >
      {children}
    </motion.div>
  )
}
