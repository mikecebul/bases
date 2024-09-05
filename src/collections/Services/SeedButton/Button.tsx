'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Button as PayloadButton } from '@payloadcms/ui'
import useSWR from 'swr'
import { fetcher } from '@/utilities/fetcher'
import { useRouter } from 'next/navigation'
import { toast } from '@payloadcms/ui'

export const Button = () => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const router = useRouter()

  const url = `/api/seed-services/`
  const { data, isLoading, error } = useSWR(shouldFetch ? url : null, fetcher)

  useEffect(() => {
    if (data) {
      toast.success('Successfully seeded services!')
      router.refresh()
    }
    if (error) toast.error(`${error}`)
  }, [data, error, router])

  return (
    <Fragment>
      <PayloadButton
        buttonStyle="secondary"
        className="w-52"
        onClick={() => setShouldFetch(true)}
        disabled={isLoading}
      >
        {isLoading ? 'Seeding...' : 'Seed Services'}
      </PayloadButton>
    </Fragment>
  )
}
