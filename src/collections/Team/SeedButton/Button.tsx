'use client'

import React from 'react'
import { useActionState } from 'react'
import { Button as PayloadButton } from '@payloadcms/ui'
import { LoaderCircle } from 'lucide-react'
import { seedTeam } from './seedTeam'

const initialState = {
  message: '',
}

export const Button = () => {
  const [state, formAction, isPending] = useActionState(seedTeam, initialState)

  return (
    <form action={formAction}>
      <PayloadButton type="submit" buttonStyle="secondary" className="w-52" disabled={isPending}>
        {isPending ? <LoaderCircle className="animate-spin size-5" /> : 'Seed Team'}
      </PayloadButton>
      {state?.message && (
        <p className="text-sm mt-2" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  )
}
