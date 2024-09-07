import { Hero } from '@/payload-types'

export function HeroMedium(props: Hero['mediumImpact']) {
  const { subtitle, title, description } = props || {}
  return (
    <div className="flex justify-center max-w-prose text-left text-pretty lg:text-center">
      {!!subtitle && <Subtitle text={subtitle} />}
      {!!title && <Title text={title} />}
      {!!description && <Description text={description} />}
    </div>
  )
}

export const Subtitle = ({ text }: { text: string }) => {
  return (
    <h3 className="text-base font-semibold leading-7 capitalize text-brand max-w-prose">{text}</h3>
  )
}
export const Title = ({ text }: { text: string }) => {
  return (
    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 capitalize text-pretty">
      {text}
    </h2>
  )
}
export const Description = ({ text }: { text: string }) => {
  return <p className="pt-4 text-lg leading-7 text-muted-foreground max-w-prose">{text}</p>
}
