import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import FadeInDiv from "@/components/Fade-in-div";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BASES",
  description:
    "Addiction treatment and education services in Charlevoix, Michigan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-primary-foreground")}>
        <FadeInDiv>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </FadeInDiv>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
