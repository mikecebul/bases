import { getCachedGlobal } from '@/utilities/getGlobals'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import type { Footer } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Clock, Facebook, Mail, Navigation, Phone, Printer } from 'lucide-react'
import Image from 'next/image'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')()
  const columns = footer?.columns || []
  const pageLinks = columns.find(({ pageLinks }) => pageLinks && pageLinks.length > 0)?.pageLinks
  const contact = columns.find(({ contact }) => contact)?.contact
  const businessHours = columns.find(({ hours }) => hours && hours.length > 0)?.hours
  const socialLinks = columns.find(
    ({ socialLinks }) => socialLinks && socialLinks.length > 0,
  )?.socialLinks

  return (
    <footer className="pt-4 rounded-t-md bg-background/50">
      <div className="w-full px-4 pt-4 mx-auto 2xl:container md:px-8 md:pt-8 2xl:px-0">
        <div className="grid gap-4 lg:auto-cols-[minmax(2,_1fr)] lg:grid-flow-col mb-6">
          {/* PageLinks */}
          {!!pageLinks && pageLinks.length > 0 && (
            <div className="col-span-1">
              <p className="text-lg font-bold">Website</p>
              <Separator className="my-4" />
              <ul className="flex flex-col mb-8 space-y-4 font-medium text-gray-500">
                {pageLinks.map(({ link, id }) => (
                  <li key={id}>
                    <Link
                      href={link.url ?? '/'}
                      className={cn(buttonVariants({ variant: 'ghost' }), 'flex justify-start')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Contact Info */}
          {!!contact && (
            <div className="col-span-1">
              <p className="text-lg font-bold">Contact</p>
              <Separator className="my-4" />
              <ul className="mb-8 space-y-4 text-gray-500">
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
                  <li key={contact.address} className="group">
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
                  <li
                    key={contact.fax}
                    className={cn(buttonVariants({ variant: 'text' }), 'text-gray-500')}
                  >
                    <Printer className="mr-2" size={20} />
                    {contact.fax}
                  </li>
                )}
              </ul>
            </div>
          )}
          {/* Business Hours */}
          {!!businessHours && (
            <div className="col-span-1">
              <p className="text-lg font-bold">Business Hours</p>
              <Separator className="my-4" />
              <ul className="mb-8 space-y-4 text-gray-500">
                <li className={cn(buttonVariants({ variant: 'text' }), 'text-gray-500')}>
                  <div className="flex items-start pt-8">
                    <Clock className="mt-1 mr-2" size={20} />
                    <ul className="">
                      {businessHours?.map(({ day, hours, id, note, type }) => (
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
                  </div>
                </li>
              </ul>
            </div>
          )}
          {/* Social Links */}
          {!!socialLinks && (
            <div className="col-span-1">
              <p className="text-lg font-bold">Social</p>
              <Separator className="my-4" />
              <ul className="mb-8 space-y-4 text-gray-500">
                {socialLinks?.map((link) => (
                  <li key={link.id} className="group">
                    <a
                      href={link.url ?? ''}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'flex justify-start group-hover:text-primary',
                      )}
                    >
                      <Facebook className="mr-2" size={20} />
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Map Section */}
          <div className="col-span-1">
            <p className="text-lg font-bold">Location</p>
            <Separator className="my-4" />
            <Link href="https://goo.gl/maps/X956fmf511Fef9Pr7">
              <Image
                src={`https://maps.googleapis.com/maps/api/staticmap?center=45.3035201,-85.2598514&zoom=16&size=400x400&markers=color:blue%7Clabel:B%7C45.3035201,-85.2598514&key=${process.env.GOOGLE_MAPS_API_KEY}`}
                alt="Google maps of our address"
                width={1000}
                height={1000}
                className="h-[264px] object-cover"
              ></Image>
            </Link>
          </div>
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
      </div>
    </footer>
  )
}
