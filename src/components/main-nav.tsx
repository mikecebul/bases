"use client";

import * as React from "react";
import Link from "next/link";
import { cn, isActiveMenuItem, isActiveRoute } from "@/lib/utils";
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
              <NavigationMenuTrigger
                className={cn("text-lg", {
                  "bg-secondary": isActiveMenuItem(currentPathName, "/about"),
                })}
              >
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {siteConfig.AboutPageLinks.map((item, index) => (
                    <ListItem
                      href={item.href}
                      title={item.title}
                      key={index}
                      className={cn({
                        "bg-secondary": isActiveRoute(
                          currentPathName,
                          item.href
                        ),
                      })}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn("text-lg", {
                  "bg-secondary": isActiveMenuItem(
                    currentPathName,
                    "/services"
                  ),
                })}
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {siteConfig.ServicesPageLinks.map((item, index) => (
                    <ListItem
                      key={index}
                      title={item.title}
                      href={item.href}
                      className={cn({
                        "bg-secondary": isActiveRoute(
                          currentPathName,
                          item.href
                        ),
                      })}
                    >
                      {item.description}
                    </ListItem>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
