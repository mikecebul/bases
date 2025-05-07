'use client'

import { useEffect, useRef } from 'react'

export default function Component() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const updateHeight = () => {
      const iframe = iframeRef.current
      if (iframe && iframe.contentWindow) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px'
      }
    }

    const iframe = iframeRef.current
    if (iframe) {
      iframe.onload = updateHeight
      // Update height periodically in case of dynamic content
      const interval = setInterval(updateHeight, 1000)
      return () => clearInterval(interval)
    }
  }, [])

  return (
    <div className="">
      <iframe
        ref={iframeRef}
        src="https://analytics.mikecebul.dev/share/OiX0b1uO00C1Cgf3/basesmi.org"
        width="100%"
        height="100%"
        style={{ border: 'none', overflow: 'hidden', minHeight: '75dvh' }}
        title="Analytics"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
