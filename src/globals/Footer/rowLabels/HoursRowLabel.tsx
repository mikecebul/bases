'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

const HoursRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<{ day: string; hours: string }>()

  return (
    <div>
      <p className="capitalize">
        {`${rowNumber} - `}
        <span className="font-semibold">{data.day}:</span>
        <span className="font-normal">{` ${data.hours}`}</span>
      </p>
    </div>
  )
}

export default HoursRowLabel
