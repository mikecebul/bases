import type { ServicesBlock as ServicesBlockType } from '@/payload-types'
import { ServicesList } from '@/components/ServicesList'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import payloadConfig from '@payload-config'
import { CMSLink } from '@/components/Link'
import { Description, Subtitle, Title } from '@/components/Hero/HeroMedium'
import { GridSVG } from '@/components/GridSVG'
import Container from '@/components/Container'

export async function ServicesBlock({
  subtitle,
  title,
  description,
  gridSVG,
  type,
  services,
}: ServicesBlockType) {
  const payload = await getPayloadHMR({
    config: payloadConfig,
  })

  const { docs: allServices } = await payload.find({
    collection: 'services',
    limit: 100,
  })
  const topThreeServices =
    services?.topThreeServices != null &&
    services.topThreeServices.every((item) => typeof item !== 'string')
      ? services.topThreeServices
      : []

  return (
    <Container className="">
      {gridSVG && <GridSVG />}
      <div className="mx-auto flex flex-col justify-center max-w-prose text-left text-pretty lg:text-center pb-16">
        {!!subtitle && <Subtitle text={subtitle} />}
        {!!title && <Title text={title} />}
        {!!description && <Description text={description} />}
      </div>
      {type === 'allServices' && allServices.length > 0 && <ServicesList services={allServices} />}
      {type === 'topThreeServices' && topThreeServices.length > 0 && (
        <>
          <ServicesList services={topThreeServices} />
          {services?.links != null
            ? services.links.map(({ link }) => (
                <div key={link.label} className="flex md:flex-row pt-12 lg:justify-center">
                  <CMSLink
                    key={link.label}
                    {...link}
                    size="xl"
                    appearance="brand"
                    className="min-w-full md:min-w-64 "
                  />
                </div>
              ))
            : null}
        </>
      )}
    </Container>
  )
}
