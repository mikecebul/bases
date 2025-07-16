'use client'

import { Button } from '@/components/ui/button'
import { useFormContext } from '../hooks/form-context'
import { Loader } from 'lucide-react'

export default function SubmitButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button className="w-full" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin" /> : label}
        </Button>
      )}
    </form.Subscribe>
  )
}
