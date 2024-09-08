'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'
type LinkProps = {
  link: {
    label: string
  }
}
const LinkRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<LinkProps>()

  return (
    <div className="text-orange-400 capitalize">{`${rowNumber} - ${data.link.label || 'Untitled'}`}</div>
  )
}

export default LinkRowLabel
