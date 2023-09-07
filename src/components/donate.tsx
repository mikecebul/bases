import { Icons } from "./icons";
import { DonateForm } from "./donate-form";
import FadeInFromTop from "@/lib/framer/fadeInFromTop";
import FadeInFromLeft from "@/lib/framer/fadeInFromLeft";
import FadeInFromRight from "@/lib/framer/fadeInFromRight";

const includedFeatures = [
  "Teen & Adult Counseling Scholarship Program",
  "Transportation Assistance Program",
  "Emergency Needs Assistance",
  "Public Awareness and Education Presentations",
];

export default function Donate() {
  return (
    <div className="px-4 py-24 lg:py-32 md:px-8 2xl:container 2xl:px-0">
      <div className="">
        <FadeInFromTop>
          <div className="xl:mx-auto xl:max-w-2xl xl:text-center">
            <p className="text-base font-semibold leading-7 text-brand">
              Make a difference today
            </p>
            <h4 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Strengthen Our Community with Your Contribution
            </h4>
            <p className="mt-6 text-md lg:text-lg lg:leading-8 text-muted-foreground max-w-prose">
              BASES is committed to strengthening our community through various
              services. We deeply value the contributions and support from
              businesses and individuals alike.
            </p>
          </div>
        </FadeInFromTop>
        <div className="gap-16 mt-8 sm:mt-16 lg:flex lg:max-w-none">
          <FadeInFromLeft>
            <div className="lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Support Our Community Programs
              </h3>
              <p className="mt-6 leading-7 text-muted-foreground max-w-prose">
                Your donation will help support our various community programs
                and make a positive impact in the lives of many.
              </p>
              <div className="flex items-center mt-10 gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-brand">
                  Programs You&apos;re Supporting
                </h4>
              </div>
              <ul
                role="list"
                className="grid grid-cols-1 gap-4 p-8 mt-4 text-sm leading-6 rounded-md lg:grid-cols-2 lg:gap-6 bg-accent"
              >
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Icons.checkCirlce
                      className="flex-none w-5 h-6 text-brand"
                      aria-hidden="true"
                    />
                    <p className="font-semibold">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInFromLeft>
          <FadeInFromRight>
            <div className="pt-12 lg:pt-0">
              <div className="max-w-lg p-8 mx-auto rounded-md lg:flex-shrink-0 bg-brand lg:flex lg:flex-col lg:justify-center lg:max-w-md">
                <div className="text-accent">
                  <p className="pb-6 text-base font-medium">
                    Contribute $100 or more to support our vital community
                    services.
                  </p>
                  <DonateForm />

                  <p className="pt-2 text-xs leading-5 text-accent/70">
                    Thank you letters sent to all our donors.
                  </p>
                </div>
              </div>
            </div>
          </FadeInFromRight>
        </div>
      </div>
    </div>
  );
}
