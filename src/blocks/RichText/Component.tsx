import Container from '@/components/Container'
import { Subtitle } from '@/components/Hero/HeroMedium'
import { RichTextBlock as RichTextBlockType } from '@/payload-types'
import { imagesAsMedia } from '@/utilities/imagesAsMedia'
import RichTextCarousel from './RichTextCarousel'
import { RichText } from '@/components/RichText'

export const RichTextBlock = ({ subtitle, images, richContent }: RichTextBlockType) => {
  const validImages = imagesAsMedia(images)

  return (
    <Container className="xl:overflow-visible">
      <div className="grid grid-cols-1 gap-x-8 xl:container xl:grid-cols-2 xl:items-start xl:px-0">
        <div className="pb-8 xl:sticky xl:top-20 xl:col-start-2 xl:row-start-1 xl:pt-2 xl:pb-0">
          {validImages.length > 0 ? <RichTextCarousel images={validImages} /> : null}
        </div>
        <div>
          <Subtitle text={subtitle ?? ''} />
          {richContent && <RichText data={richContent} className="lg:text-lg" />}
        </div>
      </div>
    </Container>
  )
}
