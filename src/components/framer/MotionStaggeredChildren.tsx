'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export const MotionStaggerChildren = ({ children }: { children: ReactNode }) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: reduceMotion ? 1 : 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.25,
            ...(reduceMotion ? { duration: 0 } : {}),
          },
        },
      }}
      className="pt-16"
    >
      {children}
    </motion.section>
  )
}
