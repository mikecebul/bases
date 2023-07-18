"use client";

import * as React from "react";
import Link from "next/link";
import BASESLOGO from "../../public/BasesLogo.png";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

const WhyUsPageLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Our Staff",
    href: "/our-staff",
    description: "Get to know our staff members.",
  },
  {
    title: "Our Board",
    href: "/our-board",
    description:
      "Get to know the board members our our non-profit organization.",
  },
  {
    title: "FAQ",
    href: "/faq",
    description:
      "Get some answers to some of our most frequently asked questions.",
  },
];

const OurServicesPageLinks: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Individual Counseling",
    href: "/individual-counseling",
    description: "One on one counseling with a certified counselor",
  },
  {
    title: "Naloxone Nasal Kits",
    href: "/naloxone",
    description: "We have free Narcan available at our facility",
  },
  {
    title: "Drug Testing",
    href: "/drug-testing",
    description:
      "We offer several types of drug testing with the highest availablity in the area.",
  },
  {
    title: "Batterer Intervention",
    href: "/batterer-intervention",
    description:
      "We offer a men's HEAL group for those needing counseling after domestic violence altercations.",
  },
  {
    title: "Assessments",
    href: "/assessments",
    description: "We offer comprehensive Substance Use Disorder Assessments.",
  },
  {
    title: "Recovery Coaching",
    href: "/recovery-coaching",
    description: "We have a team of certified Peer Recovery Coaches.",
  },
  {
    title: "Substance Use Disorder Group",
    href: "/sud-group",
    description:
      "Our groups specialize in DBT skills training to enhance relapse prevention.",
  },
  {
    title: "Jail Group",
    href: "/jail-group",
    description:
      "Bases staff offer weekly jail groups for men and Women in the Charlvoix County Jail.",
  },
  {
    title: "Alcohol Highway Education Class",
    href: "/alcohol-highway-education-class",
    description:
      "This class is often a requirement for those who recieve their first OWI.",
  },
  {
    title: "Drivers License Appeal",
    href: "/drivers-license-appeal",
    description:
      "Get help appealing to regain your drivers license from the State of Michigan.",
  },
];

const LocalServicesPageLinks: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Transportation",
    href: "/transportation",
    description: "Community resources for transportion.",
  },
  {
    title: "Food",
    href: "/food",
    description: "Community resources for Food.",
  },
  {
    title: "Housing",
    href: "/housing",
    description: "Community resources for housing.",
  },
  {
    title: "Insurance",
    href: "/insurance",
    description: "Community resources for insurance.",
  },
  {
    title: "Employment",
    href: "/employment",
    description: "Community resources for employment.",
  },
  {
    title: "Healthcare",
    href: "/healthcare",
    description: "Community resources for healthcare.",
  },
  {
    title: "Household Items",
    href: "/household-items",
    description: "Community resources for household items.",
  },
  {
    title: "Treatment",
    href: "/treatment",
    description: "Community resources for SUD and mental health treatment.",
  },
];

export function Navbar() {
  return (
    <nav className="p-8 flex justify-around">
      <Image alt="Logo" src={BASESLOGO} className="w-64" />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Why Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {WhyUsPageLinks.map((item, index) =>
                  index === 0 ? (
                    <li key={index} className="row-span-3">
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <div>
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {item.title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ) : (
                    <ListItem href={item.href} title={item.href} key={index}>
                      {item.description}
                    </ListItem>
                  )
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Our Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {OurServicesPageLinks.map((item, index) => (
                  <ListItem key={index} title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Local Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {LocalServicesPageLinks.map((item, index) => (
                  <ListItem key={index} title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/whats-new" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                What&apos;s New
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/donate" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Donate
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
