import type { ServicesBlock as ServicesBlockType } from '@/payload-types'
import { ServicesList } from '@/components/ServicesList'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import payloadConfig from '@payload-config'
import { CMSLink } from '@/components/Link'
import { Description, HeroMedium, Subtitle, Title } from '@/components/Hero/HeroMedium'
import { GridSVG } from '@/components/GridSVG'
import Container from '@/components/Container'

export async function ServicesBlock({
  subtitle,
  title,
  description,
  gridSVG,
  howMany,
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
    services.topThreeServices.every((item) => typeof item === 'object')
      ? services.topThreeServices
      : []

  return (
    <Container className="">
      {gridSVG && <GridSVG />}
      <HeroMedium subtitle={subtitle} title={title} description={description} />
      {howMany === 'allServices' && allServices.length > 0 && (
        <ServicesList services={allServices} />
      )}
      {howMany === 'topThreeServices' && topThreeServices.length > 0 && (
        <>
          <ServicesList services={topThreeServices} />
          {services?.links != null
            ? services.links.map(({ link }) => (
                <div key={link.label} className="flex md:flex-row pt-12 justify-center">
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
