'use client'

import { lucideIcons } from '@/components/Icons'
import { SelectInput, useField } from '@payloadcms/ui'
import { Icon } from '@/components/Icons/Icon'
import { useState } from 'react'

export default function IconSelect({ path }: { path: string }) {
  const { initialValue, value, setValue } = useField<string>({ path })
  const [name, setName] = useState<string>(initialValue ?? '')

  const options = lucideIcons.map((icon) => ({
    label: icon.label,
    value: icon.value,
  }))

  return (
    <>
      <label className="field-label">Icon Select</label>
      <div className="flex items-center w-full space-x-8">
        <SelectInput
          label="Select Icon"
          path={path}
          name={path}
          options={options}
          value={value}
          onChange={(val) => {
            setValue(val)
            if (typeof val === 'string') setName(val)
          }}
          className="min-w-64"
        />
        <Icon name={name} className="w-12 h-12" />
      </div>
    </>
  )
}
