'use client'

import Container from '@/components/Container'
import { motion } from 'motion/react'
import type { Media, Team } from '@/payload-types'
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Title } from '@/components/Hero/HeroMedium'

export const TeamMemberBlock = ({ teamMember }: { teamMember: Team }) => {
  return (
    <Container className="lg:overflow-visible">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 gap-x-8 lg:grid-cols-2 lg:items-start"
      >
        <div className="lg:sticky lg:top-20 lg:col-start-2 lg:row-start-1 pb-8 lg:pb-0">
          {typeof teamMember.image === 'object' && (
            <Image
              src={teamMember.image.url ?? '/placeholder.svg'}
              alt={teamMember.image.alt ?? 'Team Member Profile'}
              width={teamMember.image.width ?? 800}
              height={teamMember.image.height ?? 1000}
              className="object-top mx-auto mt-0 rounded-lg w-3/5 sm:w-2/5 lg:w-4/5 xl:w-3/5"
            />
          )}
        </div>
        <div>
          <CardHeader className="px-0">
            <Title text={teamMember.name} heading="h1" />
            <div className="pt-0 xl:pt-2">
              {teamMember.memberType === 'staff' && (
                <p className="text-muted-foreground font-medium text-sm xl:text-lg">{teamMember.qualifications}</p>
              )}
              <p className="text-brand font-medium text-sm xl:text-lg">{teamMember.role}</p>
            </div>
          </CardHeader>
          <CardContent className="grid px-0 pt-4 sm:gap-16">
            <RichText content={teamMember.bio} />
          </CardContent>
        </div>
        <CardFooter className="flex justify-between p-0">
          <Link href="/team" className={cn(buttonVariants({ variant: 'outline' }))}>
            Back
          </Link>
        </CardFooter>
      </motion.div>
    </Container>
  )
}
