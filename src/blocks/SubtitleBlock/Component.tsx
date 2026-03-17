import { Subtitle } from '@/components/Hero/HeroMedium'
import type { SubtitleBlock as SubtitleBlockProps } from '@/payload-types'

export const SubtitleBlock = ({ text }: SubtitleBlockProps) => {
  return <Subtitle text={text || ''} className="" />
}
