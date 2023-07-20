import Image from "next/image";
import BASES_Storefront from "../../public/BASES_Storefront_cropped.jpg";
import { Button, buttonVariants } from "./ui/button";
import { Icons } from "./icons";

export default function Hero() {
  return (
    <section className="">
      <div className="grid px-4 py-8 mx-auto lg:container lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
            Bay Area Substance Education Services
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Striving to meet the needs of the community and provide quality
            services that people have come to know and expect.
          </p>
          <div className="space-x-8">
            <Button size="xl">Get Started</Button>
            <Button variant="outline" size="xl" className="border-primary">
              Learn More
            </Button>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src={BASES_Storefront}
            alt="BASES Storefront at night"
            className="object-cover w-full"
          />
        </div>
      </div>
    </section>
  );
}
