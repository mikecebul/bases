import Link from "next/link";
import { Icons } from "./icons";
import { MobileNavLandingPage } from "./mobile-nav-landing-page";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { MainNav2 } from "./main-nav-2";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-background/50 backdrop-blur-sm">
      <div className="flex items-center w-full px-4 md:px-8 2xl:px-0 2xl:container h-14 lg:h-20">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost" }), "py-8 px-0")}
        >
          <Icons.logo className="w-40 md:w-44 lg:w-64" />
        </Link>
        <MainNav2 />
        <MobileNavLandingPage />
        <div className="flex flex-col space-y-2 items-center xl:flex-row 2xl:space-x-2 2xl:space-y-0">
          <div
            className={cn(
              buttonVariants({ variant: "text" }),
              "text-lg text-brand hidden xl:inline-flex"
            )}
          >
            <Icons.phone className="mr-2" size={20} />
            (231) 547-1144
          </div>
          <Link
            href="https://goo.gl/maps/X956fmf511Fef9Pr7"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden xl:inline-flex"
            )}
          >
            <Icons.navigtion className="mr-2" size={20} />
            101 M-66 N | Charlevoix, MI
          </Link>
        </div>
      </div>
    </header>
  );
}
