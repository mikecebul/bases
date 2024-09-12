'use client'

import { lucideIcons } from '@/components/Icons'
import { SelectField, useField, useFieldProps } from '@payloadcms/ui'
import { Icon } from '@/components/Icons/Icon'
import { Option } from 'payload'

export const IconSelect = () => {
  const { path } = useFieldProps()
  const { setValue, value } = useField<string>({ path })
  const options = lucideIcons.map((icon) => ({
    label: icon.label,
    value: icon.value,
  }))
  const onChange = (option: Option | Option[]) => {
    setValue(option)
  }

  return (
    <div>
      <label className="field-label">Icon Select</label>
      <SelectField
        field={{
          name: path,
          hasMany: false,
          options,
        }}
        value={value}
        onChange={onChange}
      />
      <Icon name={value} />
    </div>
  )
}

export default IconSelect
