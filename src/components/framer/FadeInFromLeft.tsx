'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export default function FadeInFromLeft({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -75 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: reduceMotion ? 0 : 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
