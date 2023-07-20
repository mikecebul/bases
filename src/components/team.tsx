import Image from "next/image";
import { SiteConfig, siteConfig } from "@/config/site";

export default function Team() {
  return (
    <section id="team" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h4 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Leadership Team
          </h4>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our passionate and dedicated leadership team brings a wealth of
            experience and expertise in outpatient care. They lead by example,
            driven by a shared commitment to excellence and a relentless pursuit
            of positive outcomes for our patients.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {siteConfig.staff.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <Image
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                  width={256}
                  height={256}
                />
                <div>
                  <p className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {person.qualifications}
                  </p>
                  <p className="text-sm font-semibold leading-6 text-brand">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
