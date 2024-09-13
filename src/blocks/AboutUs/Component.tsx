import Container from '@/components/Container'
import { Subtitle } from '@/components/Hero/HeroMedium'
import { AboutUsBlock as AboutUsBlockType } from '@/payload-types'

export const AboutUsBlock = ({ subtitle }: AboutUsBlockType) => {
  console.log('******* About Us Block Loaded')
  return (
    <Container>
      <Subtitle text={subtitle ?? ''} />
    </Container>
  )
}
