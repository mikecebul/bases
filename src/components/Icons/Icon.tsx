import { lucideIcons } from '.'
import { Check as DefaultIcon } from 'lucide-react'
import { useMemo } from 'react'
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
  const IconComponent = useMemo(() => findIconComponent(name), [name])
  if (!IconComponent) return
  return <IconComponent className={className} size={size} color={color} />
}

export const IconWithBorder = ({ name = 'Check', className = '', size, color }: IconProps) => {
  const IconComponent = useMemo(() => findIconComponent(name) || DefaultIcon, [name])
  return (
    <IconContainer>
      <IconComponent className={className} size={size} color={color} />
    </IconContainer>
  )
}
