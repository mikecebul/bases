'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'
type RowProps =
  | {
      type: 'default'
      day: string
      hours: string
    }
  | {
      type: 'custom'
      note: string
    }

const HoursRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<RowProps>()
  if (data.type === 'default')
    return (
      <div>
        <p className="text-orange-400 capitalize">{`${rowNumber} - ${data.day}: ${data.hours}`}</p>
      </div>
    )
  if (data.type === 'custom')
    return (
      <div>
        <p className="text-orange-400 capitalize">{`${rowNumber} - ${data.note}`}</p>
      </div>
    )
}

export default HoursRowLabel
