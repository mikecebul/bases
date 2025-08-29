"use client"

import { ShieldCheckIcon } from 'lucide-react'
import { SimplePracticeContact } from '@/components/SimplePracticeContact'
import { useSimplePractice } from '@/hooks/useSimplePractice'

interface ClickableCardProps {
  buttonText?: string
  buttonDescription?: string
}

export function ClickableCard({ buttonText, buttonDescription }: ClickableCardProps) {
  const { openContactForm } = useSimplePractice()

  return (
    <div 
      className="max-w-md p-8 mx-auto transition-all duration-200 border-2 border-blue-100 cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:border-blue-200 hover:shadow-lg group"
      onClick={openContactForm}
    >
      <div className="flex items-center justify-start mb-4">
        <div className="flex items-center justify-center mr-3 bg-green-100 rounded-full size-10 animate-subtle-pulse">
          <ShieldCheckIcon className="text-green-600 size-6 animate-subtle-pulse" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-green-700">Secure & HIPAA Compliant</p>
          <p className="text-xs text-green-600">Protected client portal</p>
        </div>
      </div>

      <SimplePracticeContact buttonText={buttonText} className="w-full" />

      {buttonDescription && (
        <p className="mt-3 text-sm text-left text-muted-foreground">
          {buttonDescription}
        </p>
      )}
    </div>
  )
}