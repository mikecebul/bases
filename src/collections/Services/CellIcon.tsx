'use client'

import { Icon } from '@/components/Icons/Icon'
import { useTableCell } from '@payloadcms/ui'
import React from 'react'

export default function CellIcon() {
  const { cellData } = useTableCell()

  return <Icon name={cellData} size={25} />
}
