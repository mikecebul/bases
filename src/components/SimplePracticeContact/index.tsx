"use client"

import { useEffect } from "react"
import { cn } from "@/utilities/cn"
import { buttonVariants } from "@/components/ui/button"

interface SimplePracticeContactProps {
  buttonText?: string
  className?: string
}

export function SimplePracticeContact({ buttonText = "Contact", className = "" }: SimplePracticeContactProps) {
  useEffect(() => {
    if (!document.querySelector('script[src*="simplepractice.com"]')) {
      const script = document.createElement("script")
      script.src = "https://widget-cdn.simplepractice.com/assets/integration-1.0.js"
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className={cn('text-left', className)}>
      <a
        href="https://leah-mayotte.clientsecure.me"
        className={cn(buttonVariants({ variant: "brand", size: "xl" }), "w-full")}
        data-spwidget-scope-id="d2835c56-8608-4653-b0d9-d6f24a6a62e1"
        data-spwidget-scope-uri="leah-mayotte"
        data-spwidget-application-id="7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b"
        data-spwidget-channel="embedded_widget"
        data-spwidget-type="Contact form"
        data-spwidget-contact
        data-spwidget-scope-global
        data-spwidget-autobind
      >
        {buttonText}
      </a>
    </div>
  )
}