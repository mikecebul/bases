import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import Container from '@/components/Container'

export default function NotFound() {
  return (
    <Container>
      <div className="container py-28">
        <div className="prose max-w-none">
          <h1 style={{ marginBottom: 0 }}>404</h1>
          <p className="mb-4">This page could not be found.</p>
        </div>
        <Button asChild variant="default">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </Container>
  )
}
