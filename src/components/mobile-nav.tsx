"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { ScrollArea } from "./ui/scroll-area";
import { siteConfig } from "@/config/site";
import { cn, isActiveRoute } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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
                <Accordian onOpenChange={setOpen} href={currentPathName} />
              </nav>
              <div className="absolute bottom-0 right-0">
                {/* <ModeToggle /> */}
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface AccordianLinkProps extends LinkProps {
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void;
  href: string;
}

function Accordian({ onOpenChange, href }: AccordianLinkProps) {
  const activeAccordianItem = href.split("/")[1];
  return (
    <Accordion
      type="single"
      defaultValue={activeAccordianItem}
      collapsible
      className="w-full"
    >
      <Link
        href="/"
        className={cn("border-b py-4 block", {
          "font-bold": isActiveRoute(href, "/"),
        })}
        onClick={() => {
          onOpenChange?.(false);
        }}
      >
        Home
      </Link>
      <AccordionItem value="about">
        <AccordionTrigger>About</AccordionTrigger>
        {siteConfig.AboutPageLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn("", {
              "font-bold": isActiveRoute(href, item.href),
            })}
            onClick={() => {
              onOpenChange?.(false);
            }}
          >
            <AccordionContent>{item.title}</AccordionContent>
          </Link>
        ))}
      </AccordionItem>
      <AccordionItem value="services">
        <AccordionTrigger>Services</AccordionTrigger>
        {siteConfig.ServicesPageLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn("", {
              "font-bold": isActiveRoute(href, item.href),
            })}
            onClick={() => {
              onOpenChange?.(false);
            }}
          >
            <AccordionContent>{item.title}</AccordionContent>
          </Link>
        ))}
      </AccordionItem>
      <Link
        href="/contact"
        className={cn("border-b py-4 block", {
          "font-bold": isActiveRoute(href, "/contact"),
        })}
        onClick={() => {
          onOpenChange?.(false);
        }}
      >
        Contact
      </Link>
      <Link
        href="/donate"
        className={cn("border-b py-4 block", {
          "font-bold": isActiveRoute(href, "/donate"),
        })}
        onClick={() => {
          onOpenChange?.(false);
        }}
      >
        Donate
      </Link>
    </Accordion>
  );
}
