"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export function CompanyAlert() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogContent className="bg-red-300">
          <AlertDialogHeader>
            <AlertDialogTitle className="">
              Holiday Closure Dates
            </AlertDialogTitle>
            <div className="pt-4 pl-6">
              <div>
                <p className="font-semibold">Christmas</p>
                <p>Friday, December 22, 2023</p>
                <p>Monday, December 25, 2023</p>
                <p className="pt-4 font-semibold">New Years</p>
                <p>Friday, December 29, 2023</p>
                <p>Monday, January 1, 2024</p>
              </div>
            </div>
            <div className="pt-4">
              <p className="font-semibold">Note</p>
              <p className="">
                While we are closed we will be scheduling after-hours drug
                tests. Call{" "}
                <a href="tel:2318810810" className="hover:underline">
                  (231) 881-0810
                </a>{" "}
                first thing in the morning to schedule an appointment time for
                an aditional $20 fee.
              </p>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={cn(
                buttonVariants({ variant: "brand" }),
                "hover:text-primary-foreground"
              )}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
}
