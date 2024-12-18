'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

export default function FadeInFromRight({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 75 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
