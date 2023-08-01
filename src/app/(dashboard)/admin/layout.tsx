import { Toaster } from "@/components/ui/toaster";
import "../../globals.css";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

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
        <main className="flex-grow">
          <div className="grid grid-cols-12">
            <Sidebar />
            <div className="col-span-11">{children}</div>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}

function Sidebar() {
  return (
    <div className="h-screen col-span-1 border-r border-border flex flex-col justify-between">
      <div className="py-4 space-y-4">
        <div className="px-3 py-2">
          <Link
            href="/admin"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start text-lg font-semibold tracking-tight"
            )}
          >
            Menu
          </Link>
          <Separator className="my-2" />
          <Link
            href="/admin/staff"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start w-full"
            )}
          >
            Staff
          </Link>
        </div>
      </div>
      <div className="px-3 py-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "brand" }),
            "justify-center w-full"
          )}
        >
          View site
        </Link>
      </div>
    </div>
  );
}
