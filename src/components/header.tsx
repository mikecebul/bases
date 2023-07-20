import { Icons } from "./icons";
import { MainNavLandingPage } from "./main-nav-landing-page";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-background/50 backdrop-blur-sm">
      <div className="flex items-center w-full px-4 lg:container h-14 lg:h-20">
        <Icons.logo className="w-40 md:w-44 lg:w-64" />
        <MainNavLandingPage />
        <MobileNav />
      </div>
    </header>
  );
}
