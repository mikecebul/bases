'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

const SocialRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<{ platform: string }>()

  return (
    <div>
      <p className="capitalize">{`${rowNumber} - ${data.platform || 'undefined'}`}</p>
    </div>
  )
}

export default SocialRowLabel
