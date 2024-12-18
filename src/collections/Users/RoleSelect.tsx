'use client'

import { SelectField, useAuth, useField } from '@payloadcms/ui'
import type { User } from 'payload'
import { Option, SelectFieldClientComponent } from 'payload'

const RoleSelectClient: SelectFieldClientComponent = ({ path, validate }) => {
  const { value, setValue } = useField<string>({ path })
  const { user } = useAuth<User>()

  const options = () => {
    if (user?.role === 'superAdmin')
      return [
        {
          label: 'Super Admin',
          value: 'superAdmin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ]
    return [
      {
        label: 'Admin',
        value: 'admin',
      },
      {
        label: 'Editor',
        value: 'editor',
      },
    ]
  }

  const onChange = (option: Option | Option[]) => {
    // prevent admins from creating super admins
    if (user?.role !== 'superAdmin' && value === 'superAdmin') return
    // prevent editors from creating admins
    if (user?.role === 'editor' && value === 'admin') return

    setValue(option)
  }

  return (
    <>
      <label className="field-label">Role Select</label>
      <SelectField
        path={path}
        field={{
          name: path,
          hasMany: false,
          options: options(),
        }}
        readOnly={value === 'superAdmin' || user?.role === 'editor'}
        value={value}
        onChange={onChange}
        validate={validate}
      />
    </>
  )
}

export default RoleSelectClient