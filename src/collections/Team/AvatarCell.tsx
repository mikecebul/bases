'use client'

import { fetcher } from '@/utilities/fetcher'
import { Avatar } from '@/payload-types'
import { useTableCell } from '@payloadcms/ui'
import { User } from 'lucide-react'
import Image from 'next/image'
import useSWR from 'swr'

export default function AvatarCell() {
  const { cellData } = useTableCell()

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/avatars/${cellData}`
  const { data } = useSWR<Avatar>(url, fetcher)

  if (!data?.url) return <User size={40} className="p-2 rounded-full bg-zinc-900" />

  console.log(data.url)
  return (
    <Image
      src={data.sizes?.thumbnail?.url ?? data.url}
      alt="thumbnail"
      width={40}
      height={40}
      className="rounded-full"
    />
  )
}
