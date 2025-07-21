'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { CheckCircleIcon } from 'lucide-react'

const OPTIONS = [
  'Assessment',
  'Counseling',
  'Drivers license',
  'OWI safety class',
  'Narcan kits',
]

export default function MultiSelectField({ label, name, colSpan = '2', options = OPTIONS }) {
  const field = useFieldContext<string[]>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const value: string[] = Array.isArray(field.state.value) ? field.state.value : []

  function toggleOption(option: string) {
    if (value.includes(option)) {
      field.handleChange(value.filter((v) => v !== option))
    } else {
      field.handleChange([...value, option])
    }
  }

  return (
    <div className={cn('col-span-2 w-full', { '@lg:col-span-1': colSpan === '1' })}>
      <div className={cn('grid gap-2 w-full')}>
        <Label htmlFor={name}>{label}</Label>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const selected = value.includes(option)
            return (
              <button
                key={option}
                type="button"
                className={cn(
                  'px-3 py-1 rounded-full border text-sm flex items-center gap-1 transition-colors',
                  selected
                    ? 'bg-green-500 text-white border-green-600'
                    : 'bg-background border-gray-300 hover:bg-gray-100',
                )}
                onClick={() => toggleOption(option)}
                aria-pressed={selected}
              >
                {selected ? <CheckCircleIcon className="w-4 h-4 mr-1" /> : null}
                {option}
              </button>
            )
          })}
        </div>
      </div>
      <div>
        {errors && (
          <em className="text-sm text-destructive first:mt-1">{errors[0]?.message || errors[0]}</em>
        )}
      </div>
    </div>
  )
}
