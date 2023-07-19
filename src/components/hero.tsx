import Image from "next/image";
import BASES_Storefront from "../../public/BASES_Storefront_cropped.jpg";

export default function Hero() {
  return (
    <section className="">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Bay Area Substance Education Services
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Striving to meet the needs of the community and provide quality
            services that people have come to know and expect.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-primary-foreground rounded-lg bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-ring dark:focus:ring-primary"
          >
            Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 mt-4 stext-base font-medium text-center text-accent-foreground border border-accent-foreground rounded-lg hover:bg-accent focus:ring-4 focus:ring-ring dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Learn More
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src={BASES_Storefront}
            alt="BASES Storefront at night"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
