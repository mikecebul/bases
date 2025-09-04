"use client"

import { cn } from "@/utilities/cn"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { useSimplePracticeWidget } from "@/hooks/useSimplePracticeWidget"

interface SimplePracticeContactProps {
  buttonText?: string
  className?: string
  variant?: 'inline' | ButtonProps['variant']
  card?: boolean
}

export function SimplePracticeContact({ buttonText = "Contact", className = "", variant, card }: SimplePracticeContactProps) {
  const { openWidget } = useSimplePracticeWidget({
    scopeId: "d2835c56-8608-4653-b0d9-d6f24a6a62e1",
    scopeUri: "leah-mayotte",
    applicationId: "7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b",
    channel: "embedded_widget",
    type: "Contact form"
  })

  const isInline = variant === 'inline'

  return (
    <div className={cn('text-center', className)}>
      <button
        onClick={openWidget}
        className={cn(
          isInline ? 'inline-block px-3 py-1.5 text-[#1371C8] bg-white border border-[#1371C8] rounded font-semibold text-sm hover:text-[#0F5AA0] active:text-white/75 active:shadow-[0_1px_3px_rgba(0,0,0,0.15)_inset]'
            : buttonVariants({ variant: variant as ButtonProps['variant'], size: "xl" }),
          isInline ? '' : "w-full",
          { 'group': card },
        )}
      >
        {buttonText}
      </button>
    </div>
  )
}