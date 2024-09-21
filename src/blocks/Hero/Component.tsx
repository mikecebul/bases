import type { Hero as HeroType, Page } from '@/payload-types'
import { HeroMedium } from '@/components/Hero/HeroMedium'
import { Hero } from '@/components/Hero'
import Container from '@/components/Container'

type Props = Extract<Page['layout'][number], HeroType>

export async function HeroBlock({ type, highImpact, mediumImpact }: Props) {
  return (
    <Container>
      {type === 'highImpact' && !!highImpact ? (
        <Hero {...highImpact} />
      ) : type === 'mediumImpact' && !!mediumImpact ? (
        <HeroMedium {...mediumImpact} />
      ) : null}
    </Container>
  )
}
