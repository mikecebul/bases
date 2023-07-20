"use client";

import * as React from "react";
import Link from "next/link";
import { cn, isActiveMenuItem, isActiveRoute } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

export function MainNavLandingPage() {
  const currentPathName = usePathname();
  return (
    <div className="flex-1">
      <nav className="justify-around hidden p-8 md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {siteConfig.LandingPageLinks.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "text-lg", {
                      "bg-secondary": isActiveRoute(currentPathName, item.href),
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
  )
}
