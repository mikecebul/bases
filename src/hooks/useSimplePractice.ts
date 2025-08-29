"use client"

import { useEffect } from "react"

export function useSimplePractice() {
  useEffect(() => {
    if (!document.querySelector('script[src*="simplepractice.com"]')) {
      const script = document.createElement("script")
      script.src = "https://widget-cdn.simplepractice.com/assets/integration-1.0.js"
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  const openContactForm = () => {
    const link = document.createElement('a')
    link.href = "https://leah-mayotte.clientsecure.me"
    link.setAttribute('data-spwidget-scope-id', 'd2835c56-8608-4653-b0d9-d6f24a6a62e1')
    link.setAttribute('data-spwidget-scope-uri', 'leah-mayotte')
    link.setAttribute('data-spwidget-application-id', '7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b')
    link.setAttribute('data-spwidget-channel', 'embedded_widget')
    link.setAttribute('data-spwidget-type', 'Contact form')
    link.setAttribute('data-spwidget-contact', '')
    link.setAttribute('data-spwidget-scope-global', '')
    link.setAttribute('data-spwidget-autobind', '')
    link.click()
  }

  return { openContactForm }
}