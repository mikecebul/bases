'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn' 
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxFormField } from '@/payload-types'

export default function CheckboxField({ id, label, name, colSpan = '2' }: CheckboxFormField) {
  const field = useFieldContext<boolean>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div
      className={cn('col-span-2 flex flex-col justify-start w-full', {
        '@lg:col-span-1': colSpan === '1',
      })}
    >
      <div className={cn('flex items-center space-x-2')}>
        <Checkbox
          id={id ?? name}
          checked={field.state.value ?? false}
          onBlur={() => field.handleBlur()}
          onCheckedChange={(checked) => field.handleChange(!!checked)}
        />
        <Label htmlFor={id ?? name}>{label}</Label>
      </div>
      <div>{errors && <em className="text-sm text-destructive first:mt-1">{errors[0]}</em>}</div>
    </div>
  )
}
