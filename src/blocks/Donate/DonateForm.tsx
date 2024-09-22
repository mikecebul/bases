'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  amount: z.string().regex(/^\d+\.\d{2}$/, {
    message: 'Please use the format 999.99.',
  }),
})

export function DonateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { amount } = values
    window.location.href = `https://www.usaepay.com/interface/epayform/?UMkey=${process.env.NEXT_PUBLIC_USAEPAY_KEY}&UMcommand=sale&UMamount=${amount}`
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="100.00"
                  {...field}
                  className="text-primary placeholder:text-muted-foreground/50"
                />
              </FormControl>
              <FormDescription className="text-accent/70 text-xs">
                Kindly enter your donation amount.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="default"
          className="w-full bg-accent text-primary font-semibold hover:bg-accent/90"
        >
          Donate Now
        </Button>
      </form>
    </Form>
  )
}
