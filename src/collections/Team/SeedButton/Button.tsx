'use client'

import React, { useState, useCallback } from 'react'
import { Button as PayloadButton } from '@payloadcms/ui'
import { toast } from '@payloadcms/ui'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const Button = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault()

      if (loading || seeded) return // Prevent multiple triggers

      setLoading(true)
      setError(null) // Reset any previous errors

      try {
        const response = await fetch('/api/seed-team', {
          method: 'GET', // Assuming seeding is a POST action
        })

        if (!response.ok) {
          throw new Error(`Failed to seed: ${response.statusText}`)
        }

        setSeeded(true)
        toast.success('Successfully seeded team members!')
        router.refresh()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
        toast.error(`Error: ${message}`)
      } finally {
        setLoading(false)
      }
    },
    [loading, seeded, router],
  )

  return (
    <PayloadButton
      buttonStyle="secondary"
      className="w-52"
      onClick={handleClick}
      disabled={loading || seeded} // Disable while loading or if already seeded
    >
      {loading ? (
        <LoaderCircle className="animate-spin size-5" />
      ) : seeded ? (
        'Seeded!'
      ) : (
        'Seed Team'
      )}
    </PayloadButton>
  )
}
