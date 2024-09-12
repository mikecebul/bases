'use client'

import { cn } from '@/utilities/cn'
import * as motion from 'framer-motion/client'

import type { Team } from '@/payload-types'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/components/Icons'

export const TeamPage = ({ staff, board }: { staff: Team[]; board: Team[] }) => {
  const avatarUrlIfExists = (person: Team) => {
    if (typeof person.avatar === 'object' && !!person.avatar.url) return person.avatar.url
  }

  return (
    <div>
      <div
        className={cn('flex flex-col gap-x-20 gap-y-8 xl:flex-row', {
          'xl:flex-row-reverse': false,
        })}
      >
        <motion.div
          initial={{ x: 'var(--x-from)', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn('[--x-from:-30px] sm:[--x-from:-40px] max-w-prose xl:w-5/12 text-pretty', {
            '[--x-from:30px] sm:[--x-from:40px]': false,
          })}
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Meet Our Leadership Team
          </h1>
          <p className="pt-4 text-lg leading-7 text-muted-foreground">
            Our passionate and dedicated leadership team brings a wealth of experience and expertise
            in outpatient care. They lead by example, driven by a shared commitment to excellence
            and a relentless pursuit of positive outcomes for our patients.
          </p>
        </motion.div>
        <ul
          role="list"
          className={cn('grid gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-12 xl:col-span-2 xl:w-7/12')}
        >
          {staff &&
            staff.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ x: 'var(--x-from)', opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={cn('[--x-from:30px] sm:[--translate-x-from:-40] max-w-lg', {
                  '[--x-from:-30px] sm:[--translate-x-from:40]': false,
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
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={avatarUrlIfExists(person)}
                          alt="profile of staff member."
                        />
                        <AvatarFallback>
                          <Icons.user className="size-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-base font-semibold leading-7 tracking-tight">
                          {person.name}
                        </p>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {person.qualifications}
                        </p>
                        <p className="text-sm font-semibold leading-6 text-brand">{person.role}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              </motion.div>
            ))}
        </ul>
      </div>

      <div
        className={cn('flex flex-col gap-x-20 gap-y-8 xl:flex-row', {
          'xl:flex-row-reverse': true,
        })}
      >
        <motion.div
          initial={{ x: 'var(--x-from)', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn('[--x-from:-30px] sm:[--x-from:-40px] max-w-prose xl:w-5/12 text-pretty', {
            '[--x-from:30px] sm:[--x-from:40px]': true,
          })}
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Meet Our Board of Directors
          </h1>
          <p className="pt-4 text-lg leading-7 text-muted-foreground">
            Our Board comprises seasoned professionals committed to guiding our organization&apos;s
            mission. They utilize their diverse experience to strategize and uphold our commitment
            to patient-focused outpatient care. Their unified aim: to drive excellence and positive
            patient outcomes.
          </p>
        </motion.div>
        <ul
          role="list"
          className={cn('grid gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-12 xl:col-span-2 xl:w-7/12')}
        >
          {board &&
            board.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ x: 'var(--x-from)', opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={cn('[--x-from:30px] sm:[--translate-x-from:-40] max-w-lg', {
                  '[--x-from:-30px] sm:[--translate-x-from:40]': false,
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
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={avatarUrlIfExists(person)}
                          alt="profile of staff member."
                        />
                        <AvatarFallback>
                          <Icons.user className="size-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-base font-semibold leading-7 tracking-tight">
                          {person.name}
                        </p>
                        <p className="text-sm font-semibold leading-6 text-brand">{person.role}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              </motion.div>
            ))}
        </ul>
      </div>
    </div>
  )
}
