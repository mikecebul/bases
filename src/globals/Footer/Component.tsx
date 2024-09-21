import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import type { CompanyInfo, Footer } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Clock, Facebook, Mail, Navigation, Phone, Printer } from 'lucide-react'
import Image from 'next/image'
import Container from '@/components/Container'
import { CMSLink } from '@/components/Link'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import payloadConfig from '@payload-config'

export async function Footer() {
  const payload = await getPayloadHMR({ config: payloadConfig })

  const { pageLinks, showContact, showGoogleMap } = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })

  const { contact, social, hours } = await payload.findGlobal({
    slug: 'company-info',
    depth: 1,
  })

  return (
    <footer>
      <Container className="py-0">
        <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* PageLinks */}
          {pageLinks && pageLinks.length > 0 && (
            <div className="flex flex-col col-span-1">
              <p className="text-lg font-bold">Website</p>
              <Separator className="my-4" />
              <ul className="flex flex-col mb-8 space-y-4 font-medium text-gray-500">
                {pageLinks.map(({ link }, id) => {
                  return (
                    <li key={id}>
                      <CMSLink {...link} appearance="nav" className={cn('text-sm')} />
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {/* Contact Info */}
          {showContact && contact && (
            <div className="flex flex-col col-span-1">
              <p className="text-lg font-bold">Contact</p>
              <Separator className="my-4" />
              <ul className="flex flex-col mb-8 space-y-4 text-gray-500 ">
                {typeof contact?.phone === 'string' && (
                  <li key={contact.phone} className="group">
                    <a
                      href={`tel:${contact.phone.replace(/\D/g, '')}`}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'flex justify-start group-hover:text-primary',
                      )}
                    >
                      <Phone className="flex-shrink-0 mr-2" size={20} />
                      {contact.phone}
                    </a>
                  </li>
                )}
                {typeof contact?.address === 'string' && (
                  <li key={contact.address} className="group">
                    <a
                      href={contact.googleMapLink ?? '#'}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'flex justify-start group-hover:text-primary',
                      )}
                    >
                      <Navigation className="flex-shrink-0 mr-2" size={20} />
                      {contact.address}
                    </a>
                  </li>
                )}
                {typeof contact?.email === 'string' && (
                  <li key={contact.email} className="group">
                    <a
                      href={`mailto:${contact.email}`}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'flex justify-start group-hover:text-primary',
                      )}
                    >
                      <Mail className="flex-shrink-0 mr-2" size={20} />
                      {contact.email}
                    </a>
                  </li>
                )}
                {typeof contact?.fax === 'string' && (
                  <li key={contact.fax} className="group">
                    <div className={cn(buttonVariants({ variant: 'text' }), 'text-gray-500')}>
                      <Printer className="mr-2" size={20} />
                      {contact.fax}
                    </div>
                  </li>
                )}
                {/* Social Links */}
                {!!social &&
                  social?.map(({ link }) => (
                    <li key={link.label} className="group">
                      <a
                        href={link.url ?? ''}
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          'flex justify-start group-hover:text-primary',
                        )}
                      >
                        <Facebook className="mr-2" size={20} />
                        {link.label}
                      </a>
                    </li>
                  ))}

                {/* Business Hours */}
                {!!hours && hours?.length > 0 && (
                  <li
                    className={cn(
                      buttonVariants({ variant: 'text' }),
                      'text-gray-500 flex items-start justify-start h-full',
                    )}
                  >
                    <Clock className="mr-2" size={20} />
                    <ul>
                      {hours?.map(({ day, hours, id, note, type }) => (
                        <li key={id}>
                          {type === 'default' ? (
                            <span>
                              <strong>{`${day}: `}</strong>
                              {hours}
                            </span>
                          ) : (
                            <span>{note}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Map Section */}
          {showGoogleMap && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <p className="text-lg font-bold">Location</p>
              <Separator className="my-4" />
              <Link href="https://goo.gl/maps/X956fmf511Fef9Pr7">
                <Image
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=45.3035201,-85.2598514&zoom=16&size=400x400&markers=color:blue%7Clabel:B%7C45.3035201,-85.2598514&key=${process.env.GOOGLE_MAPS_API_KEY}`}
                  alt="Google maps of our address"
                  width={1000}
                  height={1000}
                  className="h-[350px] object-cover"
                ></Image>
              </Link>
            </div>
          )}
        </div>

        <Separator />
        <div className="flex items-center justify-center">
          <span className="block text-sm text-center text-gray-500">
            © {new Date().getFullYear()}{' '}
            <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), 'p-0')}>
              BASES
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </Container>
    </footer>
  )
}
