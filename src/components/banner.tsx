"use client";

import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import Link from "next/link";

export default function Banner() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      id="banner"
      tabIndex={-1}
      className="flex justify-between items-center py-3 px-4 w-full bg-gray-50 border border-b border-gray-200 sm:items-center lg:py-4 xl:hidden"
    >
      <div className="flex gap-2 sm:items-center flex-col sm:flex-row">
        <p className="text-muted-foreground text-xs sm:text-base">
          Visit us at our new location:{" "}
        </p>
        <Link
          className={cn(
            buttonVariants({ variant: "brand", size: "sm" }),
            "flex gap-2 items-center text-sm"
          )}
          href="https://goo.gl/maps/X956fmf511Fef9Pr7"
        >
          <Icons.navigation />
          <p>101 M-66 N, Charlevoix, MI 49720</p>
        </Link>
      </div>
      <Button
        data-collapse-toggle="banner"
        type="button"
        onClick={() => setIsOpen(false)}
        className="w-6 h-6 p-0 bg-secondary text-primary hover:bg-muted-foreground/20"
      >
        <Icons.closeMenu />
      </Button>
    </div>
  );
}
