import Container from '@/components/Container'
import { Subtitle } from '@/components/Hero/HeroMedium'
import { AboutUsBlock as AboutUsBlockType } from '@/payload-types'
import { imagesAsLandscapes } from '@/utilities/imagesAsLandscapes'
import AboutUsCarousel from './AboutUsCarousel'
import RichText from '@/components/RichText'

export const AboutUsBlock = ({ subtitle, images, richContent }: AboutUsBlockType) => {
  const validImages = imagesAsLandscapes(images)

  return (
    <Container className="xl:overflow-visible">
      <div className="grid grid-cols-1 gap-x-8 xl:container xl:grid-cols-2 xl:items-start xl:px-0">
        <div className="xl:sticky xl:top-20 xl:col-start-2 xl:row-start-1 xl:pt-2 pb-8 xl:pb-0">
          {validImages.length > 0 ? <AboutUsCarousel images={validImages} /> : null}
        </div>
        <div>
          <Subtitle text={subtitle ?? ''} />
          {richContent && <RichText content={richContent} />}
        </div>
      </div>
    </Container>
  )
}
