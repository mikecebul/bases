'use client'

import * as motion from 'framer-motion/client'
import type { ReactNode } from 'react'

export default function FadeInFromTop({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
