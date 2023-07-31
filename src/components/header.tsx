"use client";

import Link from "next/link";
import { Icons } from "./icons";
import { MobileNavLandingPage } from "./mobile-nav-landing-page";
import { buttonVariants } from "./ui/button";
import { useMediaQuery } from "@mantine/hooks";
import { cn } from "@/lib/utils";
import { MainNav2 } from "./main-nav-2";
import { motion } from "framer-motion";

export function Header() {
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="sticky top-0 z-40 flex w-full bg-background/50 backdrop-blur-sm"
    >
      <div className="flex items-center w-full px-4 md:px-8 2xl:px-0 2xl:container h-14 lg:h-20">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost" }), "py-8 px-0")}
        >
          <Icons.logo className="w-40 md:w-44 lg:w-64" />
        </Link>
        {/* <MainNavLandingPage /> */}
        <MainNav2 />
        <MobileNavLandingPage />
        <div className="flex flex-col space-y-2 items-center 2xl:flex-row 2xl:space-x-2 2xl:space-y-0">
          {isDesktop ? (
            <div
              className={cn(
                buttonVariants({ variant: "text" }),
                "text-lg text-brand"
              )}
            >
              <Icons.phone className="mr-2" size={20} />
              (231) 547-1144
            </div>
          ) : (
            <Link
              href="tel:2315471144"
              className={cn(
                buttonVariants({ variant: "brand" }),
                "hidden lg:inline-flex"
              )}
            >
              <Icons.phone className="mr-2" size={20} />
              (231) 547-1144
            </Link>
          )}
          <Link
            href="https://goo.gl/maps/X956fmf511Fef9Pr7"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden 2xl:inline-flex"
            )}
          >
            <Icons.navigtion className="mr-2" size={20} />
            101 M-66 N | Charlevoix, MI
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
