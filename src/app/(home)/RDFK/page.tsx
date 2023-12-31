"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function page() {
  const links = siteConfig.wellChildVisitTools;
  return (
    <section className="relative pt-16 pb-24 isolate lg:pt-24 lg:pb-32">
      <div className="absolute inset-0 overflow-hidden -z-10">
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
      </div>
      <div className="flex flex-col px-4 2xl:container md:px-8 2xl:px-0 xl:items-center xl:text-center">
        <div className="max-w-xl">
          <p className="text-base font-semibold leading-7 text-brand">
            Bright Futures Previsit Questionnaires
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Normal brain develoment and childhood milestones
          </h2>
          <p className="mt-6 text-md lg:text-lg lg:leading-8 text-muted-foreground">
            The source and the specific tools have been updated since the
            publication of Scott Kelly&apos;s book, &quot;Raising Drug Free
            Kids&quot;.
          </p>
        </div>
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
            {links?.map((link) => (
              <motion.a
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.4,
                    },
                  },
                }}
                href={link.url}
                key={link.name}
                target="_blank"
                className="p-4 rounded-md hover:bg-accent/70"
              >
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-primary">
                    <div className="absolute top-0 left-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand">
                        <link.icon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    {link.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    {link.description}
                  </dd>
                </div>
              </motion.a>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
