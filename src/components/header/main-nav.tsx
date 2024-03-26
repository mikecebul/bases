"use client";

import * as React from "react";
import Link from "next/link";

import { cn, isActiveRoute } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function MainNav() {
  const currentPathName = usePathname();

  return (
    <div className="flex-1">
      <nav className="justify-around hidden p-8 md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {siteConfig.NavLinks.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), {
                      "border-b-2 border-b-brand border-opacity-100 rounded-b-none text-brand":
                        isActiveRoute(currentPathName as string, item.href),
                    })}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}
