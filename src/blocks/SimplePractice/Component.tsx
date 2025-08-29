import type { SimplePractice as SimplePracticeType, Page } from '@/payload-types'
import { HeroMedium } from '@/components/Hero/HeroMedium'
import Container from '@/components/Container'
import { ClickableCard } from './ClickableCard'

type Props = Extract<Page['layout'][number], SimplePracticeType>

export async function SimplePracticeBlock({
  hasSubtitle,
  subtitle,
  title,
  heading,
  description,
  buttonText,
  buttonDescription,
}: Props) {
  return (
    <Container>
      <HeroMedium
        subtitle={hasSubtitle && subtitle?.text ? subtitle.text : undefined}
        title={title}
        heading={heading}
        description={description}
      />

      <div className="mb-12">
        <ClickableCard buttonText={buttonText} buttonDescription={buttonDescription ?? 'Schedule Consultation'} />
      </div>
    </Container>
  )
}