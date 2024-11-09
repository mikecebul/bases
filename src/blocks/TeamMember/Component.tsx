'use client'

import Container from '@/components/Container'
import * as motion from 'framer-motion/client'
import type { Media, Team } from '@/payload-types'
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'

export const TeamMemberBlock = ({ teamMember }: { teamMember: Team }) => {
  console.log(teamMember.image)
  const imagePortraitUrlIfExists = (image: Media) => {
    if (typeof image.sizes?.portrait?.url === 'string') return image.sizes.portrait.url
    if (typeof image.url === 'string') return image.url
    return '/placeholder.svg'
  }
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
              src={imagePortraitUrlIfExists(teamMember.image)}
              alt={teamMember.image.alt}
              width={800}
              height={1000}
              className="object-top mx-auto mt-0 rounded-lg w-3/5 sm:w-2/5 lg:w-4/5 xl:w-3/5"
            />
          )}
        </div>
        <div>
          <CardHeader className="px-0">
            <CardTitle>
              {teamMember.name}
              {' - '}
              {teamMember.memberType === 'staff' && <span>{teamMember.qualifications}</span>}
            </CardTitle>
            <p className="text-brand font-medium">{teamMember.role}</p>
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
