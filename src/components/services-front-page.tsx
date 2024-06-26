"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Service } from "@prisma/client";
import { renderIcon } from "./icons";

export default function ServicesFrontPage({
  services,
}: {
  services: Service[];
}) {
  return (
    <section className="relative pt-16 pb-24 isolate lg:pt-24 lg:pb-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 overflow-hidden -z-10"
      >
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-full w-full -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </motion.div>
      <div className="flex flex-col px-4 2xl:container md:px-8 2xl:px-0 xl:items-center xl:text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl"
        >
          <p className="text-base font-semibold leading-7 text-brand">
            Redefine your recovery path
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for a successful recovery journey
          </h2>
          <p className="mt-6 text-base lg:text-lg lg:leading-8 text-muted-foreground">
            Incorporating a unique blend of clinical expertise and compassionate
            care, we&apos;ve curated an exceptional recovery experience for you.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mt-16 text-left sm:mt-20 lg:mt-24"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 xl:grid-cols-3">
            {services?.map((service) => (
              <motion.div
                key={service.name}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.4,
                    },
                  },
                }}
                className="relative pl-16"
              >
                <dt className="text-base font-semibold leading-7 text-primary">
                  <div className="absolute top-0 left-0">
                    {!!service.icon
                      ? renderIcon(service.icon)
                      : renderIcon("fallback")}
                  </div>
                  {service.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {service.description}
                </dd>
              </motion.div>
            ))}
          </dl>
          <div className="flex justify-start pt-8 xl:justify-center">
            <Link
              href="/services"
              className={cn(
                buttonVariants({ size: "xl", variant: "brand" }),
                "w-full md:w-fit text-center"
              )}
            >
              Explore More of Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
