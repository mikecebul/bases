"use client";

import { Separator } from "./ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { BoardMember, StaffMember } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icons } from "./icons";

export default function Team({
  staffMembers,
  boardMembers,
}: {
  staffMembers: StaffMember[];
  boardMembers: BoardMember[];
}) {
  return (
    <section id="team" className="py-24 lg:pb-32">
      <div className="grid px-4 2xl:container gap-x-8 gap-y-20 md:px-8 2xl:px-0 xl:grid-cols-3">
        <motion.div
          initial={{ x: "var(--x-from)", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl [--x-from:-30px] sm:[--x-from:-40px]"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Meet Our Leadership Team
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our passionate and dedicated leadership team brings a wealth of
            experience and expertise in outpatient care. They lead by example,
            driven by a shared commitment to excellence and a relentless pursuit
            of positive outcomes for our patients.
          </p>
        </motion.div>
        <ul
          role="list"
          className="grid gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-12 xl:col-span-2"
        >
          {staffMembers.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ x: "var(--x-from)", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="max-sm:bg-accent/60 [--x-from:30px] sm:[--translate-x-from:-40]"
            >
              <Link
                href={`/team/staff/[slug]`}
                as={`/team/staff/${person.slug}`}
                className={cn(
                  buttonVariants({ variant: "card" }),
                  "px-2 w-full justify-start py-4 h-24 max-sm:hover:bg-brand/10"
                )}
              >
                <li>
                  <div className="flex items-center gap-x-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={person.imageUrl || undefined}
                        alt="profile of staff member."
                      />
                      <AvatarFallback>
                        <Icons.user className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-base font-semibold leading-7 tracking-tight">
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
            </motion.div>
          ))}
        </ul>
        <Separator className="hidden xl:flex xl:col-span-3" />
        <ul
          role="list"
          className="grid order-last xl:order-none gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-12 xl:col-span-2"
        >
          {boardMembers.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ x: "var(--x-from)", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="max-sm:bg-accent/60 [--x-from:30px] sm:[--translate-x-from:-40px]"
            >
              <Link
                href={`/team/board/[slug]`}
                as={`/team/board/${person.slug}`}
                className={cn(
                  buttonVariants({ variant: "card" }),
                  "px-2 w-full justify-start py-4 h-24 max-sm:hover:bg-brand/10"
                )}
              >
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={person.imageUrl || undefined}
                        alt="profile of staff member."
                      />
                      <AvatarFallback>
                        <Icons.user className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-base font-semibold leading-7 tracking-tight">
                        {person.name}
                      </p>
                      <p className="text-sm font-semibold leading-6 text-brand">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            </motion.div>
          ))}
        </ul>
        <motion.div
          initial={{ x: "var(--x-from)", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl [--x-from:-30px] sm:[--x-from:40px]"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Meet Our Board of Directors
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
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
