'use client'

import Container from '@/components/Container'
import type { CarfBlock as CarfBlockType } from '@/payload-types'
import { motion } from 'motion/react'
import Image from 'next/image'

export const CarfBlock = ({ subtitle, title, description, image }: CarfBlockType) => {
  return (
    <Container className="py-24 2xl:max-w-[1920px] bg-brand">
      <div className="container grid px-4 mx-auto lg:grid-cols-2 md:px-8 xl:items-center xl:text-center">
        <motion.div
          initial={{ opacity: 0, x: 'var(--x-from)' }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-start max-w-2xl pb-8 lg:pb-0 lg:justify-center [--x-from:40px] sm:[--x-from:-40px]"
        >
          {!!image && typeof image === 'object' && (
            <Image
              alt={image?.alt}
              src={image.url ?? '/placeholder.svg'}
              width={image.width ?? 800}
              height={image.height ?? 800}
              className="w-32 lg:w-48"
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 'var(--y-from)' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col max-w-2xl text-left 2xl:container 2xl:px-0 text-accent/90 [--y-from:40px]"
        >
          <p className="text-base font-semibold leading-7 text-brand-foreground">{subtitle}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h3>
          <p className="mt-6 text-md lg:text-lg lg:leading-8 text-accent/70 text-prose">
            {description}
          </p>
        </motion.div>
      </div>
    </Container>
  )
}
