"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { ScrollArea } from "./ui/scroll-area";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn, isActiveRoute } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const currentPathName = usePathname();

  return (
    <div className="md:hidden flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="w-8 h-8 p-0 bg-secondary text-primary"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Icons.closeMenu className="h-8 w-8" />
            ) : (
              <Icons.openMenu className="h-8 w-8" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 sm:w-1/2">
          <div className="flex justify-center mt-16">
            <Icons.logo className="w-40" />
          </div>
          <ScrollArea className="my-4 h-[calc(100vh-9rem)] pb-10">
            <div className="flex flex-col items-center justify-center gap-10 py-2">
              <nav className="flex flex-col items-center justify-center flex-1 space-y-4">
                {siteConfig.NavLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-lg"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-0 right-0"></div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
