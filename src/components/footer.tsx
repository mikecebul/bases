import Link from "next/link";
import { Separator } from "./ui/separator";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="pt-4 shadow rounded-t-md bg-background/50">
      <div className="w-full px-4 pt-4 mx-auto 2xl:container md:px-8 md:pt-8 2xl:px-0">
        <div className="grid md:grid-cols-3 md:gap-4">
          {/* Website Sections */}
          <div className="col-span-1">
            <p className="text-lg font-bold">Website</p>
            <Separator className="my-4" />
            <ul className="flex flex-col mb-8 space-y-4 font-medium text-gray-500">
              {siteConfig.NavLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "flex justify-start"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href={siteConfig.footer.privacy.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex justify-start"
                  )}
                >
                  {siteConfig.footer.privacy.title}
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.footer.resources.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex justify-start"
                  )}
                >
                  {siteConfig.footer.resources.title}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <p className="text-lg font-bold">Contact</p>
            <Separator className="my-4" />
            <ul className="mb-8 space-y-4 text-gray-500">
              {siteConfig.footer.Contact.map((item) =>
                item.href ? (
                  <li key={item.title} className="group">
                    <a
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "flex justify-start group-hover:text-primary"
                      )}
                    >
                      <item.icon className="flex-shrink-0 mr-2" size={20} />
                      {item.title}
                    </a>
                  </li>
                ) : (
                  <li
                    key={item.title}
                    className={cn(
                      buttonVariants({ variant: "text" }),
                      "text-gray-500"
                    )}
                  >
                    <item.icon className="mr-2" size={20} />
                    {item.title}
                  </li>
                )
              )}
              {siteConfig.footer.Social.map((item) => (
                <li key={item.title} className="group">
                  <a
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "flex justify-start group-hover:text-primary"
                    )}
                  >
                    <item.icon className="mr-2" size={20} />
                    {item.title}
                  </a>
                </li>
              ))}
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
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "ghost" }), "p-0")}
            >
              BASES
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
