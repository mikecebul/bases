'use client'

import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Icon() {
  const pathname = usePathname()
  const icon = <HomeIcon size={17} className="text-primary" />

  if (pathname === '/admin/analytics') {
    return <Link href="/admin">{icon}</Link>
  }

  return icon
}
