import { Hero } from '@/payload-types'

export function HeroMedium(props: Hero['mediumImpact']) {
  const { subtitle, title, description } = props || {}
  return (
    <div className="mx-auto flex flex-col justify-center max-w-prose text-left text-pretty lg:text-center pb-16">
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
export const Title = ({ text, heading = 'h2' }: { text: string; heading?: string }) => {
  switch (heading) {
    case 'h2':
      return (
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary capitalize text-balance max-w-prose">
          {text}
        </h2>
      )
    case 'h1':
      return (
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-pretty max-w-prose ">
          {text}
        </h1>
      )
    default:
      return (
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 capitalize text-balance max-w-prose">
          {text}
        </h2>
      )
  }
}
export const Description = ({ text }: { text: string }) => {
  return (
    <p className="text-lg leading-7 text-muted-foreground max-w-prose text-balance">{text}</p>
  )
}
