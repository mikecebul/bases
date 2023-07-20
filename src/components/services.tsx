import React from "react";
import { siteConfig } from "@/config/site";

export default function Services() {
  return (
    <div id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-brand">
            Redefine your recovery path
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for a successful recovery journey
          </h3>
          <p className="mt-6 text-md lg:text-lg lg:leading-8 text-muted-foreground">
            Incorporating a unique blend of clinical expertise and compassionate
            care, we&apos;ve curated an exceptional recovery experience for you.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:container">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 xl:grid-cols-3">
            {siteConfig.Features.map((feature) => (
              // <Link
              //   href="/"
              //   className="hover:bg-accent -m-2 p-2 rounded-md"
              // >
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-primary">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
              // </Link>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
