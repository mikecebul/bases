'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { cn } from '@/utilities/cn'

import { TeamAvatar } from './TeamAvatar'
import { buttonVariants } from '@/components/ui/button'

import type { TeamBlock as TeamBlockType } from '@/payload-types'

export const Team = ({
  teamBlock: { title, description, memberType, teamMembers, reverse },
}: {
  teamBlock: TeamBlockType
}) => {
  return (
    <div
      className={cn('flex flex-col gap-x-20 gap-y-8 xl:flex-row', {
        'xl:flex-row-reverse': reverse,
      })}
    >
      <motion.div
        initial={{ x: 'var(--x-from)', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn('[--x-from:-30px] sm:[--x-from:-40px] max-w-prose xl:w-5/12 text-pretty', {
          '[--x-from:30px] sm:[--x-from:40px]': reverse,
        })}
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="pt-4 text-lg leading-7 text-muted-foreground">{description}</p>
      </motion.div>
      <ul
        role="list"
        className={cn('grid gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-12 xl:col-span-2 xl:w-7/12')}
      >
        {teamMembers &&
          Array.isArray(teamMembers) &&
          teamMembers.map((person, index) => {
            if (person && typeof person === 'object')
              return (
                <motion.div
                  key={person.id}
                  initial={{ x: 'var(--x-from)', opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={cn('[--x-from:30px] sm:[--translate-x-from:-40] max-w-lg', {
                    '[--x-from:-30px] sm:[--translate-x-from:40]': reverse,
                  })}
                >
                  <Link
                    href={`/team/${person.slug}`}
                    className={cn(
                      buttonVariants({ variant: 'card' }),
                      'px-2 w-full justify-start py-4 h-24 max-sm:hover:bg-brand/10',
                    )}
                  >
                    <li>
                      <div className="flex items-center gap-x-6">
                        <TeamAvatar image={person.image} name={person.name} />
                        <div>
                          <p className="text-base font-semibold leading-7 tracking-tight">
                            {person.name}
                          </p>
                          {memberType === 'staff' && (
                            <p className="text-sm leading-6 text-muted-foreground">
                              {person.qualifications}
                            </p>
                          )}
                          <p className="text-sm font-semibold leading-6 text-brand">
                            {person.role}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Link>
                </motion.div>
              )
          })}
      </ul>
    </div>
  )
}
