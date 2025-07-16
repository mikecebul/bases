'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn' 
import { CountryFormField } from '@/payload-types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { countryOptions } from './options'

export default function CountryField({ id, label, name, colSpan = '2' }: CountryFormField) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={cn('col-span-2 w-full', { '@lg:col-span-1': colSpan === '1' })}>
      <div className={cn('grid gap-2 w-full')}>
        <Label htmlFor={id ?? name}>{label}</Label>
        <Select onValueChange={(e) => field.handleChange(e)}>
          <SelectTrigger id={id ?? name}>
            <SelectValue placeholder="Pick a country" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map(({ label, value }) => {
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>
      <div>
        {errors && <em className="text-sm text-destructive first:mt-1">{errors[0]?.message}</em>}
      </div>
    </div>
  )
}
