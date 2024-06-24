import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BASES",
  description:
    "Addiction treatment and education services in Charlevoix, Michigan",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Substance Use and Mental Health Counseling",
    description:
      "We bridge the gap to recovery, offering flexible and personalized services both in-person and via telehealth.",
    url: process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background")}>
        <Header />
        <main className="relative flex-1 max-w-full overflow-hidden xl:overflow-visible animate-fadeIn">
          {children}
        </main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
