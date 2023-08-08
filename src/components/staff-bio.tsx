"use client";

import { motion } from "framer-motion";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSubTitle,
  CardTitle,
} from "./ui/card";
import { StaffMember } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function StaffBio({
  staffMember,
}: {
  staffMember: StaffMember;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full py-24 2xl:container lg:pb-32 lg:px-0"
    >
      <CardHeader className="pt-0 2xl:container px-4 md:px-8 2xl:px-0">
        <CardTitle>{staffMember.name}</CardTitle>
        <CardDescription>{staffMember.qualifications}</CardDescription>
        <CardSubTitle>{staffMember.role}</CardSubTitle>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 sm:gap-16 px-4 md:px-8 2xl:px-0">
        <div>
          {staffMember.bio?.map((paragraph, index) => (
            <p key={index} className="mt-6 text-sm max-w-prose lg:text-base">
              {paragraph}
            </p>
          ))}
          {staffMember.philosophy && (
            <div>
              <p className="mt-6 mb-3 text-lg font-bold lg:text-xl">
                Treatment Philosophy and Focus
              </p>
              <ul>
                <p className="text-sm lg:text-base">{staffMember.philosophy}</p>
              </ul>
            </div>
          )}
          {staffMember.education && (
            <div>
              <p className="mt-6 mb-3 text-lg font-bold lg:text-xl">
                Education and Experience
              </p>
              <ul>
                <p className="text-sm lg:text-base">{staffMember.education}</p>
              </ul>
            </div>
          )}
          {staffMember.specializations.length > 0 && (
            <div>
              <p className="mt-6 mb-3 text-lg font-bold lg:text-xl">
                Specializations:
              </p>
              <ul>
                {staffMember.specializations?.map((item, index) => (
                  <li key={index} className="text-sm lg:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Image
          src={staffMember.imageUrl}
          alt={staffMember.name}
          width={1000}
          height={1000}
          className="order-first object-top mx-auto mt-0 rounded-md sm:w-full md:w-4/5 lg:w-3/5 sm:mt-6 sm:order-last"
        />
      </CardContent>
      <CardFooter className="flex justify-between px-4 md:px-8 2xl:px-0 lg:mt-8">
        <Link
          href="/team"
          className={cn(buttonVariants({ variant: "outline" }), "")}
        >
          Back
        </Link>
      </CardFooter>
    </motion.div>
  );
}
