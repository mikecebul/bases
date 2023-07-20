import React from "react";
import { siteConfig } from "@/config/site";

export default function Services() {
  return (
    <div id="services" className="py-24 sm:py-3">
      <div className="lg:container px-4 md:px-8 lg:px-0">
        <div className="max-w-2xl">
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
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 xl:grid-cols-3">
            {siteConfig.Services.map((service) => (
              <div key={service.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-primary">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                    <service.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {service.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {service.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
