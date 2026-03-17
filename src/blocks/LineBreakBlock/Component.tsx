import { cn } from '@/utilities/cn'
import type { LineBreakBlock as LineBreakBlockProps } from '@/payload-types'

const sizeMap = {
  small: 'h-4',
  medium: 'h-6',
  large: 'h-12',
  xl: 'h-16',
}

export const LineBreakBlock = ({ size = 'medium' }: LineBreakBlockProps) => {
  return <div className={cn(sizeMap[size || 'medium'])} />
}
