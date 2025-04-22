import { Icons } from '@/components/Icons'
import FadeInFromLeft from '@/components/framer/FadeInFromLeft'
import FadeInFromRight from '@/components/framer/FadeInFromRight'
import { DonateForm } from './DonateForm'
import type { DonateBlock as DonateBlockType } from '@/payload-types'
import Container from '@/components/Container'
import { Description, Subtitle, Title } from '@/components/Hero/HeroMedium'

const includedFeatures = [
  'Teen & Adult Counseling Scholarship Program',
  'Transportation Assistance Program',
  'Emergency Needs Assistance',
  'Public Awareness and Education Presentations',
]

export default function DonateBlock({ subtitle, title, description, programs }: DonateBlockType) {
  return (
    <Container>
      <div className="gap-16 lg:flex lg:items-end">
        <FadeInFromLeft className="flex flex-col">
          {!!subtitle && <Subtitle text={subtitle} />}
          <div className="flex flex-col gap-4">
            {!!title && <Title text={title} />}
            {!!description && <Description text={description} className="text-pretty" />}
          </div>
          <ul
            role="list"
            className="grid grid-cols-1 gap-4 p-8 mt-8 text-sm leading-6 rounded-lg lg:grid-cols-2 lg:gap-6 bg-accent md:max-w-4xl"
          >
            {!!programs &&
              programs.map(({ id, title }) => (
                <li key={id} className="flex gap-x-3">
                  <Icons.checkCirlce className="flex-none w-5 h-6 text-brand" aria-hidden="true" />
                  <p className="font-semibold">{title}</p>
                </li>
              ))}
          </ul>
        </FadeInFromLeft>
        <FadeInFromRight className="flex justify-center grow">
          <div className="mt-12 lg:mt-0 w-md p-8 mx-auto rounded-lg lg:shrink-0 bg-brand lg:flex lg:flex-col lg:justify-center sm:w-96 lg:max-w-sm">
            <div className="text-accent">
              <p className="pb-6 text-base font-medium">
                Contribute $100 or more to support our vital community services.
              </p>
              <DonateForm />

              <p className="pt-2 text-xs leading-5 text-accent/70">
                Thank you letters sent to all our donors.
              </p>
            </div>
          </div>
        </FadeInFromRight>
      </div>
    </Container>
  )
}
