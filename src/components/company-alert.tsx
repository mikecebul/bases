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

export function CompanyAlert() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogContent className="bg-red-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Holiday Closure Dates</AlertDialogTitle>
            <div className="pl-4">
              <p>Friday, December 22, 2023</p>
              <p>Monday, December 25, 2023</p>
              <p>Friday, December 29, 2023</p>
              <p>Monday, January 1, 2024</p>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-300 hover:bg-red-400 ring-red-400 ring-offset-red-400">
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
}
