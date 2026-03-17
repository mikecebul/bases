'use client'

import type { SelectFieldClientProps, SelectFieldValidation } from 'payload'

import { SelectField, useForm } from '@payloadcms/ui'
import React, { useMemo } from 'react'

interface SelectFieldOption {
  label: string
  value: string
}

const DynamicFieldSelector: React.FC<
  { validate: SelectFieldValidation } & SelectFieldClientProps
> = (props) => {
  const { fields, getDataByPath } = useForm()

  const options = useMemo(() => {
    const formFields = (getDataByPath('fields') as any[] | undefined) ?? []

    return formFields
      .map((block): null | SelectFieldOption => {
        const { name, blockType, label } = block

        if (blockType !== 'payment') {
          return {
            label,
            value: name,
          }
        }

        return null
      })
      .filter(Boolean) as SelectFieldOption[]
  }, [fields, getDataByPath])

  return (
    <SelectField
      {...props}
      field={{
        ...props.field,
        options,
      }}
    />
  )
}

export default DynamicFieldSelector
