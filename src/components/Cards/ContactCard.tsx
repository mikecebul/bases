'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Mail, MapPin, Phone, Clock, Shield } from 'lucide-react'
import { ReactNode } from 'react'

interface ContactCardProps {
  type: 'email' | 'phone' | 'address' | 'hours' | 'form'
  title: string
  description?: string
  value: string
  href?: string
  className?: string
  children?: ReactNode
}

const iconMap = {
  email: Mail,
  phone: Phone,
  address: MapPin,
  hours: Clock,
  form: Shield,
}

const colorMap = {
  email: 'text-blue-600 bg-blue-100',
  phone: 'text-orange-600 bg-orange-100',
  address: 'text-purple-600 bg-purple-100',
  hours: 'text-green-600 bg-green-100',
  form: 'text-green-600 bg-green-100',
}

export const ContactCard = ({ 
  type, 
  title, 
  description, 
  value, 
  href, 
  className = '',
  children 
}: ContactCardProps) => {
  const Icon = iconMap[type]
  const colorClasses = colorMap[type]
  
  const CardWrapper = ({ children: cardChildren }: { children: ReactNode }) => {
    if (href) {
      return (
        <a href={href} className="block group">
          {cardChildren}
        </a>
      )
    }
    return <>{cardChildren}</>
  }

  // Special styling for form type similar to ClickableCard
  if (type === 'form') {
    return (
      <Card className={`group transition-all duration-300 border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 has-[button:hover]:border-blue-200 has-[button:hover]:shadow-lg ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-start mb-4">
            <div className="flex items-center justify-center mr-3 bg-green-100 rounded-full size-10 animate-subtle-pulse transition-transform group-hover:scale-110">
              <Icon className="text-green-600 size-6 animate-subtle-pulse" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-green-700">Secure & HIPAA Compliant</p>
              <p className="text-xs text-green-600">Protected client portal</p>
            </div>
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          {children}
        </CardContent>
      </Card>
    )
  }

  return (
    <CardWrapper>
      <Card className={`group bg-card rounded-xl border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}>
        <CardHeader className="pb-4">
          <span className={`mb-4 flex size-12 flex-col items-center justify-center rounded-full transition-transform group-hover:scale-110 ${colorClasses}`}>
            <Icon className="h-6 w-6" />
          </span>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          {href ? (
            <span className="inline-flex items-center font-semibold text-primary transition-colors hover:underline">
              {value}
            </span>
          ) : (
            <div className="font-medium">{value}</div>
          )}
          {children}
        </CardContent>
      </Card>
    </CardWrapper>
  )
}