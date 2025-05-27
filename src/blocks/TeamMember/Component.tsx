import Container from '@/components/Container'
import * as motion from 'motion/react-client'
import type { Team } from '@/payload-types'
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { RichText } from '@/components/RichText'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Title } from '@/components/Hero/HeroMedium'
import { Media } from '@/components/Media'

export const TeamMemberBlock = ({ teamMember }: { teamMember: Team }) => {
  return (
    <Container className="lg:overflow-visible">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 gap-x-8 lg:grid-cols-2 lg:items-start"
      >
        {typeof teamMember.image === 'object' && (
          <Media
            alt={teamMember.image.alt ?? 'Team Member Profile'}
            className="pb-8 lg:sticky lg:top-28 lg:col-start-2 lg:row-start-1 lg:pb-0"
            imgClassName="object-top w-3/5 mx-auto mt-0 rounded-lg sm:w-2/5 lg:w-4/5 xl:w-3/5"
            resource={teamMember.image}
          />
        )}
        <div>
          <CardHeader className="px-0 pt-0 space-y-0">
            <Title text={teamMember.name} heading="h1" />
            <div className="pt-2">
              {teamMember.memberType === 'staff' && (
                <p className="text-sm font-medium text-muted-foreground xl:text-lg">
                  {teamMember.qualifications}
                </p>
              )}
              <p className="text-sm font-medium text-brand xl:text-lg">{teamMember.role}</p>
            </div>
          </CardHeader>
          <CardContent className="grid px-0 pt-4 sm:gap-16">
            <RichText data={teamMember.bio} className="lg:text-lg" />
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
