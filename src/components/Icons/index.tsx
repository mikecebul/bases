import Image from 'next/image'
import {
  Menu,
  X,
  ArrowRight,
  Glasses,
  FlaskConical,
  Users,
  Tally4,
  WineOff,
  Car,
  Phone,
  Navigation,
  Printer,
  Mail,
  Pencil,
  SprayCan,
  Brain,
  CircleOff,
  Facebook,
  CheckCircle,
  UserPlus,
  User,
  UserX,
  Check,
  ChevronsUpDown,
  LucideIcon,
  PlusCircle,
  Baby,
  PersonStanding,
  Clock,
} from 'lucide-react'
import { ReactNode } from 'react'
import { cn } from '@/utilities/cn'

export const Icons = {
  logo: ({ className }: { className: string }) => (
    <Image
      src="/bases-logo.png"
      width={1024}
      height={252}
      className={className}
      alt="BASES Logo"
      priority
    />
  ),
  carf: ({ className }: { className: string }) => (
    <Image
      src="/CARF_GoldSeal.png"
      width={500}
      height={500}
      className={className}
      alt="CARF Certification"
    />
  ),
  openMenu: Menu,
  closeMenu: X,
  arrowRight: ArrowRight,
  glasses: Glasses,
  flask: FlaskConical,
  group: Users,
  jail: Tally4,
  class: WineOff,
  car: Car,
  phone: Phone,
  navigation: Navigation,
  print: Printer,
  mail: Mail,
  pencil: Pencil,
  spray: SprayCan,
  brain: Brain,
  zero: CircleOff,
  facebook: Facebook,
  checkCirlce: CheckCircle,
  adduser: UserPlus,
  user: User,
  delete: UserX,
  check: Check,
  chevronsUpDown: ChevronsUpDown,
  plusCircle: PlusCircle,
  baby: Baby,
  kid: PersonStanding,
  clock: Clock,
}

export type LucideIconsType = (typeof lucideIcons)[number]

export const lucideIcons = [
  { component: Menu, label: 'Menu', value: 'Menu' },
  { component: X, label: 'Close', value: 'X' },
  { component: ArrowRight, label: 'Arrow Right', value: 'ArrowRight' },
  { component: Glasses, label: 'Glasses', value: 'Glasses' },
  { component: FlaskConical, label: 'Flask', value: 'FlaskConical' },
  { component: Users, label: 'Group', value: 'Users' },
  { component: Tally4, label: 'Jail', value: 'Tally4' },
  { component: WineOff, label: 'Wine Off', value: 'WineOff' },
  { component: Car, label: 'Car', value: 'Car' },
  { component: Phone, label: 'Phone', value: 'Phone' },
  { component: Navigation, label: 'Navigation', value: 'Navigation' },
  { component: Printer, label: 'Printer', value: 'Printer' },
  { component: Mail, label: 'Mail', value: 'Mail' },
  { component: Pencil, label: 'Pencil', value: 'Pencil' },
  { component: SprayCan, label: 'Spray Can', value: 'SprayCan' },
  { component: Brain, label: 'Brain', value: 'Brain' },
  { component: CircleOff, label: 'Zero', value: 'CircleOff' },
  { component: Facebook, label: 'Facebook', value: 'Facebook' },
  { component: CheckCircle, label: 'Check Circle', value: 'CheckCircle' },
  { component: UserPlus, label: 'Add User', value: 'UserPlus' },
  { component: User, label: 'User', value: 'User' },
  { component: UserX, label: 'Delete User', value: 'UserX' },
  { component: Check, label: 'Check', value: 'Check' },
  { component: ChevronsUpDown, label: 'Up Down', value: 'ChevronsUpDown' },
  { component: PlusCircle, label: 'Plus Circle', value: 'PlusCircle' },
]

export const iconMapping = lucideIcons.reduce<Record<string, LucideIcon>>((acc, icon) => {
  acc[icon.value] = icon.component
  return acc
}, {})

export const renderIcon = (iconValue: string, small?: 'small', component?: string): ReactNode => {
  const IconComponent = component ?? iconMapping[iconValue]
  const iconSize = small ? 'w-4 h-4' : 'w-6 h-6' // Adjust the icon size
  const containerSize = small ? 'w-6 h-6' : 'w-10 h-10' // Adjust the container size

  if (!IconComponent) {
    return (
      <div className={`flex items-center justify-center ${containerSize} rounded-lg bg-brand`}>
        <User className={`${iconSize} text-white`} aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center ${containerSize} rounded-lg bg-brand`}>
      <IconComponent className={`${iconSize} text-white`} aria-hidden="true" />
    </div>
  )
}

export const lucideIconArray = [
  Menu,
  X,
  ArrowRight,
  Glasses,
  FlaskConical,
  Users,
  Tally4,
  WineOff,
  Car,
  Phone,
  Navigation,
  Printer,
  Mail,
  Pencil,
  SprayCan,
  Brain,
  CircleOff,
  Facebook,
  CheckCircle,
  UserPlus,
  User,
  UserX,
  Check,
  ChevronsUpDown,
  PlusCircle,
  Baby,
  PersonStanding,
  Clock,
]
export type LuicideIconArray = typeof lucideIconArray
