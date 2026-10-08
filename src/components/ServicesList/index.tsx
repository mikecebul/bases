import { IconWithBorder } from '@/components/Icons/Icon'
import type { Service } from '@/payload-types'
import { RichText } from '@/components/RichText'

export function ServicesList({ services }: { services: Service[] }) {
  return (
    <dl className="grid max-w-xl grid-cols-1 gap-y-10 md:mx-auto lg:max-w-none lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16 xl:grid-cols-3">
      {services?.map((service) => (
        <div key={service.id} className="relative pl-16 text-left">
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
        </div>
      ))}
    </dl>
  )
}
