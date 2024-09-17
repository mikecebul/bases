'use client'

import { useRowLabel } from '@payloadcms/ui'

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title: string }>()
  return (
    <div className="text-orange-400 capitalize">{`${rowNumber} - ${data.title || 'Untitled'}`}</div>
  )
}

export default RowLabel
