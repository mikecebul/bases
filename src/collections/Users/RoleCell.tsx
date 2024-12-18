import { DefaultCellComponentProps } from "payload"

const RoleCell = ({ cellData }: DefaultCellComponentProps) => {

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
