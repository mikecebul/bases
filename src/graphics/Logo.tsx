import Image from 'next/image'
import React from 'react'

export default function Logo({ width = 1024, height = 252 }: { width?: number; height?: number }) {
  return <Image src="/bases-logo.png" alt="BASES Logo" width={width} height={height} />
}
