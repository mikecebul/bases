import Container from '@/components/Container'
import { AboutUsBlock as AboutUsBlockType } from '@/payload-types'
import AboutUsCarousel from './AboutUsCarousel'
import { RichText } from '@/components/RichText'
import { imagesAsMedia } from '@/utilities/imagesAsMedia'

export const AboutUsBlock = ({ images, richContent }: AboutUsBlockType) => {
  const validImages = imagesAsMedia(images)

  return (
    <Container className="xl:overflow-visible">
      <div className="grid grid-cols-1 gap-x-8 xl:container xl:grid-cols-2 xl:items-start xl:px-0">
        <div className="pb-8 xl:sticky xl:top-36 xl:col-start-2 xl:row-start-1 xl:pt-2 xl:pb-0">
          {validImages.length > 0 ? <AboutUsCarousel images={validImages} /> : null}
        </div>
        {richContent && <RichText enableGutter={false} data={richContent} className="lg:text-lg" />}
      </div>
    </Container>
  )
}
