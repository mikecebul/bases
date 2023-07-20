"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import Link from "next/link";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="">
      <div className="grid px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 md:px-8 2xl:px-0 2xl:container">
        <div className="mr-auto place-self-center lg:col-span-6">
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold mt-2 tracking-tight sm:text-5xl xl:text-6xl dark:text-white">
            Bay Area Substance Education Services
          </h1>
          <p className="max-w-2xl mb-6 font-light text-base text-muted-foreground">
            Striving to meet the needs of the community and provide quality
            services that people have come to know and expect.
          </p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Link href="tel:2315471144" legacyBehavior passHref>
              <Button variant="brand" size="xl">
                <Icons.phone className="mr-2" />
                Call Now
              </Button>
            </Link>
            <Button
              variant="outline"
              size="xl"
              className=""
              onClick={() => router.push("#about")}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-6 lg:flex">
          <div className="relative">
            <Image
              src="/BASES_Road_Sign.webp"
              alt="BASES Storefront"
              className="object-cover w-full rounded-md"
              width={1080}
              height={1980}
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
