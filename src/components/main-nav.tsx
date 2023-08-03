"use client";

import * as React from "react";
import Link from "next/link";
import { cn, isActiveRoute } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

export function MainNav() {
  const currentPathName = usePathname();

  if (!currentPathName) return;

  return (
    <div className="flex-1">
      <nav className="justify-around hidden p-8 md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "text-lg", {
                    "bg-secondary": isActiveRoute(currentPathName, "/"),
                  })}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about-us" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "text-lg", {
                    "bg-secondary": isActiveRoute(currentPathName, "/"),
                  })}
                >
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn("text-lg", {
                  "bg-secondary": isActiveRoute(currentPathName, "/about"),
                })}
              >
                About Us
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {siteConfig.AboutPageLinks.map((item, index) => (
                    <Link href={item.href} legacyBehavior passHref key={index}>
                      <NavigationMenuLink>
                        <div
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            {
                              "bg-accent": isActiveRoute(
                                currentPathName,
                                item.href
                              ),
                            }
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {item.title}
                          </div>
                          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn("text-lg", {
                  "bg-secondary": isActiveRoute(currentPathName, "/services"),
                })}
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {siteConfig.ServicesPageLinks.map((item, index) => (
                    <Link href={item.href} legacyBehavior passHref key={index}>
                      <NavigationMenuLink>
                        <div
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            {
                              "bg-accent": isActiveRoute(
                                currentPathName,
                                item.href
                              ),
                            }
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {item.title}
                          </div>
                          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "text-lg", {
                    "bg-secondary": isActiveRoute(currentPathName, "/contact"),
                  })}
                >
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/donate" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "text-lg", {
                    "bg-secondary": isActiveRoute(currentPathName, "/donate"),
                  })}
                >
                  Donate
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}
