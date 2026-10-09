import { IconWithBorder } from '@/components/Icons/Icon'
import type { Service } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { ServiceReveal, ServicesReveal } from './ServiceReveal'

export function ServicesList({ services }: { services: Service[] }) {
  return (
    <ServicesReveal>
      {services?.map((service) => (
        <ServiceReveal key={service.id}>
          <dt className="text-base font-semibold leading-7 text-primary">
            <div className="absolute top-0 left-0">
              <IconWithBorder name={service.icon ?? 'Check'} color="white" />
            </div>
            {service.title}
          </dt>
          {service.description ? (
            <RichText
              paragraphClassName="text-muted-foreground [&_a]:underline-offset-2"
              data={service.description}
            />
          ) : (
            <dd className="mt-2 text-base leading-7 text-muted-foreground">
              {service.desc ?? 'TBA'}
            </dd>
          )}
        </ServiceReveal>
      ))}
    </ServicesReveal>
  )
}
