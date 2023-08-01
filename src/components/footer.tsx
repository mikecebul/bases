import Link from "next/link";
import { Icons } from "./icons";
import { Separator } from "./ui/separator";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="shadow rounded-t-md bg-background/50">
      <div className="w-full px-4 pt-4 mx-auto 2xl:container md:px-8 md:pt-8 2xl:px-0">
        <div className="grid md:grid-cols-3 md:gap-4">
          {/* Logo and CARF Certification Section */}
          <div className="col-span-1 flex flex-col items-center mb-8 space-y-8 md:mr-16">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "ghost" }), "py-8")}
            >
              <Icons.logo className="w-40 md:w-44 lg:w-64" />
            </Link>
            <div className="flex flex-col items-center justify-center w-full">
              <Icons.carf className="w-16 h-16" />
              <p className="text-[8px] text-justify pt-4 max-w-prose">
                BASES is accredited by CARF International Commission on
                Accreditation of Rehabilitation Facilities (CARF) International
                accreditation demonstrates a program’s quality, transparency and
                commitment to the satisfaction of the persons served. CARF
                International is an independent, non-profit accreditor of health
                and human services. BASES is proud to be accredited by CARF.
              </p>
            </div>
          </div>

          {/* Website Sections */}
          <div className="col-span-1 mb-4">
            <p className="font-bold text-lg pb-2">Website</p>
            <Separator />
            <ul className="flex flex-col font-medium text-gray-500 space-y-4 pt-4">
              <li>
                <Link href="#about" legacyBehavior passHref>
                  <Button
                    variant="ghost"
                    className="flex group-hover:text-brand-foreground/80"
                  >
                    About
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="#services" legacyBehavior passHref>
                  <Button
                    variant="ghost"
                    className="2xl:flex group-hover:text-brand-foreground/80"
                  >
                    Services
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="#team" legacyBehavior passHref>
                  <Button
                    variant="ghost"
                    className="flex group-hover:text-brand-foreground/80"
                  >
                    Team
                  </Button>
                </Link>
              </li>
              <li>
                <Link
                  href="https://basesrecoverycenter.org/wp/wp-content/uploads/Preview-consent-document-SimplePractice.pdf"
                  legacyBehavior
                  passHref
                >
                  <Button
                    variant="ghost"
                    className="flex group-hover:text-brand-foreground/80"
                  >
                    Privacy Policy
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <p className="font-bold text-lg pb-2">Contact</p>
            <Separator />
            <ul className="text-gray-500 pt-4 space-y-4">
              <li>
                <Link
                  href="https://goo.gl/maps/X956fmf511Fef9Pr7"
                  legacyBehavior
                  passHref
                >
                  <Button
                    variant="ghost"
                    className="flex group-hover:text-brand-foreground/80"
                  >
                    <Icons.navigtion className="mr-2" size={20} />
                    101 M-66 N | Charlevoix, MI
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="tel:2315471144" legacyBehavior passHref>
                  <Button
                    variant="ghost"
                    className="flex group-hover:text-brand-foreground/80"
                  >
                    <Icons.phone className="mr-2" size={20} />
                    (231) 547-1144
                  </Button>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@basesrecoverycenter.org"
                  legacyBehavior
                  passHref
                >
                  <Button
                    variant="ghost"
                    className="flex group-hover:text-brand-foreground/80"
                  >
                    <Icons.mail className="mr-2" size={20} />
                    info@basesrecoverycenter.org
                  </Button>
                </Link>
              </li>
              <li
                className={cn(
                  buttonVariants({ variant: "text" }),
                  "text-gray-500"
                )}
              >
                <Icons.print className="mr-2" size={20} />
                (231) 547-4970
              </li>
            </ul>
          </div>
        </div>

        <Separator />
        <div className="flex items-center justify-center">
          <span className="block text-sm text-center text-gray-500">
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://basesmi.org/"
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
