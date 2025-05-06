import type { ServicesBlock as ServicesBlockType } from '@/payload-types'
import { ServicesList } from '@/components/ServicesList'
import { CMSLink } from '@/components/Link'
import { HeroMedium } from '@/components/Hero/HeroMedium'
import { GridSVG } from '@/components/GridSVG'
import Container from '@/components/Container'

export async function ServicesBlock({
  subtitle,
  title,
  heading,
  description,
  gridSVG,
  howMany,
  allServices,
  topThreeServices,
  links,
}: ServicesBlockType) {
  const sanitizedAllServices =
    allServices != null && allServices.every((item) => typeof item === 'object') ? allServices : []
  const sanitizedTopThreeServices =
    topThreeServices != null && topThreeServices.every((item) => typeof item === 'object')
      ? topThreeServices
      : []

  return (
    <Container className="">
      {gridSVG && <GridSVG />}
      <HeroMedium subtitle={subtitle} title={title} description={description} heading={heading} />
      {howMany === 'allServices' && sanitizedAllServices.length > 0 && (
        <ServicesList services={sanitizedAllServices} />
      )}
      {howMany === 'topThreeServices' && sanitizedTopThreeServices.length > 0 && (
        <>
          <ServicesList services={sanitizedTopThreeServices} />
          {links != null
            ? links.map(({ link }) => (
                <div key={link.label} className="flex justify-center pt-12 md:flex-row">
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
