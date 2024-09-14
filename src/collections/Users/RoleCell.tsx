'use client'

import { useTableCell } from '@payloadcms/ui'

function RoleCell() {
  const { cellData } = useTableCell()

  switch (cellData) {
    case 'superAdmin':
      return 'Super Admin'
    case 'admin':
      return 'Admin'
    case 'admin':
      return 'Admin'
    case 'editor':
      return 'Editor'
  }
}

export default RoleCell
