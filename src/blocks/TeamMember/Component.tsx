'use client'

import Container from '@/components/Container'
import * as motion from 'framer-motion/client'
import type { Team } from '@/payload-types'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'

export const TeamMemberBlock = ({ teamMember }: { teamMember: Team }) => {
  return (
    <Container>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <CardHeader className="px-0">
          <CardTitle>{teamMember.name}</CardTitle>
          {teamMember.memberType === 'staff' && (
            <p className="font-medium">{teamMember.qualifications}</p>
          )}
          <p className="text-brand font-medium">{teamMember.role}</p>
        </CardHeader>
        <CardContent className="grid px-0 sm:grid-cols-2 sm:gap-16 md:px-0 2xl:px-0">
          <RichText content={teamMember.bio} className="pt-4" />
          {typeof teamMember.image === 'object' && typeof teamMember.image.url === 'string' && (
            <Image
              src={teamMember.image.url}
              alt={teamMember.image.alt}
              width={1000}
              height={1000}
              className="order-first object-top mx-auto mt-0 rounded-lg sm:w-full md:w-4/5 lg:w-3/5 sm:mt-6 sm:order-last"
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between px-4 md:px-8 2xl:px-0">
          <Link href="/team" className={cn(buttonVariants({ variant: 'outline' }))}>
            Back
          </Link>
        </CardFooter>
      </motion.div>
    </Container>
  )
}
