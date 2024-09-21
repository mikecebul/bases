'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

const RowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<{ title: string }>()

  return (
    <div className="text-orange-400 capitalize">{`${rowNumber} - ${data.title || 'Untitled'}`}</div>
  )
}

export default RowLabel
