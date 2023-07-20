import Link from "next/link";
import { Icons } from "./icons";
import { MainNavLandingPage } from "./main-nav-landing-page";
import { MobileNavLandingPage } from "./mobile-nav-landing-page";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-background/50 backdrop-blur-sm">
      <div className="flex items-center w-full px-4 md:px-8 2xl:px-0 2xl:container h-14 lg:h-24 2xl:h-20">
        <Link href="/">
          <Icons.logo className="w-40 md:w-44 lg:w-64" />
        </Link>
        <MainNavLandingPage />
        <MobileNavLandingPage />
        <div className="flex flex-col space-y-2 items-start 2xl:flex-row 2xl:space-x-2 2xl:space-y-0">
          <Link href="tel:2315471144" legacyBehavior passHref>
            <Button
              variant="brand"
              className="hidden lg:flex group-hover:text-brand-foreground/80"
            >
              <Icons.phone className="mr-2" size={20} />
              (231) 547-1144
            </Button>
          </Link>
          <Link
            href="https://goo.gl/maps/X956fmf511Fef9Pr7"
            legacyBehavior
            passHref
          >
            <Button
              variant="outline"
              className="hidden 2xl:flex group-hover:text-brand-foreground/80"
            >
              <Icons.navigtion className="mr-2" size={20} />
              101 M-66 N | Charlevoix, MI
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
