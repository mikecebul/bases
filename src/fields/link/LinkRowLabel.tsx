'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'
type LinkProps = {
  link: {
    label: string
  }
}
const LinkRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber = 0 } = useRowLabel<LinkProps>()

  return <div className="capitalize">{`${rowNumber + 1} - ${data?.link?.label || 'Untitled'}`}</div>
}

export default LinkRowLabel
