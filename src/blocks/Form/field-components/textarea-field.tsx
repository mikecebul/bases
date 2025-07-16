'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { Textarea } from '@/components/ui/textarea'
import { TextareaFormField } from '@/payload-types'

export default function TextareaField({ id, label, name, colSpan = '2' }: TextareaFormField) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={cn('col-span-2 w-full', { '@md:col-span-1': colSpan === '1' })}>
      <div className={cn('grid gap-2 w-full')}>
        <Label htmlFor={id ?? name}>{label}</Label>
        <Textarea
          id={id ?? name}
          value={field.state.value ?? ''}
          onBlur={() => field.handleBlur()}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
      <div>
        {errors && <em className="text-sm text-destructive first:mt-1">{errors[0]?.message}</em>}
      </div>
    </div>
  )
}
