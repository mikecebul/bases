import Image from "next/image";
import { SiteConfig, siteConfig } from "@/config/site";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default function Team() {
  return (
    <section id="team" className="py-24 sm:py-32">
      <div className="grid px-4 2xl:container gap-x-8 gap-y-20 md:px-8 2xl:px-0 xl:grid-cols-3">
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
          {siteConfig.team.staff.map((person) => (
            <Link
              key={person.name}
              href={`/team/staff/[name]`}
              as={`/team/staff/${person.name.toLowerCase().replace(/ /g, "-")}`}
              className="hover:bg-muted-foreground/20 p-2 rounded-md -ml-2"
            >
              <li>
                <div className="flex items-center gap-x-6">
                  <Image
                    className="w-16 h-16 rounded-full"
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
            </Link>
          ))}
        </ul>
        <Separator className="hidden xl:flex xl:col-span-3" />
        <ul
          role="list"
          className="grid order-last xl:order-none gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {siteConfig.team.boardMembers.map((person) => (
            <Link
              key={person.name}
              href={`/team/board-members/[name]`}
              as={`/team/board-members/${person.name
                .toLowerCase()
                .replace(/ /g, "-")}`}
              className="hover:bg-muted-foreground/20 p-2 rounded-md -ml-2"
            >
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <Image
                    className="w-16 h-16 rounded-full"
                    src={person.imageUrl}
                    alt=""
                    width={256}
                    height={256}
                  />
                  <div>
                    <p className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </p>
                    <p className="text-sm font-semibold leading-6 text-brand">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
        <div className="max-w-2xl">
          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Board of Directors
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our Board comprises seasoned professionals committed to guiding our
            organization&apos;s mission. They utilize their diverse experience
            to strategize and uphold our commitment to patient-focused
            outpatient care. Their unified aim: to drive excellence and positive
            patient outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}