import { Toaster } from "@/components/ui/toaster";
import "../../globals.css";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for BASESmi.org",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-primary-foreground min-h-[100dvh] flex flex-col"
        )}
      >
        <main className="flex-grow">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
