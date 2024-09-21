'use client'

import { User } from '@/payload-types'
import { SelectField, SelectInput, useAuth, useField, useFieldProps } from '@payloadcms/ui'
import { Option, TextFieldClientComponent } from 'payload'

const RoleSelect: TextFieldClientComponent = () => {
  const { path } = useFieldProps()
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
    setValue(option)
  }

  return (
    <>
      <label className="field-label">Role Select</label>
      <SelectField
        field={{
          name: path,
          hasMany: false,
          options: options(),
        }}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default RoleSelect
