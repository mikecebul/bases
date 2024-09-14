'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

type RowProps = {
  columnType: string
}

// Mapping of columnType values to their corresponding labels
const columnTypeLabels: Record<string, string> = {
  pageLinks: 'Page Links',
  contactInfo: 'Contact Info',
  socialLinks: 'Social Links',
  businessHours: 'Business Hours',
  googleMap: 'Google Map',
}

const ColumnRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<RowProps>()

  // Get the label from the map based on columnType
  const columnLabel = columnTypeLabels[data.columnType] || 'Untitled'

  return (
    <div>
      <p className="">{`${rowNumber} - ${columnLabel}`}</p>
    </div>
  )
}

export default ColumnRowLabel
