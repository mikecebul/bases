'use client'

import { motion } from 'motion/react'
import { IconWithBorder } from '@/components/Icons/Icon'
import { Service } from '@/payload-types'

export function ServicesList({ services }: { services: Service[] }) {
  return (
    <>
      {/* Mobile View */}
      <dl className="grid max-w-xl grid-cols-1 lg:hidden gap-y-10 md:mx-auto">
        {services?.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{
              delay: index * 0.05,
              duration: 0.4,
            }}
            className="relative pl-16 text-left"
          >
            <dt className="text-base font-semibold leading-7 text-primary text-left">
              <div className="absolute top-0 left-0">
                <IconWithBorder name={service.icon ?? 'Check'} color="white" />
              </div>
              {service.title}
            </dt>
            <dd className="mt-2 text-base leading-7 text-muted-foreground">{service.desc}</dd>
          </motion.div>
        ))}
      </dl>
      {/* Desktop View */}
      <motion.dl
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 'some' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="hidden lg:grid gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 xl:grid-cols-3"
      >
        {services?.map((service) => (
          <motion.div
            key={service.id}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="relative pl-16 text-left"
          >
            <dt className="text-base font-semibold leading-7 text-primary">
              <div className="absolute top-0 left-0">
                <IconWithBorder name={service.icon ?? 'Check'} color="white" />
              </div>
              {service.title}
            </dt>
            <dd className="mt-2 text-base leading-7 text-muted-foreground">{service.desc}</dd>
          </motion.div>
        ))}
      </motion.dl>
    </>
  )
}
