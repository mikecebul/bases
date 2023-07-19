import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex w-full border-b border-secondary bg-background/10 backdrop-blur-sm">
      <div className="px-4 lg:container flex items-center h-14 lg:h-20 w-full">
        <Icons.logo className="w-40 md:w-44 lg:w-64" />
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
}
