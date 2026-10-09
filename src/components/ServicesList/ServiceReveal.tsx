'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const serviceVariants: Variants = {
  hidden: (reduceMotion: boolean | null) => ({ opacity: reduceMotion ? 1 : 0 }),
  visible: (reduceMotion: boolean | null) => {
    // Resolve the entrance direction when the cascade starts, rather than
    // changing the initial transform during hydration.
    const slide =
      !reduceMotion &&
      typeof window !== 'undefined' &&
      !window.matchMedia('(min-width: 64rem)').matches

    return {
      opacity: 1,
      x: slide ? [30, 0] : 0,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            opacity: { duration: 0.4, ease: 'easeOut' },
            x: { type: 'spring', stiffness: 180, damping: 26 },
          },
    }
  },
}

export function ServicesReveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.dl
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 'some' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.15 } },
      }}
      className="grid max-w-xl grid-cols-1 gap-y-10 md:mx-auto lg:max-w-none lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16 xl:grid-cols-3"
    >
      {children}
    </motion.dl>
  )
}

export function ServiceReveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      custom={reduceMotion}
      variants={serviceVariants}
      className="relative pl-16 text-left"
    >
      {children}
    </motion.div>
  )
}
