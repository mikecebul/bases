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

export function MainNav() {
  const currentPathName = usePathname();

  return (
    <div className="flex-1">
      <nav className="justify-around hidden p-8 md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), {
                    "border-b-2 border-b-brand border-opacity-100 rounded-b-none text-brand":
                      isActiveRoute(currentPathName as string, "/"),
                  })}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about-us" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), {
                    "border-b-2 border-b-brand border-opacity-100 rounded-b-none text-brand":
                      isActiveRoute(currentPathName as string, "/about-us"),
                  })}
                >
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/services" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), {
                    "border-b-2 border-b-brand border-opacity-100 rounded-b-none text-brand":
                      isActiveRoute(currentPathName as string, "/services"),
                  })}
                >
                  Services
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/team" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), {
                    "border-b-2 border-b-brand border-opacity-100 rounded-b-none text-brand":
                      isActiveRoute(currentPathName as string, "/team"),
                  })}
                >
                  Team
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}
