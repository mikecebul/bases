"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { StaffMember } from "@prisma/client";

export default function Team({
  staffMembers,
}: {
  staffMembers: StaffMember[];
}) {
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <section id="team" className="pt-16 lg:pt-32 pb-32">
      <div className="grid px-4 2xl:container gap-x-8 gap-y-20 md:px-8 2xl:px-0 xl:grid-cols-3">
        <motion.div
          initial={{ x: !isDesktop ? -20 : -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h4 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Leadership Team
          </h4>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our passionate and dedicated leadership team brings a wealth of
            experience and expertise in outpatient care. They lead by example,
            driven by a shared commitment to excellence and a relentless pursuit
            of positive outcomes for our patients.
          </p>
        </motion.div>
        <motion.ul
          initial={{ x: !isDesktop ? 20 : 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          role="list"
          className="grid gap-x-6 gap-y-8  sm:grid-cols-2 sm:gap-y-12 xl:col-span-2"
        >
          {staffMembers.map((person) => (
            <Link
              key={person.name}
              href={`/team/staff/[slug]`}
              as={`/team/staff/${person.slug}`}
              className={cn(
                buttonVariants({ variant: "card" }),
                "hover:bg-muted-foreground/10 p-2 rounded-md -ml-2 justify-start py-16 sm:py-10"
              )}
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
        </motion.ul>
        <Separator className="hidden xl:flex xl:col-span-3" />
        <motion.ul
          initial={{ x: !isDesktop ? -20 : 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          role="list"
          className="grid order-last xl:order-none gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-12 xl:col-span-2"
        >
          {siteConfig.team.boardMembers.map((person) => (
            <Link
              key={person.name}
              href={`/team/board-members/[name]`}
              as={`/team/board-members/${person.name
                .toLowerCase()
                .replace(/ /g, "-")}`}
              className={cn(
                buttonVariants({ variant: "card" }),
                "hover:bg-muted-foreground/10 p-2 rounded-md -ml-2 justify-start py-16 sm:py-10"
              )}
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
        </motion.ul>
        <motion.div
          initial={{ x: !isDesktop ? 20 : -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
