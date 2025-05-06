import { Hero } from '@/payload-types'
import { cn } from '@/utilities/cn'

export function HeroMedium(props: Hero['mediumImpact']) {
  const { title, description, heading, subtitle } = props || {}
  return (
    <div
      className={cn(
        'flex flex-col justify-center pb-16 mx-auto text-left max-w-prose text-balance lg:text-center',
        { 'pb-24': heading === 'h1' },
      )}
    >
      {!!subtitle && <Subtitle text={subtitle} />}
      <div className={cn('flex flex-col gap-4', { 'gap-6': heading === 'h1' })}>
        {!!title && <Title text={title} heading={heading} />}
        {!!description && <Description text={description} className="text-pretty" />}
      </div>
    </div>
  )
}

export const Subtitle = ({ text }: { text: string }) => {
  return <h3 className="text-base font-semibold leading-7 capitalize text-brand">{text}</h3>
}
export const Title = ({
  text,
  heading = 'h2',
}: {
  text: string
  heading?: 'h1' | 'h2' | null | undefined
}) => {
  switch (heading) {
    case 'h2':
      return (
        <h2 className="text-3xl font-bold tracking-tight capitalize sm:text-4xl text-primary">
          {text}
        </h2>
      )
    case 'h1':
      return (
        <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl text-primary">{text}</h1>
      )
    default:
      return (
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 capitalize sm:text-4xl">
          {text}
        </h2>
      )
  }
}
export const Description = ({ text, className }: { text: string; className?: string }) => {
  return (
    <p className={cn('text-lg leading-7 text-muted-foreground text-balance', className)}>{text}</p>
  )
}
