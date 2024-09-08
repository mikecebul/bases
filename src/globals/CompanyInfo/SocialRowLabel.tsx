'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'
type LinkProps = {
  platform: string
  link: {
    label: string
  }
}
const SocialRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<LinkProps>()

  return (
    <div className="text-orange-400 capitalize">{`${rowNumber} - ${data.platform || 'Untitled'}`}</div>
  )
}

export default SocialRowLabel
