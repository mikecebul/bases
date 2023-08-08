import Link from "next/link";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { DonateForm } from "./donate-form";

const includedFeatures = [
  "Teen & Adult Counseling Scholarship Program",
  "Transportation Assistance Program",
  "Emergency Needs Assistance",
  "Public Awareness and Education Presentations",
];

export default function Donate() {
  return (
    <div className="py-24 lg:py-32 px-4 md:px-8 2xl:container 2xl:px-0">
      <div className="">
        <div className="xl:mx-auto xl:max-w-2xl xl:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Support BASES Community Programs
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted max-w-prose">
            BASES is committed to strengthening our community through various
            services. We deeply value the contributions and support from
            businesses and individuals alike.
          </p>
        </div>
        <div className="mt-8 sm:mt-16 lg:flex lg:max-w-none gap-16">
          <div className="lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Support Our Community Services
            </h3>
            <p className="mt-6 leading-7 text-muted max-w-prose">
              Your donation will help support our various community programs and
              make a positive impact in the lives of many.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-brand">
                Programs You&apos;re Supporting
              </h4>
            </div>
            <ul
              role="list"
              className="mt-4 grid grid-cols-1 gap-4 text-sm leading-6 lg:grid-cols-2 lg:gap-6 p-8 bg-accent rounded-md"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Icons.check
                    className="h-6 w-5 flex-none text-brand"
                    aria-hidden="true"
                  />
                  <p className="font-semibold">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-12 lg:pt-0">
            <div className="lg:flex-shrink-0 rounded-md bg-brand p-8 lg:flex lg:flex-col lg:justify-center lg:text-center max-w-lg mx-auto lg:max-w-md">
              <div className="text-accent">
                <p className="text-base font-medium pb-6">
                  Contribute $100 or more to support our vital community
                  services.
                </p>
                <DonateForm />

                <p className="text-xs leading-5 text-accent/70 pt-2">
                  Thank you letters sent to all our donors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
