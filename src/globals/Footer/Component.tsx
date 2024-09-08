import { getCachedGlobal } from '@/utilities/getGlobals'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import type { CompanyInfo, Footer } from '@/payload-types'

import { ThemeSelector } from '@/globals/Footer/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { oldSiteConfig } from '@/config'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import { col } from 'framer-motion/client'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')()
  const companyInfo: CompanyInfo = await getCachedGlobal('company-info')()

  const columns = footer?.columns || []
  return (
    <footer className="pt-4 rounded-t-md bg-background/50">
      <div className="w-full px-4 pt-4 mx-auto 2xl:container md:px-8 md:pt-8 2xl:px-0">
        <div className="grid md:grid-cols-3 md:gap-4">
          {/* Website Sections */}
          <div className="col-span-1">
            <p className="text-lg font-bold">Website</p>
            <Separator className="my-4" />
            <ul className="flex flex-col mb-8 space-y-4 font-medium text-gray-500">
              {navItems.map(({ link, id }) => (
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

          {/* Contact Section */}
          <div className="col-span-1 mb-6">
            <p className="text-lg font-bold">Contact</p>
            <Separator className="my-4" />
            <ul className="mb-8 space-y-4 text-gray-500">
              {oldSiteConfig.footer.Contact.map((item) =>
                item.href ? (
                  <li key={item.title} className="group">
                    <a
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'flex justify-start group-hover:text-primary',
                      )}
                    >
                      <item.icon className="flex-shrink-0 mr-2" size={20} />
                      {item.title}
                    </a>
                  </li>
                ) : (
                  <li
                    key={item.title}
                    className={cn(buttonVariants({ variant: 'text' }), 'text-gray-500')}
                  >
                    <item.icon className="mr-2" size={20} />
                    {item.title}
                  </li>
                ),
              )}
              {oldSiteConfig.footer.Social.map((item) => (
                <li key={item.title} className="group">
                  <a
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex justify-start group-hover:text-primary',
                    )}
                  >
                    <item.icon className="mr-2" size={20} />
                    {item.title}
                  </a>
                </li>
              ))}

              {/* Hours */}
              <li className={cn(buttonVariants({ variant: 'text' }), 'text-gray-500')}>
                <div className="flex items-start pt-8">
                  <Clock className="mt-1 mr-2" size={20} />
                  <ul className="">
                    <li>
                      <strong>Mon - Thu:</strong> 10am - 6pm
                    </li>
                    <li>
                      <strong>Fri:</strong> 10am - 5pm
                    </li>
                    <li>After hours by appointment only</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

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
// <footer className="border-t border-border bg-black dark:bg-card text-white">
//   <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
//     <Link className="flex items-center" href="/">
//       <picture>
//         <img
//           alt="Payload Logo"
//           className="max-w-[6rem] invert-0"
//           src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/payload/src/admin/assets/images/payload-logo-light.svg"
//         />
//       </picture>
//     </Link>

//     <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
//       <ThemeSelector />
//       <nav className="flex flex-col md:flex-row gap-4">
//         {navItems.map(({ link }, i) => {
//           return <CMSLink className="text-white" key={i} {...link} />
//         })}
//       </nav>
//     </div>
//   </div>
// </footer>
