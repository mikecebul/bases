import { lucideIcons } from '.'
import { Check as DefaultIcon } from 'lucide-react'
import { createElement } from 'react'
import type { LucideIconsType } from '.'
import { IconContainer } from './IconContainer'

type IconName = LucideIconsType['value']
type IconProps = {
  name: IconName
  className?: string
  size?: number
  color?: string
}

const findIconComponent = (name: IconName) =>
  lucideIcons.find((icon: LucideIconsType) => icon.value === name)?.component

export const Icon = ({ name, className = '', size, color }: IconProps) => {
  const IconComponent = findIconComponent(name)
  if (!IconComponent) return
  return createElement(IconComponent, { className, size, color })
}

export const IconWithBorder = ({ name = 'Check', className = '', size, color }: IconProps) => {
  const IconComponent = findIconComponent(name) || DefaultIcon
  return (
    <IconContainer>
      {createElement(IconComponent, { className, size, color })}
    </IconContainer>
  )
}
