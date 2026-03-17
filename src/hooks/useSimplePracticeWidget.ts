"use client"

import { useCallback, useRef } from "react"

interface SimplePracticeWidgetOptions {
  scopeId: string
  scopeUri: string
  applicationId: string
  channel?: string
  type?: string
}

export function useSimplePracticeWidget(options: SimplePracticeWidgetOptions) {
  const openWidget = useCallback(async (e?: React.MouseEvent) => {
    e?.preventDefault()

    try {
      // Wait for widget objects to be available
      while (!(window as any).SPWidget && !(window as any).spWidgetAutoBind) {
        await new Promise(resolve => setTimeout(resolve, 50))
      }

      // Create a temporary anchor element that SimplePractice can hijack
      const tempAnchor = document.createElement('a')
      tempAnchor.href = `https://${options.scopeUri}.clientsecure.me`
      tempAnchor.setAttribute('data-spwidget-scope-id', options.scopeId)
      tempAnchor.setAttribute('data-spwidget-scope-uri', options.scopeUri)
      tempAnchor.setAttribute('data-spwidget-application-id', options.applicationId)
      tempAnchor.setAttribute('data-spwidget-channel', options.channel || 'embedded_widget')
      tempAnchor.setAttribute('data-spwidget-type', options.type || 'Contact form')
      tempAnchor.setAttribute('data-spwidget-contact', 'true')
      tempAnchor.setAttribute('data-spwidget-scope-global', 'true')
      tempAnchor.setAttribute('data-spwidget-autobind', 'true')
      tempAnchor.style.display = 'none'

      // Add to DOM temporarily
      document.body.appendChild(tempAnchor)

      // Trigger autobind to ensure it's bound
      if ((window as any).spWidgetAutoBind) {
        (window as any).spWidgetAutoBind()
      }

      // Create a proper click event
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })

      tempAnchor.dispatchEvent(clickEvent)

      // Clean up after a delay
      setTimeout(() => {
        if (tempAnchor.parentNode) {
          document.body.removeChild(tempAnchor)
        }
      }, 1000)

    } catch (error) {
      // Fallback to href navigation
      window.open(`https://${options.scopeUri}.clientsecure.me`, '_blank')
    }
  }, [options])

  return { openWidget }
}