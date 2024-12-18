'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

export const MotionStaggerChildren = ({ children }: { children: ReactNode }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.25,
          },
        },
      }}
      className="pt-16"
    >
      {children}
    </motion.section>
  )
}
