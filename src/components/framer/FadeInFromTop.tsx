'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export default function FadeInFromTop({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: reduceMotion ? 0 : 0.6 }}
    >
      {children}
    </motion.div>
  )
}
