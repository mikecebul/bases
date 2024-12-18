'use client'

import { Icon } from '@/components/Icons/Icon'
import { DefaultCellComponentProps } from 'payload'
import React from 'react'

export const CellIcon = ({ cellData }: DefaultCellComponentProps) => {

  return <Icon name={cellData} size={25} />
}

export default CellIcon