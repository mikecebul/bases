import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Banner from "./banner";

export default function Hero() {
  return (
    <section>
      <Banner />
      <div className="grid px-4 py-8 lg:gap-8 lg:pt-24 lg:grid-cols-12 md:px-8 2xl:px-0 2xl:container">
        <div className="mr-auto place-self-center lg:col-span-6">
          <h1 className="max-w-2xl mb-4 lg:mb-8 text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-6xl 2xl:text-7xl">
            Substance Use and Mental Health Counseling
          </h1>
          <p className="max-w-xl mb-4 lg:mb-8 text-base font-light text-muted-foreground">
            We bridge the gap to recovery, offering flexible and personalized
            services both in-person and via telehealth.
          </p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 xl:space-x-0">
            <Link
              href="tel:2315471144"
              className={cn(
                buttonVariants({ variant: "brand", size: "xl" }),
                "xl:hidden"
              )}
            >
              <Icons.phone className="mr-2" />
              Call Now
            </Link>

            <Link
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "xl:hidden"
              )}
              href="/#services"
            >
              Explore Our Services
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "brand", size: "xl" }),
                "hidden xl:flex"
              )}
              href="/#services"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-6 lg:flex">
          <div className="relative">
            <Image
              src="/Woman_Laptop.webp"
              alt="Woman using telehealth services from home."
              className="object-cover w-full rounded-md"
              width={1080}
              height={1980}
              priority
            />
            <span className="absolute -left-8 -bottom-8 -z-10 text-brand">
              <svg
                width="93"
                height="93"
                viewBox="0 0 93 93"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2.5" cy="2.5" r="2.5" />
                <circle cx="2.5" cy="24.5" r="2.5" />
                <circle cx="2.5" cy="46.5" r="2.5" />
                <circle cx="2.5" cy="68.5" r="2.5" />
                <circle cx="2.5" cy="90.5" r="2.5" />
                <circle cx="24.5" cy="2.5" r="2.5" />
                <circle cx="24.5" cy="24.5" r="2.5" />
                <circle cx="24.5" cy="46.5" r="2.5" />
                <circle cx="24.5" cy="68.5" r="2.5" />
                <circle cx="24.5" cy="90.5" r="2.5" />
                <circle cx="46.5" cy="2.5" r="2.5" />
                <circle cx="46.5" cy="24.5" r="2.5" />
                <circle cx="46.5" cy="46.5" r="2.5" />
                <circle cx="46.5" cy="68.5" r="2.5" />
                <circle cx="46.5" cy="90.5" r="2.5" />
                <circle cx="68.5" cy="2.5" r="2.5" />
                <circle cx="68.5" cy="24.5" r="2.5" />
                <circle cx="68.5" cy="46.5" r="2.5" />
                <circle cx="68.5" cy="68.5" r="2.5" />
                <circle cx="68.5" cy="90.5" r="2.5" />
                <circle cx="90.5" cy="2.5" r="2.5" />
                <circle cx="90.5" cy="24.5" r="2.5" />
                <circle cx="90.5" cy="46.5" r="2.5" />
                <circle cx="90.5" cy="68.5" r="2.5" />
                <circle cx="90.5" cy="90.5" r="2.5" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
